// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { NewCity } from "./City";

export function convertToEmoji(countryCode: string) {
 if (countryCode.length !== 2) return "";

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
 const [lat, lng ] = useUrlPosition();
 const { createCity } = useCities();
 const navigate = useNavigate();
 const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
 const [geocodingError, setGeocodingError] = useState("")
 const [cityName, setCityName] = useState("");
 const [emoji, setEmoji] = useState<string | null>(null);
 const [country, setCountry] = useState("");
 const [date, setDate] = useState<Date | null>(null);
 const [notes, setNotes] = useState("");
 const [isLoading, _setIsLoading] = useState(false)


 useEffect(() => {
  if (!lat || !lng) return;

  async function fetchCityData() {
    try {
      setIsLoadingGeocoding(true);
      const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      const data = await response.json();

      if (!data.countryCode)
        throw new Error('That does not seem to be a city. Click somewhere else.');

      setEmoji(convertToEmoji(data.countryCode));
      setCityName(data.city || data.locality || "");
      setCountry(data.countryName);
    } catch (err) {
     if (err instanceof Error) {
       setGeocodingError(err.message);
     } else {
       setGeocodingError("Unknown error occurred");
     }
    } finally {
      setIsLoadingGeocoding(false);
    }
  }

  fetchCityData();
}, [lat, lng])


 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!cityName || !date) {
   alert('City or date field is missing!');
   return;
  }

   const newCity: NewCity = {
     cityName,
     country,
     emoji: emoji ?? undefined,
     date,
     notes,
     position: { lat, lng },
   };

   await createCity(newCity);
   navigate("/app/cities");
 }

 if(isLoadingGeocoding) return <Spinner />
 if(geocodingError) return <Message message={geocodingError} />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="submit">Add</Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;

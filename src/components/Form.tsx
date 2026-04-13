// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { NewCity } from "./City";
import { convertToEmoji } from "../utils/convertToEmoji";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form () {
  const { createCity, updateCity, currentCity } = useCities();
  const navigate = useNavigate();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [cityname, setCityName] = useState("");
  const [emoji, setEmoji] = useState<string | null>(null);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, _setIsLoading] = useState(false);

  const { id } = useParams();
  // If id exists then it is editing form
  const isEditForm = Boolean(id);

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (!mapLat || !mapLng || isEditForm) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("")
        const response = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`,
        );
        const data = await response.json();

        if (!data.countryCode)
          throw new Error(
            "That does not seem to be a city. Click somewhere else.",
          );

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
  }, [mapLat, mapLng, isEditForm]);

  useEffect(() => {
   if (isEditForm && currentCity) {
    setCityName(currentCity.cityname);
    if(currentCity.date) setDate(new Date(currentCity.date));
    setNotes(currentCity.notes || "");
    setCountry(currentCity.country);
    setEmoji(currentCity.emoji || "");
   }
  }, [isEditForm, currentCity])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityname || !date) {
      alert("City or date field is missing!");
      return;
    }

    const newCity: NewCity = {
      cityname,
      country,
      emoji: emoji ?? undefined,
      date,
      notes,
      lat: mapLat,
      lng: mapLng,
    };

    try {
      if (isEditForm && id) {
        await updateCity(id, newCity);
      } else {
        await createCity(newCity);
      }
      navigate("/app/cities");
    } catch (err) {
      console.error("Failed to update the city", err);
    }
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
     <h1>Add your new city</h1>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityname}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityname}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityname}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="submit">{isEditForm ? "Update city info" : "Add"}</Button>
        <Button
          type="button"
          onClick={() => {
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

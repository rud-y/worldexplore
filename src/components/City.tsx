import styles from "./City.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";


// const formatDate = (date: Date | string) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

export const formatDate = (date?: string | Date | null) => {
  if (!date) return "Unknown date";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Unknown date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(d);
};

  export type NewCity = Omit<City, "id">;


  export type City = {
    id: string;
    position?: {
      lat: number;
      lng: number;
    };
    date?: string | Date;
    // date?: string;
    cityName: string;
    emoji?: string | null;
    notes?: string;
    country: string;
  };

   
function City() {
 const { id } = useParams();

 const { getCity, currentCity, isLoading } = useCities();

 useEffect(() => {
  if (!id) return;
 
  getCity(id);
 }, [id, getCity])
 
 const { cityName = "", emoji = "", date = "", notes = "" } = currentCity || {};
 
 if(isLoading) return <Spinner />

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
    </div>
  );
}

export default City;

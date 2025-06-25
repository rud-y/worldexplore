import styles from "./City.module.css";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";


const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


function City() {
 const { id } = useParams();

 const { getCity, currentCity, isLoading } = useCities();

 const [searchParams, setSearchParams] = useSearchParams();
 const lat = searchParams.get("lat");
 const lng = searchParams.get("lng");
 
 console.log('useParams-id: ', id)
 
 useEffect(function(){
  getCity(id);
 }, [id])
 
 const { cityName, emoji, date, notes } = currentCity;
 
 if(isLoading) return <Spinner />
 
 // TEMPORARY DATA
 // const currentCity = {
 //  cityName: "Lisbon",
 //  emoji: "🇵🇹",
 //  date: "2027-10-31T15:59:59.138Z",
 //  notes: "My favorite city so far!",
 // };
 

  // return (
  //  <>
  //  <h1>City: {id}</h1>
  //  <h2>Position / {lat} , {lng}</h2>
  //  </>
  // )

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
        <p>{formatDate(date || null)}</p>
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

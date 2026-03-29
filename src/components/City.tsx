import styles from "./City.module.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { formatDate } from "../utils/formatDate"
import Spinner from "./Spinner";
import Button from "./Button";

  export type NewCity = Omit<City, "id">;

  export type City = {
    id: string;
    cityname: string;
    lat: number;
    lng: number;
    date?: string | Date;
    emoji?: string | null;
    notes?: string;
    country: string;
  };

   
function City() {
 const { id } = useParams();

 const { getCity, currentCity, isLoading } = useCities();
 const navigate = useNavigate();

 useEffect(() => {
  if (!id) return;
 
  getCity(id);
 }, [id, getCity])

 
 const { cityname = "", emoji = "", date = "", notes = "" } = currentCity || {};
 
 if(isLoading) return <Spinner />

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityname}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityname} on</h6>
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
          href={`https://en.wikipedia.org/wiki/${cityname}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityname} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          onClick={() =>
            navigate(`/app/form/${id}?lat=${currentCity?.lat}&lng=${currentCity?.lng}`)
          }
        >
          Edit city info
        </Button>
      </div>
    </div>
  );
}

export default City;

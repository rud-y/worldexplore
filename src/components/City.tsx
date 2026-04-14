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
      <dl className={styles.detailsList}>
        <div className={styles.row}>
          <dt>City name</dt>
          <dd>
            <span>{emoji}</span> {cityname}
          </dd>
        </div>

        <div className={styles.row}>
          <dt>You went to {cityname} on</dt>
          <dd>{formatDate(date)}</dd>
        </div>

        {notes && (
          <div className={styles.row}>
            <dt>Your notes</dt>
            <dd>{notes}</dd>
          </div>
        )}

        <div className={styles.row}>
          <dt>Learn more</dt>
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
              navigate(
                `/app/form/${id}?lat=${currentCity?.lat}&lng=${currentCity?.lng}`,
              )
            }
          >
            Edit city info
          </Button>
        </div>
      </dl>
    </div>
  );
}

export default City;

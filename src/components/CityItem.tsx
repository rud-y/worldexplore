import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { City } from './City'
import React from 'react';
import { isFutureDate } from '../utils/isFutureDate';

export interface CityItemProps {
  city: City;
  onDeleteRequest: (city: City) => void;
}

 const formatDate = (date?: string | Date | null) => {
   if (!date) return "Unknown Date";
   
   const d = new Date(date);
   if (isNaN(d.getTime())) return "Unknown Date";

   return new Intl.DateTimeFormat("en", {
     day: "numeric",
     month: "long",
     year: "numeric",
     weekday: "long",
   }).format(d);
 };
  
  export default function CityItem({ city, onDeleteRequest }: CityItemProps) {
    const { id, date, lat, lng, emoji, cityname } = city;

    function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
     e.preventDefault();
     onDeleteRequest(city);
    }

    const formattedDate = formatDate(date);

    return (
      <li>
        <Link
          className={isFutureDate(date) ? styles.futureDateItem : styles.cityItem}
          to={`${id}?lat=${lat}&lng=${lng}`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.name}>{cityname}</span> 
          <time className={styles.date}>{formattedDate}</time>
          <button
            className={styles.deleteBtn}
            onClick={handleDeleteClick}
            aria-label={`Delete item: ${cityname}`}
            aria-haspopup="dialog"
          >
            &times;
          </button>
        </Link>
      </li>
    );
  }

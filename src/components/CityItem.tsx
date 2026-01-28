import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { City } from './City'
import { useCities } from '../contexts/CitiesContext';
import React from 'react';
export interface CityItemProps {
  city: City;
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
  
  export default function CityItem({ city }: CityItemProps) {
    const { id, date, position, emoji, cityName } = city;
    const { deleteCity } = useCities();
    
    function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
     e.preventDefault();
     console.log('POSITION LAT---  ', position?.lat)
     deleteCity(id);
    }
    
    if (!position) return null;

    const formattedDate = formatDate(date);

    return (
      <li>
        <Link
          className={styles.cityItem}
          to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{formattedDate}</time>
          <button className={styles.deleteBtn} onClick={handleDeleteClick}>
            &times;
          </button>
        </Link>
      </li>
    );
  }

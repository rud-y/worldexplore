import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import City from './City'

export interface City {
  cityName: string;
  // position: string;
  emoji: string;
  date: string | Date;
  id: string;
  notes?: string;
}

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

  
  export default function CityItem({ city }: { city: City}) {

   const { cityName, emoji, date, id, position } = city;
   const formattedDate = formatDate(date);

   return (
     <li>
      <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formattedDate}</time>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
     </li>
   )
}

import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { City } from './City'
import { useCities } from '../contexts/CitiesContext';
import React, { useState } from 'react';
import { isFutureDate } from '../utils/isFutureDate';
import Modal from './Modal';
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
    const { id, date, lat, lng, emoji, cityname } = city;
    const { deleteCity } = useCities();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
     e.preventDefault();
     setShowDeleteModal(true);
    }

    function handleConfirmDelete() {
      deleteCity(id);
      setShowDeleteModal(false);
    }

    function handleCancelDelete() {
      setShowDeleteModal(false);
    }
    
    const formattedDate = formatDate(date);

    return (
      <li>
        <Modal
          isOpen={showDeleteModal}
          question={`Are you sure you want to delete ${cityname}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
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

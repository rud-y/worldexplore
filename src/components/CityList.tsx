import { useMemo, useState } from 'react';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import type { City } from './City';
import CityItem from './CityItem';
import Message from './Message';
import Modal from './Modal';
import CityListFilter from './CityListFilter';
import { useCities } from '../contexts/CitiesContext';
import {
  EMPTY_CITY_FILTERS,
  filterCities,
  getFilterOptions,
  type CityFilters,
} from '../utils/filterCities';

export default function CityList() {
 const { cities, isLoading, deleteCity } = useCities();
 const [activeCityToDelete, setActiveCityToDelete] = useState<City | null>(null);
 const [filters, setFilters] = useState<CityFilters>(EMPTY_CITY_FILTERS);

 const { years, countries } = useMemo(
   () => getFilterOptions(cities),
   [cities],
 );

 const filteredCities = useMemo(
   () => filterCities(cities, filters),
   [cities, filters],
 );

 function handleConfirmDelete() {
   if (!activeCityToDelete) return;
   deleteCity(activeCityToDelete.id);
   setActiveCityToDelete(null);
 }

 function handleCancelDelete() {
   setActiveCityToDelete(null);
 }

 if(isLoading) { return <Spinner />}

 if(!cities.length) return <Message message="Navigate the map to add your first place" />;

 return (
   <>
     {activeCityToDelete !== null && (<Modal
       isOpen={activeCityToDelete !== null}
       question={`Are you sure you want to delete ${activeCityToDelete?.cityname}?`}
       onConfirm={handleConfirmDelete}
       onCancel={handleCancelDelete}
     />)}
     <h1>Places you have visited...</h1>
     <CityListFilter
       filters={filters}
       years={years}
       countries={countries}
       onFiltersChange={setFilters}
     />
     {!filteredCities.length ? (
       <Message message="No places match your filters" />
     ) : (
       <ul className={styles.cities}>
         {filteredCities.map((city: City) => (
           <CityItem
             city={city}
             key={`${city.lat}--${city.lng}`}
             onDeleteRequest={setActiveCityToDelete}
           />
         ))}
       </ul>
     )}
   </>
 );
}

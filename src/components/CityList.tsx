import styles from './CityList.module.css'
import Spinner from './Spinner'
import type { City } from './City'
import CityItem from './CityItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CityList() {

 const { cities, isLoading } = useCities();

 if(isLoading) { return <Spinner />}

 if(!cities.length) return <Message message="Navigate the map to add your first place" />;

 return (
   <>
     <h1>Places you have visited...</h1>
     <ul className={styles.cities}>
       {cities.map((city: City) => (
         <CityItem
           city={city}
           key={`${city.lat}--${city.lng}`}
         />
       ))}
     </ul>
   </>
 );
}

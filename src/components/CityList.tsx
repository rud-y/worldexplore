import styles from './City.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import { City } from './CityItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CityList() {

 const { cities, isLoading } = useCities();

 if(isLoading) { return <Spinner />}

 if(!cities.length) return <Message message="Add your first city - click on the city on the Map"/>

 return (
     <ul className={styles.cities}>
      {cities.map((city: City) => <CityItem city={city} key={city.id}/>)}
     </ul>
   
  )
}

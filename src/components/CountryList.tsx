import styles from './City.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Country from './CountryItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'


export default function CountriesList() {
  const { cities, isLoading } = useCities();
 
 if(isLoading) { return <Spinner />}

 if(!cities.length) return <Message message="Add your first city - click on the city on the Map"/>

 const countries = cities.reduce((acc, current) => {
  if(!acc.map((el: typeof Country) => el).includes(current.country)) return [...acc, {country: current.country, emoji: current.emoji}];
  else return acc;
 }, [])


 return (
     <ul className={styles.countriesList}>
      {countries.map((country: typeof Country, emoji: Country) => <CountryItem country={country} key={country.country}/>)}
     </ul>
   
  )
}

import styles from './City.module.css'
import Spinner from './Spinner'
import CountryItem, { Country } from './CountryItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CountriesList() {
  const { cities, isLoading } = useCities();
 
 if(isLoading) { return <Spinner />}

 if(!cities.length) return <Message message="Add your first city - click on the city on the Map"/>

 // const countries = cities.reduce<Country[]>((acc, current) => {
 //  if (!acc.map((el) => el).includes(current.country))
 //    return [...acc, { country: current.country, emoji: current.emoji }];
 //  else return acc;
 // }, [])

 const countries = cities.reduce<Country[]>((acc, current) => {
   if (!acc.some((c) => c.country === current.country)) {
     acc.push({
       country: current.country,
       emoji: current.emoji,
     });
   }
   return acc;
 }, []);


 return (
     <ul className={styles.countriesList}>
      {countries.map((country) => <CountryItem country={country} key={country.country}/>)}
     </ul>
   
  )
}

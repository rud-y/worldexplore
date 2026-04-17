import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem, { Country } from './CountryItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CountriesList() {
  const { cities, isLoading } = useCities();
 
 if(isLoading) { return <Spinner />}

 if(!cities.length) return <Message message="Navigate the map to add your first place"/>

 const countries = cities.reduce<Country[]>((acc, current) => {
   if (!acc.some((c) => c.country === current.country)) {
     acc.push({
       country: current.country,
       emoji: current.emoji ?? undefined,
     });
   }
   return acc;
 }, []);


 return (
   <>
     <h1 className={styles.title}>Countries you have visited...</h1>
     <ul className={styles.countriesList}>
       {countries.map((country) => (
         <CountryItem country={country} key={country.country} />
       ))}
     </ul>
   </>
 );
}

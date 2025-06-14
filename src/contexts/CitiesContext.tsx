import { createContext, useContext, useEffect, useState } from "react";
import City from './components/CityItem';

const BASE_URL = 'http://localhost:7000'

const CitiesContext = createContext();

function CitiesProvider({ children }) {
 const [cities, setCities] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 
 
 useEffect(function() {
  async function fetchCities() {
   try {
    setIsLoading(true)
   const response = await fetch(`${BASE_URL}/cities`);
   if(response.ok) {
    const data = await response.json();
    setCities(data);
   }
  } catch {
   alert('Problem fetching cities data')
  } finally {
   setIsLoading(false)
  }
 }
 fetchCities();
 }, []);


  return (
   <CitiesContext.Provider value={{ cities, isLoading }}>
    {children}
   </CitiesContext.Provider>
  )
 }


 function useCities() {
  const context = useContext(CitiesContext);

  if(context === undefined ) throw new Error('CitiesContext was used outside of CitiesProvider !!')
   
   return context;
 }

export { CitiesProvider, useCities };
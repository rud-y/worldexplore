import { createContext, useContext, useEffect, useState } from "react";
import City from './components/City';

const BASE_URL = 'http://localhost:7000'

type CitiesContextType = {
 cities: City[];
 isLoading: boolean;
 currentCity: City;
 getCity: (id: number) => void;
 createCity: (newCity: City) => City
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

function CitiesProvider({ children }: { children: City[] }) {
 const [cities, setCities] = useState<City[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [currentCity, setCurrentCity] = useState({});

 
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

 // Fetch one city
 async function getCity(id: number) {
   try {
    setIsLoading(true)
   const response = await fetch(`${BASE_URL}/cities/${id}`);
   if(response.ok) {
    const data = await response.json();
    setCurrentCity(data);
   }
  } catch {
   alert('Problem fetching cities data')
  } finally {
   setIsLoading(false)
  }
 }

 // Create a new city object via form
 async function createCity(newCity: City) {
  try {
   setIsLoading(true)
   const response = await fetch(`${BASE_URL}/cities/`, {
    method: 'POST',
    body: JSON.stringify(newCity),
    headers: {
     'Content-Type': 'application/json'
    }
   });

   if(!response.ok) throw new Error("Could not create anew city data");

   const newCityData = await response.json() as City;
   console.log('new city data: ', newCityData)

   setCities(cities => [...cities, newCityData])
  
  
 } catch(error) {
  alert(`Error creating data: ${(error as Error).message}`)
 } finally {
  setIsLoading(false)
 }
}


  return (
   <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity }}>
    {children}
   </CitiesContext.Provider>
  )
 }

 function useCities() {
  const context = useContext(CitiesContext);

  // Error check
  if(context === undefined ) throw new Error('CitiesContext was used outside of CitiesProvider !!')
   
   return context;
 }

export { CitiesProvider, useCities };
import { createContext, useContext, useEffect, useState } from "react";
import City from './components/City';

const BASE_URL = 'http://localhost:7000'

type CitiesContextType = {
 cities: City[];
 isLoading: boolean;
 currentCity: City;
 getCity: (id: number) => void;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

function CitiesProvider({ children }: { children: City[] }) {
 const [cities, setCities] = useState([]);
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


  return (
   <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
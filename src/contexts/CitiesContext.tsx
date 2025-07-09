import { createContext, useContext, useEffect, useReducer } from "react";
import City from './components/City';

const BASE_URL = 'http://localhost:7000'

type CitiesContextType = {
 cities: City[];
 isLoading: boolean;
 currentCity: City | null;
 getCity: (id: number) => void;
 createCity: (newCity: City) => City
 deleteCity: (id: string) => void;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const initialState = {
 cities: [],
 isLoading: false,
 currentCity: {},
 error: "",
}

function reducer(state, action) {
 switch(action.type) {
  case 'loading':
   return {...state, isLoading: true}
   case 'cities/loaded':
    return {
     ...state, isLoading: false, cities: action.payload
    }
    case 'city/loaded':
     return {
      ...state, isLoading: false, currentCity: action.payload
     }
    
   case 'city/created':
    return {
     ...state, isLoading: false, cities: [...state.cities, action.payload]
    }

   case 'city/deleted':
    return {
     ...state, isLoading :false, cities: state.cities.filter((city: City) => city.id !== action.payload)
    }

   case 'rejected':
    return {
     ...state, isLoading: false, error: action.payload
    }

   default: throw new Error('Unknown action type');
  }
 }
    
function CitiesProvider({ children }: { children: React.ReactNode }) {
 const[{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)

 useEffect(function() {
  async function fetchCities() {
   dispatch({type: 'loading'})
   try {
    const response = await fetch(`${BASE_URL}/cities`);
   if(response.ok) {
    const data = await response.json();
    dispatch({ type: 'cities/loaded', payload: data })
   }
  } catch {
   dispatch({ type: 'rejected', payload: 'There was error loading data (cities)' })
  }
 }

 fetchCities();
 }, []);

 // Fetch one city
 async function getCity(id: number) {
  dispatch({type: 'loading'})

   try {
   const response = await fetch(`${BASE_URL}/cities/${id}`);
   if(response.ok) {
    const data = await response.json();
    dispatch({ type: 'city/loaded', payload: data })
    // setCurrentCity(data);
   }
  } catch {
   dispatch({ type: 'rejected', payload: 'There was error loading the city data.' })
  }
 }

 // Create a new city object in form
 async function createCity(newCity: City) {
  dispatch({ type: 'loading' })
  try {
   const response = await fetch(`${BASE_URL}/cities/`, {
    method: 'POST',
    body: JSON.stringify(newCity),
    headers: {
     'Content-Type': 'application/json'
    }
   });

   if(!response.ok) throw new Error("Could not create a new city data");

   const newCityData = await response.json() as City;
   console.log('NEW CITY DATA: ', newCityData)
   dispatch({ type: 'city/created', payload: newCityData });
  
  } catch(error) {
   dispatch({ type: 'rejected', payload: 'There was error creating a new city data.' })
  }
 }

 // Delete a city
 async function deleteCity(id: string) {
  dispatch({ type: 'loading' })
  try {
   await fetch(`${BASE_URL}/cities/${id}`, {
    method: "DELETE",
   });
   dispatch({ type: 'city/deleted', payload: id})
   console.log('To DELETE?');
 } catch(error) {
  dispatch({ type: 'rejected', payload: 'There was error deleting the city data.' })
 }
}

  return (
   <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
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
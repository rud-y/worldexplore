import { createContext, useContext, useEffect, useReducer } from "react";
import { City, NewCity } from '../components/City';
import { supabase } from "../services/supabase";

type CitiesContextType = {
 cities: City[];
 isLoading: boolean;
 currentCity: City | null;
 getCity: (id: string) => Promise<void>;
 createCity: (newCity: NewCity) => Promise<void>
 deleteCity: (id: string) => void;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

type CityState = {
 cities: City[];
 isLoading: boolean;
 currentCity: City | null;
 error: Error | string;
}

type CityAction =
| { type: 'loading' }
| { type: 'cities/loaded', payload: City[] }
| { type: 'city/loaded', payload: City }
| { type: 'city/created', payload: City }
| { type: 'city/deleted', payload: string }
| { type: 'rejected', payload: Error | string }


const initialState: CityState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state: CityState, action: CityAction): CityState {
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
    ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload,
   }

  case 'city/deleted':
   return {
    ...state, isLoading: false, cities: state.cities.filter((city: City) => city.id !== action.payload), currentCity: null,
   }

  case 'rejected':
   return {
    ...state, isLoading: false, error: action.payload
   }

   default: 
   throw new Error('Unknown action type');
  }
 }
    
function CitiesProvider({ children }: { children: React.ReactNode }) {
 const[{cities, isLoading, currentCity}, dispatch] = useReducer<React.Reducer<CityState, CityAction>>(reducer, initialState)

 useEffect(function() {
  async function fetchCities() {
   dispatch({type: 'loading'})

   try {
    const { data, error } = await supabase.from("cities").select("*");
    if (error) {
     throw error;
    }
    dispatch({ type: 'cities/loaded', payload: data })
  } catch {
   dispatch({ type: 'rejected', payload: new Error('Problem loading cities data') })
  }
 }

 fetchCities();
 }, []);

 // Fetch one city
 async function getCity(id: string) {
  if (currentCity && id === currentCity.id ) return;
  dispatch({type: 'loading'})

   try {
   const { data, error } = await supabase.from("cities").select("*").eq("id", id).single();

   if(data) {
    dispatch({ type: 'city/loaded', payload: data })
   } else {
    console.error(error)
   }

  } catch {
   dispatch({ type: 'rejected', payload: new Error('There was error loading the city data!!')})
  }
 }

 // Create a new city object in form
 async function createCity(newCity: NewCity) {
  dispatch({ type: 'loading' })

  try {
   const { data, error } = await supabase.from("cities").insert([
    {
     cityname: newCity.cityname,
     country: newCity.country,
     emoji: newCity.emoji,
     date: newCity.date,
     notes: newCity.notes,
     lat: Number(newCity?.lat),
     lng: Number(newCity?.lng),
    },
   ])
   .select()
   .single();
   
   if (error) throw error;
   
   dispatch({ type: 'city/created', payload: data });
  
  } catch(error) {
   dispatch({ type: 'rejected', payload: 'There was error creating a new city data.' })
  }
 }

 // Delete a city
 async function deleteCity(id: string) {
  dispatch({ type: 'loading' })

  try {
   await supabase.from("cities").delete().eq("id", id);
   dispatch({ type: 'city/deleted', payload: id})
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
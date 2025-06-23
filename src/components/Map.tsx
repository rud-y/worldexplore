import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

export default function Map() {
 
 const { cities } = useCities();
 
 const[mapPosition, setMapPosition] = useState([60, 0.5])
 const [searchParams] = useSearchParams();
 const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition }: {isLoading: boolean; position: GeolocationPosition | null; getPosition: () => void} = useGeolocation();

 const [ lat, lng ] = useUrlPosition();

 // const lat = searchParams.get("lat");
 // const lng = searchParams.get("lng");
 
 useEffect(function() {
  if(lat & lng) setMapPosition([lat, lng]);
 }, [lat, lng]);
 
 
 return (
  <div className={styles.mapContainer} onClick={() => {navigate("form")}}>
    <Button type="position" onClick={getPosition}>{isLoadingPosition ? 'Loading . . .' : 'Use your geoposition'}</Button>
    <MapContainer
      center={mapPosition}
      zoom={8}
      scrollWheelZoom={true}
      className={styles.map}>
     <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
     />

     {cities.map((city) => (
      <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
       <Popup>
         <span>{city.emoji}</span> <span>{city.cityName}</span>
       </Popup>
     </Marker>))}
     <ChangeCenter position={[lat || 45, lng || 10] }/>
     <DetectClick />
    </MapContainer>
   </div>
 )
}

function ChangeCenter({ position }) {
 const map = useMap();
 map.setView(position);

 return null;
}

function DetectClick() {
 const navigate = useNavigate();

 useMapEvents({
  click: (e: Event) => 
   {
    console.log('eee: ', e)
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
   }
 })
}
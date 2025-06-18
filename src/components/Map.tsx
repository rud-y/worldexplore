import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

export default function Map() {
 
 const { cities } = useCities();
 
 const[mapPosition, setMapPosition] = useState([45,10])
 
 const [searchParams] = useSearchParams();
 const lat = searchParams.get("lat");
 const lng = searchParams.get("lng");
 console.log('lat:: ', lat)
 
 useEffect(function() {
  if(lat & lng) setMapPosition([lat, lng]);
 }, [lat, lng]);
 
 function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
   click: (e) => 
    {
     console.log('eee: ', e)
     navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
 }

  return (
   <div className={styles.mapContainer} onClick={() => {navigate("form")}}>

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

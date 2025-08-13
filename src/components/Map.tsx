import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';

export default function Map() {
 
 const { cities } = useCities();
 
 const [mapPosition, setMapPosition] = useState([0, 0])
 const [searchParams] = useSearchParams();
 const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition }: { isLoading: boolean; position: GeolocationPosition | null; getPosition: () => void} = useGeolocation();

 const latParam = Number(searchParams.get('lat'));
 const lngParam = Number(searchParams.get('lng'));

 const lat = !isNaN(latParam) ? Number(latParam) : null;
 const lng = !isNaN(lngParam) ? Number(lngParam) : null;

 const navigate = useNavigate();

 useEffect(() => {
  if (lat !== null && lng !== null) {
    setMapPosition([lat, lng]);
  } else if (geolocationPosition) {
    setMapPosition([geolocationPosition.lat , geolocationPosition.lng]);
  }
}, [lat, lng, geolocationPosition]);

 
 return (
   <div>
     <Button type="position" onClick={getPosition}>
       {isLoadingPosition ? "Loading . . ." : "Use your geoposition"}
     </Button>

     <MapContainer
       className={styles.mapContainer}
       onClick={() => {
         navigate("form");
       }}
       center={mapPosition}
       zoom={8}
       scrollWheelZoom={true}
       className={styles.map}
     >
       <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
       />

       {cities.map((city) => {
         if (!city.position) return null;
         return (
           <Marker
             position={[city.position.lat, city.position.lng]}
             key={city.id}
           >
             <Popup>
               <span>{city.emoji}</span> <span>{city.cityName}</span>
             </Popup>
           </Marker>
         );
       })}

       {lat !== null && lng !== null && <ChangeCenter position={[lat, lng]} />}
       <DetectClick />
     </MapContainer>
   </div>
 );
}

function ChangeCenter({ position }: { position: [number, number] }) {
 const map = useMap();
 map.setView(position);

 return null;
}

function DetectClick() {
 const navigate = useNavigate();

 useMapEvents({
  click: (e) => 
   {
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
   }
 })
 return null;
}
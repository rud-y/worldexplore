import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { LatLngTuple, LeafletMouseEvent } from "leaflet";

export default function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState<LatLngTuple>([47, 9]);
  const [searchParams] = useSearchParams();

  const {
    isLoading: isLoadingPosition,
    position: _geolocationPosition,
    getPosition,
  }: {
    isLoading: boolean;
    position: { lat: number; lng: number } | null;
    getPosition: () => void;
  } = useGeolocation();

 const lat = searchParams.get("lat");
 const lng = searchParams.get("lng");

 useEffect(() => {
   // Check if the string exists in the URL at all
   if (lat !== null && lng !== null) {
     setMapPosition([Number(lat), Number(lng)]);
   }
 }, [lat, lng]);

  return (
    <div>
      <Button type="button" onClick={getPosition}>
        {isLoadingPosition ? "Loading . . ." : "Use your geoposition"}
      </Button>

      <MapContainer
        className={styles.mapContainer}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          if (!city) return null;
          return (
            <Marker position={[city.lat, city.lng]} key={city.id}>
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityname}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngTuple }) {
  const map = useMap();
  map.setView(position);

  return null ;
}

function MapClickHandler() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}
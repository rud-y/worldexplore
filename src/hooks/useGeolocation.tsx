import { useState } from "react";

type Position = {
 lat: number;
 lng: number;
}

function useGeolocation(defaultPosition: Position | null = null) {
 
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
     (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // Value validity check
      const isValid = (val: unknown): val is number =>
        typeof val === "number" && !isNaN(val);

      if (isValid(lat) && isValid(lng)) {
        setPosition({ lat, lng });
      }
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

export { useGeolocation } 
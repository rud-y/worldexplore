import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [ searchParams ] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log('LAT search params: ', Number(lat))

 return [Number(lat), Number(lng)];
}
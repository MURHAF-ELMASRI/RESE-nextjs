import { Coord } from "@rese/common/types/Coord";
import { useEffect, useState } from "react";

function useLatLng() {
  const [location, setLocation] = useState<Coord|null>(null);

  useEffect(() => {
    function handleSuccess(position:GeolocationPosition) {
      console.log(position);
      
        setLocation({lat:position.coords.latitude,lng:position.coords.longitude})
    }

    function handleError() {
      setLocation(null);
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return location;
}

export default useLatLng;



import { useEffect, useState } from "react";




 export const useUserLocation = (setLoading:(value:boolean)=>void) => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

  
    useEffect(() => {
      
      if ("geolocation" in navigator) {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            console.log("the gioloaction going my ",lat,lng);
            setLocation({ lat, lng });
            setLoading(false); // Stop loading once location is fetched
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (error) => {
            setError("Unable to retrieve your location.");
            setLoading(false); // Stop loading once location is fetched
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        setLoading(false); // Stop loading once location is fetched
      }
    }, [setLoading]);
    return {  location, error };
  };
  
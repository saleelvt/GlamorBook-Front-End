import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

const MapPicker: React.FC<{
  onLocationSelect: (lat: number, lng: number) => void;
}> = ({ onLocationSelect }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });


  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  if (!isLoaded) return <div>Loading...</div>;


  
  return (
    <GoogleMap
      zoom={10}
      center={markerPosition || { lat:11.258753, lng: 75.780411 }} // Default center position
      mapContainerStyle={{
        width: "400px",
        height: "300px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.6)",
      }}
      onClick={(e) => {
        const lat = e.latLng?.lat() || 0;
        const lng = e.latLng?.lng() || 0;
        setMarkerPosition({ lat, lng });
        onLocationSelect(lat, lng);
      }}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

export default MapPicker;

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 36.7538, // الجزائر العاصمة مبدئيا
  lng: 3.0588,
};

export default function MapPicker({ onLocationSelect }) {
  const [marker, setMarker] = useState(null);

  const handleClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    if (onLocationSelect) onLocationSelect({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC2956nP5LknC6VXWodeYP7RRU-Yt217Ek">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
}

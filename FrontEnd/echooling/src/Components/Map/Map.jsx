import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import Styles from '../Map/Map.module.css'
const Maper = () => {
  const apiKey = "AIzaSyAQ8o9Ka9Aar5bPhRgIagHSKqr-UE3ncGo";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:apiKey, 
});
const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
          className={Styles.MapContainer}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Maper;




"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import addCurrentLocation from 'google-maps-current-location'

export default function GoogleMapView() {
   const contianerStyle = {
      width: '60%',
      height: '80vh'
   }
   // const coordinate = {
   //    lat: 10.7956971,
   //    lng: 78.7599567
   // }
   const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 })
   useEffect(() => {
      getUserLocation();
   }, [])
   const getUserLocation = () => navigator.geolocation.getCurrentPosition((position) =>{
      setCoordinate({ lat: position.coords.latitude, lng: position.coords.longitude });
      console.log(position);
      
   })
   return (
      <div className="min-h-screen flex items-center justify-center flex-row">
         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <GoogleMap
               mapContainerStyle={contianerStyle}
               center={coordinate}
               zoom={13}
            >
               <Marker position={coordinate} />

            </GoogleMap>

         </LoadScript>

      </div>
   )
}
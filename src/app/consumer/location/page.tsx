"use client";
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Wrapper } from '@googlemaps/react-wrapper';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface LocationCoordinates {
   lat: number;
   lng: number;
}

const LocationPage = () => {
   const router = useRouter();
   const [map, setMap] = useState<google.maps.Map | null>(null);
   const [selectedLocation, setSelectedLocation] = useState<LocationCoordinates | null>(null);

   const mapContainerStyle = {
      width: '100%',
      height: '70vh',
      position: 'relative' as const
   };

   const markerStyle = {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      pointerEvents: 'none' as const
   };



   const initMap = useCallback(async (mapDiv: HTMLElement) => {
      const defaultCenter = {
         lat: 0,
         lng: 0
      };
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

      const mapInstance = new Map(mapDiv, {
         zoom: 14,
         center: defaultCenter,
         mapId: "LOCATION_MAP",
         gestureHandling: "greedy"
      });

      setMap(mapInstance);
   }, []);

   const refCallback = useCallback((element: HTMLDivElement | null) => {
      if (element) initMap(element);
   }, [initMap]);

   useEffect(() => {
      let watchId: number;
      if (navigator.geolocation) {
         watchId = navigator.geolocation.watchPosition(
            (position) => {
               const location = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
               };
               setSelectedLocation(location);
               if (map) map.panTo(location);
            },
            (error) => {
               console.error("Error getting location:", error);
               toast.error("Could not get current location");
            },
            {
               enableHighAccuracy: true,
               maximumAge: 0,
               timeout: 5000
            }
         );
      }
      return () => {
         if (watchId) navigator.geolocation.clearWatch(watchId);
      };
   }, [map]);

   const handleSaveLocation = async () => {
      if (!selectedLocation) {
         toast.error("Please select a location first");
         return;
      }

      try {
         const locationData = {
            type: "Point",
            coordinates: [selectedLocation.lng, selectedLocation.lat]
         };

         await axios.post('/api/users/location', { location: locationData });
         toast.success("Location saved successfully");
         router.push('/consumer/profile');
      } catch (error) {
         console.error('Error saving location:', error);
         toast.error(error instanceof Error ? error.message : "Error saving location");
      }
   };

   return (
      <div className="min-h-screen p-4">
         <Toaster position="top-right" reverseOrder={false} />
         <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Set Your Location</h1>

            <div className="bg-white rounded-lg shadow-lg p-4">
               <div className="relative">
                  <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                     <div style={mapContainerStyle} ref={refCallback}>
                        <div style={markerStyle}>
                           <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-red-500"
                           >
                              <circle cx="12" cy="12" r="3" fill="currentColor" />
                              <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                           </svg>
                        </div>
                     </div>
                  </Wrapper>

                  {selectedLocation && (
                     <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
                        <p className="text-sm text-gray-600">
                           Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                        </p>
                     </div>
                  )}
               </div>

               <div className="mt-6 flex justify-end gap-4">
                  <button
                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                     onClick={() => router.back()}
                  >
                     Cancel
                  </button>
                  <button
                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     onClick={handleSaveLocation}
                     disabled={!selectedLocation}
                  >
                     Save Location
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LocationPage;

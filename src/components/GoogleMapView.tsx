/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { useEffect, useState, useRef, useCallback } from "react"

declare global {
  interface Window {
    google: any
  }
}

export default function GoogleMapView() {
  const containerStyle = {
    width: "60%",
    height: "80vh",
  }

  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 })
  const mapRef = useRef<google.maps.Map | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    getUserLocation()
  }, [])

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
      setCenter(newPosition)
      setMarkerPosition(newPosition)
    })
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const onCenterChanged = () => {
    if (mapRef.current && !isInitialLoad) {
      const newCenter = mapRef.current.getCenter()
      if (newCenter) {
        setMarkerPosition({ lat: newCenter.lat(), lng: newCenter.lng() })
      }
    }
  }

  const onDragEnd = () => {
    setIsInitialLoad(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-row">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onCenterChanged={onCenterChanged}
          onDragEnd={onDragEnd}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScript>
      <div className="ml-4">
        <h2 className="text-xl font-bold mb-2">Selected Location:</h2>
        <p>Latitude: {markerPosition.lat.toFixed(6)}</p>
        <p>Longitude: {markerPosition.lng.toFixed(6)}</p>
      </div>
    </div>
  )
}


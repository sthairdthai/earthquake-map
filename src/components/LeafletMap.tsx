"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for broken marker icons
const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  //shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
})

// Define TypeScript interfaces
interface Earthquake {
  id: string
  properties: {
    mag: number
    place: string
  }
  geometry: {
    coordinates: [number, number, number] // [longitude, latitude, depth]
  }
}

const LeafletMap = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]) // ✅ Typed state

  useEffect(() => {
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      .then((res) => res.json())
      .then((data) => setEarthquakes(data.features)) // ✅ Data is properly typed
  }, [])

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={3} className="h-screen w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {earthquakes.map((quake) => {
        const [lng, lat] = quake.geometry.coordinates
        return (
          <Marker key={quake.id} position={[lat, lng]} icon={markerIcon}>
            <Popup>
              <strong>Magnitude:</strong> {quake.properties.mag} <br />
              <strong>Location:</strong> {quake.properties.place}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default LeafletMap

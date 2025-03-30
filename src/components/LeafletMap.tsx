"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"

const LeafletMap = () => {
  const [earthquakes, setEarthquakes] = useState<any[]>([])

  useEffect(() => {
    // Fetch earthquake data from USGS API
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      .then((res) => res.json())
      .then((data) => setEarthquakes(data.features))
  }, [])

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={3} className="h-screen w-full">
      {/* OpenStreetMap Tile Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render Earthquake Markers */}
      {earthquakes.map((quake) => {
        const [lng, lat] = quake.geometry.coordinates
        return (
          <Marker key={quake.id} position={[lat, lng]}>
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

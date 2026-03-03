'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const SOWETO_CENTER: [number, number] = [-26.2678, 27.8585]

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const driverMarkerRef = useRef<L.Marker | null>(null)
  const driverLatLngRef = useRef<[number, number]>([...SOWETO_CENTER])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Init map
    const map = L.map(mapRef.current, {
      center: SOWETO_CENTER,
      zoom: 14,
      zoomControl: false,
    })
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Your location marker — crimson pin
    const yourIcon = L.divIcon({
      className: '',
      html: `<div style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z" fill="#CC0000"/>
          <circle cx="14" cy="14" r="5" fill="white"/>
        </svg>
      </div>`,
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      popupAnchor: [0, -38],
    })
    L.marker(SOWETO_CENTER, { icon: yourIcon })
      .addTo(map)
      .bindPopup('Your Location')

    // Driver marker — dark square with truck icon
    const driverIcon = L.divIcon({
      className: '',
      html: `<div style="width:32px;height:32px;background:#0A0A0A;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4))">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
          <rect x="9" y="11" width="14" height="10" rx="2"/>
          <circle cx="12" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
        </svg>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20],
    })
    const driverStart: [number, number] = [
      SOWETO_CENTER[0] + 0.008,
      SOWETO_CENTER[1] - 0.005,
    ]
    driverLatLngRef.current = driverStart
    const driverMarker = L.marker(driverStart, { icon: driverIcon })
      .addTo(map)
      .bindPopup('Driver')
    driverMarkerRef.current = driverMarker

    // Animate driver marker every 5s
    const interval = setInterval(() => {
      const [lat, lng] = driverLatLngRef.current
      const newLat = lat + (Math.random() - 0.5) * 0.002
      const newLng = lng + (Math.random() - 0.5) * 0.002
      driverLatLngRef.current = [newLat, newLng]
      driverMarkerRef.current?.setLatLng([newLat, newLng])
    }, 5000)

    return () => {
      clearInterval(interval)
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="w-full h-56 overflow-hidden shadow-card"
      style={{ zIndex: 0, border: '1px solid #E5E5E5' }}
    />
  )
}

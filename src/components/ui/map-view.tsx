import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { type ReactNode, useEffect, useRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

// Fix for default marker icons in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import shadowIcon from 'leaflet/dist/images/marker-shadow.png'

if (typeof window !== 'undefined') {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: shadowIcon
  })
}

interface MapViewProps {
  lat: number | string
  lng: number | string
  zoom?: number
  className?: string
  draggable?: boolean
  onMarkerDragEnd?: (lat: number, lng: number) => void
  onClick?: (lat: number, lng: number) => void
  onZoomChange?: (zoom: number) => void
  children?: ReactNode
  scrollWheelZoom?: boolean
}

function MapController({ center, zoom, scrollWheelZoom }: { center: [number, number]; zoom: number; scrollWheelZoom: boolean }) {
  const map = useMap()
  const lastCenter = useRef<[number, number]>(center)

  useEffect(() => {
    const isNewCenter = center[0] !== lastCenter.current[0] || center[1] !== lastCenter.current[1]
    if (isNewCenter) {
      map.setView(center, zoom)
      lastCenter.current = center
    }
  }, [center, zoom, map])

  useEffect(() => {
    if (scrollWheelZoom) {
      map.scrollWheelZoom.enable()
    } else {
      map.scrollWheelZoom.disable()
    }
  }, [scrollWheelZoom, map])

  return null
}

function MapEvents({ onClick, onZoomChange }: { onClick?: (lat: number, lng: number) => void; onZoomChange?: (zoom: number) => void }) {
  const map = useMapEvents({
    click(e) {
      if (onClick) onClick(e.latlng.lat, e.latlng.lng)
    },
    zoomend() {
      if (onZoomChange) onZoomChange(map.getZoom())
    }
  })
  return null
}

export function MapView({
  lat,
  lng,
  zoom = 15,
  className = '',
  draggable = false,
  onMarkerDragEnd,
  onClick,
  onZoomChange,
  children,
  scrollWheelZoom = false
}: MapViewProps) {
  const position: [number, number] = [Number(lat) || -6.2088, Number(lng) || 106.8456]
  const markerRef = useRef<L.Marker>(null)

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current
      if (marker != null && onMarkerDragEnd) {
        const newPos = marker.getLatLng()
        onMarkerDragEnd(newPos.lat, newPos.lng)
      }
    }
  }

  return (
    <div className={`relative z-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 ${className}`}>
      <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={scrollWheelZoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={position} zoom={zoom} scrollWheelZoom={scrollWheelZoom} />
        <MapEvents onClick={onClick} onZoomChange={onZoomChange} />
        <Marker position={position} draggable={draggable} eventHandlers={eventHandlers} ref={markerRef} />
        {children}
      </MapContainer>
    </div>
  )
}

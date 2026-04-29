import { createClusterIcon, createSingleMarkerIcon, injectClusterStyles } from '@/components/ui/cluster-marker'
import type { Massa } from '@/types/massa'
import type { TFunction } from 'i18next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MassaPopupContent } from './massa-popup'

interface ClusterMapProps {
  massas: Massa[]
  className?: string
  t: TFunction
}

export function ClusterMap({ massas, className = '', t }: ClusterMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Inject cluster styles once
  useEffect(() => {
    injectClusterStyles()
  }, [])

  // Create single marker icon (memoized)
  const singleIcon = useMemo(() => createSingleMarkerIcon(), [])

  // Fit bounds when data changes
  useEffect(() => {
    if (!mapRef.current || massas.length === 0) return

    const validPoints = massas.filter((m) => m.latitude && m.longitude && Number(m.latitude) !== 0 && Number(m.longitude) !== 0)

    if (validPoints.length === 0) return

    const bounds = L.latLngBounds(validPoints.map((m) => [Number(m.latitude), Number(m.longitude)] as L.LatLngTuple))

    mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
  }, [massas, isReady])

  // Filter out massa with no coords
  const validMassas = useMemo(
    () => massas.filter((m) => m.latitude && m.longitude && Number(m.latitude) !== 0 && Number(m.longitude) !== 0),
    [massas]
  )

  return (
    <div className={`relative z-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 ${className}`}>
      <MapContainer
        center={[-2.5, 118.0]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        ref={mapRef}
        whenReady={() => setIsReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterIcon}
          maxClusterRadius={80}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          disableClusteringAtZoom={18}
          animate={true}
          animateAddingMarkers={true}
        >
          {validMassas.map((massa) => (
            <Marker key={massa.id} position={[Number(massa.latitude), Number(massa.longitude)]} icon={singleIcon}>
              <Popup maxWidth={350} minWidth={320} className="massa-popup-container" offset={[0, -10]}>
                <MassaPopupContent massa={massa} t={t} />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Map overlay gradient at bottom for better contrast */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-8 bg-linear-to-t from-black/5 to-transparent" />
    </div>
  )
}

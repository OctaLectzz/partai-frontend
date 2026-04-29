import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapView } from './map-view'

interface LocationPickerProps {
  lat: number | string
  lng: number | string
  onChange: (lat: number, lng: number) => void
  searchQuery?: string
  label?: string
  helpText?: string
  error?: string
  required?: boolean
}

export function LocationPicker({ lat, lng, onChange, searchQuery, label, helpText, error, required = false }: LocationPickerProps) {
  const { t } = useTranslation()
  const defaultHelpText = helpText || t('public.locationPickerHelp')
  const defaultLabel = label || t('public.locationVerificationLabel')

  const [position, setPosition] = useState<[number, number]>([Number(lat) || -6.2088, Number(lng) || 106.8456])
  const [zoom, setZoom] = useState(13)

  const lastSearchQuery = useRef<string>('')
  const initialSearchSwallowed = useRef(false)

  // Update internal position when prop changes (from external source/reset)
  useEffect(() => {
    if (lat && lng && Number(lat) !== 0) {
      setPosition([Number(lat), Number(lng)])

      // Swallow initial query if coords exist (for edit mode)
      if (!initialSearchSwallowed.current && searchQuery) {
        lastSearchQuery.current = searchQuery
        initialSearchSwallowed.current = true
      }
    }
  }, [lat, lng, searchQuery])

  // Sync state with props when searching
  useEffect(() => {
    if (searchQuery && searchQuery !== lastSearchQuery.current) {
      const searchLocation = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`)
          const data = await response.json()
          if (data && data.length > 0) {
            const newLat = parseFloat(data[0].lat)
            const newLon = parseFloat(data[0].lon)
            setPosition([newLat, newLon])
            if (zoom < 15) setZoom(15)
            onChange(newLat, newLon)
            lastSearchQuery.current = searchQuery
          }
        } catch (err) {
          console.error('Geocoding error:', err)
        }
      }
      const timeoutId = setTimeout(searchLocation, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [searchQuery, onChange, zoom])

  const handleMapClick = (lat: number, lng: number) => {
    setPosition([lat, lng])
    onChange(lat, lng)
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      {defaultLabel && (
        <label className="text-foreground text-sm font-medium">
          {defaultLabel}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="border-card-border relative z-0 h-[400px] w-full overflow-hidden rounded-2xl border-2 shadow-inner">
        <MapView
          lat={position[0]}
          lng={position[1]}
          zoom={zoom}
          draggable={true}
          onMarkerDragEnd={handleMapClick}
          onClick={handleMapClick}
          onZoomChange={setZoom}
          scrollWheelZoom={true}
          className="h-full w-full"
        />
      </div>

      <div className="bg-card-hover/30 flex items-center justify-between rounded-lg px-3 py-2 font-mono text-[11px]">
        <div className="flex gap-4">
          <span className="text-muted-foreground">
            <span className="text-primary font-bold">LAT:</span> {position[0].toFixed(6)}
          </span>
          <span className="text-muted-foreground">
            <span className="text-primary font-bold">LNG:</span> {position[1].toFixed(6)}
          </span>
        </div>
        {defaultHelpText && <span className="text-muted text-[10px] italic">{defaultHelpText}</span>}
      </div>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

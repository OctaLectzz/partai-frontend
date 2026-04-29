/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'react-leaflet-cluster' {
  import type L from 'leaflet'

  interface MarkerClusterGroupProps {
    children?: React.ReactNode
    chunkedLoading?: boolean
    iconCreateFunction?: (cluster: { getChildCount(): number }) => L.Icon | L.DivIcon
    maxClusterRadius?: number | ((zoom: number) => number)
    spiderfyOnMaxZoom?: boolean
    showCoverageOnHover?: boolean
    zoomToBoundsOnClick?: boolean
    disableClusteringAtZoom?: number
    animate?: boolean
    animateAddingMarkers?: boolean
    [key: string]: any
  }

  const MarkerClusterGroup: React.FC<MarkerClusterGroupProps>
  export default MarkerClusterGroup
}

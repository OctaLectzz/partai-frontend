import L from 'leaflet'
import type { ReactNode } from 'react'

/** Minimal interface for a Leaflet MarkerCluster (from leaflet.markercluster plugin) */
interface MarkerCluster {
  getChildCount(): number
}

/**
 * Creates a custom cluster icon for Leaflet MarkerCluster.
 * Displays a gradient circle with count and animated zone ring.
 */
export function createClusterIcon(cluster: MarkerCluster): L.DivIcon {
  const count = cluster.getChildCount()
  const formattedCount = formatClusterCount(count)

  // Determine size & color based on cluster count
  let size: number
  let zoneSize: number
  let gradientFrom: string
  let gradientTo: string
  let glowColor: string

  if (count < 50) {
    size = 48
    zoneSize = 80
    gradientFrom = '#ffd700'
    gradientTo = '#e6c200'
    glowColor = 'rgba(255, 215, 0, 0.3)'
  } else if (count < 500) {
    size = 56
    zoneSize = 110
    gradientFrom = '#ffb700'
    gradientTo = '#e69500'
    glowColor = 'rgba(255, 183, 0, 0.25)'
  } else if (count < 5000) {
    size = 64
    zoneSize = 140
    gradientFrom = '#ff8c00'
    gradientTo = '#cc7000'
    glowColor = 'rgba(255, 140, 0, 0.25)'
  } else {
    size = 72
    zoneSize = 180
    gradientFrom = '#ff6600'
    gradientTo = '#cc5200'
    glowColor = 'rgba(255, 102, 0, 0.2)'
  }

  const fontSize = count >= 100000 ? 11 : count >= 10000 ? 12 : count >= 1000 ? 13 : 14

  const html = `
    <div style="
      position: relative;
      width: ${zoneSize}px;
      height: ${zoneSize}px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <!-- Zone circle (pulse) -->
      <div style="
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: ${glowColor};
        border: 2px solid ${gradientFrom}33;
        animation: cluster-pulse 2.5s ease-in-out infinite;
      "></div>

      <!-- Inner marker circle -->
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 4px 14px ${gradientFrom}66, 0 2px 6px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        cursor: pointer;
        transition: transform 0.2s ease;
        z-index: 2;
      ">
        <span style="
          color: #1a1a1a;
          font-weight: 800;
          font-size: ${fontSize}px;
          font-family: 'Inter', system-ui, sans-serif;
          letter-spacing: -0.5px;
          text-shadow: 0 1px 0 rgba(255,255,255,0.3);
          line-height: 1;
        ">${formattedCount}</span>
      </div>
    </div>
  `

  return L.divIcon({
    html,
    className: 'custom-cluster-icon',
    iconSize: L.point(zoneSize, zoneSize),
    iconAnchor: L.point(zoneSize / 2, zoneSize / 2)
  })
}

/**
 * Creates a custom single marker icon for individual massa points.
 */
export function createSingleMarkerIcon(): L.DivIcon {
  const html = `
    <div style="
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ffd700, #e6c200);
      border: 3px solid white;
      box-shadow: 0 3px 10px rgba(255,215,0,0.4), 0 1px 4px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
  `

  return L.divIcon({
    html,
    className: 'custom-single-marker',
    iconSize: L.point(36, 36),
    iconAnchor: L.point(18, 18)
  })
}

/**
 * Formats a number for cluster display (e.g. 1500 → "1.5K", 1200000 → "1.2M")
 */
export function formatClusterCount(count: number): string {
  if (count >= 1_000_000) {
    const val = count / 1_000_000
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`
  }
  if (count >= 1_000) {
    const val = count / 1_000
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}K`
  }
  return count.toLocaleString()
}

/**
 * Global CSS for cluster marker animations. Call once to inject styles.
 */
export function injectClusterStyles(): void {
  if (document.getElementById('cluster-marker-styles')) return

  const style = document.createElement('style')
  style.id = 'cluster-marker-styles'
  style.textContent = `
    @keyframes cluster-pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.08); opacity: 1; }
    }

    .custom-cluster-icon {
      background: transparent !important;
      border: none !important;
    }

    .custom-single-marker {
      background: transparent !important;
      border: none !important;
    }

    .custom-cluster-icon:hover > div > div:last-child {
      transform: scale(1.08);
    }

    .custom-single-marker:hover > div {
      transform: scale(1.15);
    }

    /* Override leaflet cluster defaults */
    .marker-cluster {
      background: transparent !important;
    }
    .marker-cluster div {
      background: transparent !important;
    }

    /* Custom popup styling */
    .massa-popup-container .leaflet-popup-content-wrapper {
      border-radius: 16px;
      padding: 0;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
      background: var(--color-card, #ffffff);
    }
    .dark .massa-popup-container .leaflet-popup-content-wrapper {
      background: #1e2030;
    }
    .massa-popup-container .leaflet-popup-content {
      margin: 14px 20px;
      font-size: 14px;
      line-height: 1.5;
    }
    .massa-popup-container .leaflet-popup-tip {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background: var(--color-card, #ffffff);
    }
    .dark .massa-popup-container .leaflet-popup-tip {
      background: #1e2030;
    }
    .massa-popup-container .leaflet-popup-close-button {
      top: 8px !important;
      right: 8px !important;
      color: #64748b !important;
      font-size: 20px !important;
      width: 28px !important;
      height: 28px !important;
      display: flex !important;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
    .dark .massa-popup-container .leaflet-popup-close-button {
      color: #f1f5f9 !important;
    }
    .massa-popup-container .leaflet-popup-close-button:hover {
      color: #0f172a !important;
      background: rgba(0,0,0,0.05);
      border-radius: 50%;
    }
    .dark .massa-popup-container .leaflet-popup-close-button:hover {
      color: white !important;
      background: rgba(255,255,255,0.1);
    }
  `
  document.head.appendChild(style)
}

/** React component version for displaying cluster count inline (e.g. in tables/lists) */
interface ClusterBadgeProps {
  count: number
  className?: string
}

export function ClusterBadge({ count, className = '' }: ClusterBadgeProps): ReactNode {
  const formatted = formatClusterCount(count)
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-linear-to-r from-amber-500 to-amber-600 px-2.5 py-1 text-xs font-bold text-white shadow-md ${className}`}
    >
      {formatted}
    </span>
  )
}

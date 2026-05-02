import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin } from 'lucide-react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const regions = [
  { name: 'Kecamatan Sukoharjo', kader: '2,340', lat: -7.6787, lng: 110.8358 },
  { name: 'Kecamatan Tawangsari', kader: '3,120', lat: -7.7333, lng: 110.8333 },
  { name: 'Kecamatan Polokarto', kader: '2,890', lat: -7.65, lng: 110.8833 },
  { name: 'Kecamatan Gatak', kader: '2,100', lat: -7.5833, lng: 110.7667 },
  { name: 'Kecamatan Bendosari', kader: '2,000', lat: -7.6667, lng: 110.85 }
]

export default function MapSection() {
  return (
    <section id="peta" className="bg-abstract-map relative overflow-hidden py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="fade-up mb-16 text-center">
          <span className="section-label">Jangkauan</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Peta Perjuangan</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="fade-left relative h-[350px] w-full overflow-hidden rounded-2xl border-4 border-white/20 shadow-xl sm:h-[450px]">
            <MapContainer center={[-7.6787, 110.8358]} zoom={11} scrollWheelZoom={false} className="z-0 h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {regions.map((region, i) => (
                <Marker key={i} position={[region.lat, region.lng]}>
                  <Popup>
                    <div className="text-center">
                      <strong className="mb-1 block text-sm text-golkar-dark-gold">{region.name}</strong>
                      <span className="text-xs text-gray-600">{region.kader} Kader Aktif</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="fade-right space-y-4">
            {regions.map((region, i) => (
              <div key={i} className="card-hover group flex items-center gap-4 rounded-xl bg-white p-5 shadow-md">
                <div className="gradient-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 transition group-hover:text-golkar-dark-gold">{region.name}</h4>
                  <p className="mt-0.5 text-xs text-gray-400">{region.kader} kader aktif</p>
                </div>

                <div className="h-2 w-16 overflow-hidden rounded-full bg-golkar-yellow/20">
                  <div
                    className="gradient-gold h-full rounded-full"
                    style={{ width: `${(parseInt(region.kader.replace(',', '')) / 3200) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

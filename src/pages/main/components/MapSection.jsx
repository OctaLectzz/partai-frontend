/**
 * Komponen MapSection (Peta Perjuangan)
 * -------------------------------------------------------------------------
 * Menampilkan peta sebaran wilayah dan statistik kader menggunakan elemen Leaflet (Peta Asli).
 * 
 * Konsep Pembelajaran:
 * 1. React Leaflet: Menggunakan library `react-leaflet` untuk menampilkan peta interaktif
 *    (bisa di-zoom, digeser) lengkap dengan penanda (marker) dan popup informasi.
 * 2. Progress Bar: Membuat bar persentase (progress) yang panjangnya berubah dinamis menggunakan inline style.
 */

import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import aset gambar default leaflet karena sering bermasalah saat proses build di React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Memperbaiki masalah path icon bawaan Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Data statistik per wilayah lengkap dengan koordinat Latitude & Longitude asli
const regions = [
  { name: 'Kecamatan Sukoharjo', kader: '2,340', lat: -7.6787, lng: 110.8358 },
  { name: 'Kecamatan Tawangsari', kader: '3,120', lat: -7.7333, lng: 110.8333 },
  { name: 'Kecamatan Polokarto', kader: '2,890', lat: -7.6500, lng: 110.8833 },
  { name: 'Kecamatan Gatak', kader: '2,100', lat: -7.5833, lng: 110.7667 },
  { name: 'Kecamatan Bendosari', kader: '2,000', lat: -7.6667, lng: 110.8500 },
];

export default function MapSection() {
  return (
    <section id="peta" className="relative py-24 lg:py-32 overflow-hidden bg-abstract-map">
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 fade-up">
          <span className="section-label">Jangkauan</span>
          <h2 className="section-title text-3xl md:text-5xl text-white mt-3">Peta Perjuangan</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        {/* 2 Kolom Layout (Kiri = Peta Leaflet, Kanan = Daftar Wilayah) */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* KOLOM KIRI: Visualisasi Peta (Leaflet JS) */}
          <div className="fade-left relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/20">
            <MapContainer 
              center={[-7.6787, 110.8358]} // Titik tengah peta (diambil dari pusat Sukoharjo)
              zoom={11} // Seberapa dekat peta saat pertama dimuat
              scrollWheelZoom={false} // Mencegah peta ter-zoom tidak sengaja saat user scroll halaman ke bawah
              className="w-full h-full z-0"
            >
              {/* Layer Gambar Peta (Bersumber dari OpenStreetMap) */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Mapping marker untuk setiap wilayah di array regions */}
              {regions.map((region, i) => (
                <Marker key={i} position={[region.lat, region.lng]}>
                  {/* Popup yang muncul saat marker diklik */}
                  <Popup>
                    <div className="text-center">
                      <strong className="text-golkar-dark-gold text-sm block mb-1">{region.name}</strong>
                      <span className="text-gray-600 text-xs">{region.kader} Kader Aktif</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* KOLOM KANAN: Daftar Nama Wilayah & Bar Persentase */}
          <div className="fade-right space-y-4">
            {regions.map((region, i) => (
              <div key={i} className="bg-white rounded-xl p-5 flex items-center gap-4 card-hover group shadow-md">
                
                {/* Ikon Map Pin */}
                <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                
                {/* Teks */}
                <div className="flex-1">
                  <h4 className="text-gray-800 font-semibold text-sm group-hover:text-golkar-dark-gold transition">{region.name}</h4>
                  <p className="text-gray-400 text-xs mt-0.5">{region.kader} kader aktif</p>
                </div>
                
                {/* Progress Bar Container (Abu-abu) */}
                <div className="w-16 h-2 bg-golkar-yellow/20 rounded-full overflow-hidden">
                  {/* 
                    Progress Bar Isi (Warna Emas). 
                    Lebar (width) dihitung dari "kader dibuang komanya / 3200 (angka fiktif maksimum) * 100%". 
                  */}
                  <div 
                    className="h-full gradient-gold rounded-full" 
                    style={{ width: `${(parseInt(region.kader.replace(',', '')) / 3200) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

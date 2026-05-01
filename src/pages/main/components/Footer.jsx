/**
 * Komponen Footer (Bagian Bawah Website)
 * -------------------------------------------------------------------------
 * Komponen statis yang selalu berada di paling bawah halaman.
 * Menyediakan informasi tambahan seperti brand, tautan cepat, dan kontak.
 * 
 * Konsep React & Tailwind:
 * 1. Array Mapping: Meloop array `quickLinks` untuk men-generate menu navigasi secara dinamis.
 * 2. Grid System: Menggunakan CSS Grid (grid-cols-1 di mobile, 2 di tablet, 3 di desktop)
 *    untuk membagi layout kolom footer agar selalu proporsional di semua layar.
 */

import { Globe, Mail, MapPin, Phone } from 'lucide-react';

// Array tautan cepat (shortcut) untuk mempermudah navigasi user dari bawah halaman
const quickLinks = ['Beranda', 'Tentang', 'Agenda', 'Program', 'Galeri', 'Berita'];

export default function Footer() {
  return (
    // Tag semantic HTML <footer> dengan padding besar (pt-20 = 80px top padding)
    <footer id="kontak" className="relative pt-20 pb-8 overflow-hidden bg-white">
      
      {/* Kontainer Utama yang membatasi lebar maksimal konten */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Grid 3 Kolom untuk area brand, tautan, dan kontak */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          
          {/* KOLOM 1: Informasi Brand (Logo & Deskripsi) */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                {/* Path gambar diubah ke /img/ untuk kompatibilitas folder public di Vite */}
                <img 
                  src="/img/golkarlogokntl.png" 
                  alt="Logo Golkar" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">DPD</p>
                <p className="text-sm font-bold text-golkar-dark-gold uppercase">Partai Golkar</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dewan Pimpinan Daerah Partai Golkar Kabupaten Sukoharjo. Bersatu membangun negeri.
            </p>
          </div>

          {/* KOLOM 2: Tautan Cepat (Quick Links) */}
          <div>
            <h4 className="text-golkar-dark-gold font-semibold text-sm uppercase tracking-wider mb-5">Tautan</h4>
            {/* Tag <ul> untuk list tanpa titik (di-reset oleh tailwind) */}
            <ul className="space-y-2.5">
              {/* Me-looping array quickLinks. toLowerCase() mengubah "Beranda" menjadi "beranda" untuk dicocokkan dengan ID section HTML */}
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-gray-400 text-sm hover:text-golkar-dark-gold transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: Informasi Kontak Alamat & Email */}
          <div>
            <h4 className="text-golkar-dark-gold font-semibold text-sm uppercase tracking-wider mb-5">Kontak</h4>
            <ul className="space-y-3">
              {/* Menggunakan Lucide Icon (<MapPin/>, dsb) di sebelah kiri teks */}
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" /> Jl. Wadyo Pranoto, Bendosari 55271
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={14} className="shrink-0" /> (0274) 123-456
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={14} className="shrink-0" /> info@golkarskh.or.id
              </li>
            </ul>
          </div>
        </div>

        {/* BAGIAN PALING BAWAH (Copyright & Kebijakan) */}
        {/* Ditandai dengan border tipis (border-t) di bagian atas */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-300 text-xs">
            &copy; {new Date().getFullYear()} DPD Partai Golkar Sukoharjo. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-300 text-xs hover:text-golkar-dark-gold transition">Kebijakan Privasi</a>
            <a href="#" className="text-gray-300 text-xs hover:text-golkar-dark-gold transition">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Komponen About (Tentang Kami)
 * -------------------------------------------------------------------------
 * Komponen ini berfungsi untuk menampilkan profil singkat organisasi (Partai Golkar), 
 * visi, misi, nilai pengabdian, serta statistik di bagian bawah.
 * 
 * Konsep React yang digunakan:
 * 1. Functional Component: Mendeklarasikan komponen menggunakan function (export default function).
 * 2. Array Mapping: Menggunakan fungsi .map() pada array `stats` dan `cards` 
 *    untuk me-render elemen HTML berulang secara otomatis tanpa menulis kode satu per satu.
 * 3. Lucide React: Menggunakan library icon ringan untuk ikon target, bendera, dan pelindung.
 */

import { Target, Flag, ShieldCheck } from 'lucide-react';

// Data statistik organisasi (akan di-map ke dalam 4 kotak di bagian bawah)
const stats = [
  { value: '5', label: 'Wilayah' },
  { value: '78', label: 'Cabang' },
  { value: '12.4K', label: 'Kader' },
  { value: '45K+', label: 'Anggota' }
];

// Data untuk kartu (cards) Visi, Misi, dan Nilai Pengabdian
const cards = [
  {
    icon: Target, // Komponen Ikon dari lucide-react
    title: 'VISI',
    desc: 'Terwujudnya masyarakat Indonesia yang bersatu, berdaulat, maju, makmur dan berkeadilan sosial berdasarkan Pancasila.'
  },
  {
    icon: Flag,
    title: 'MISI',
    desc: 'Mewujudkan pemerintahan yang bersih dan berwibawa, serta menggerakkan ekonomi kerakyatan menuju kesejahteraan merata.'
  },
  {
    icon: ShieldCheck,
    title: 'NILAI PENGABDIAN',
    desc: 'Kekaryaan, kebangsaan, dan religiusitas menjadi pilar utama dalam setiap langkah perjuangan demi kemajuan bangsa.'
  }
];

export default function About() {
  return (
    // Section pembungkus utama dengan padding (py-24) dan background gradient kuning keemasan
    <section id="tentang" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#DAA520]">
      
      {/* Pattern Overlay Halus: Memberikan efek titik-titik (dots) transparan di latar belakang */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      
      {/* Container utama untuk membatasi lebar konten (max-w-7xl) agar tidak terlalu lebar di layar besar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP: Grid 2 Kolom (Kiri untuk Gambar, Kanan untuk Teks & Kartu) */}
        {/* lg:grid-cols-12 membagi layar menjadi 12 kolom virtual di layar desktop */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* KOLOM KIRI: Area Gambar Tokoh (Mengambil 5 dari 12 kolom di desktop) */}
          <div className="lg:col-span-5 relative fade-up mt-8 lg:mt-0">
            {/* Box pembungkus gambar. Di layar HP (sm) ukurannya lebih pendek agar proporsional */}
            <div className="relative w-full max-w-lg mx-auto lg:mx-0 h-[260px] sm:h-[350px] lg:h-[650px] flex items-end justify-center">
              
              {/* Tokoh Utama (Gambar berformat PNG tanpa background) */}
              {/* Note: Path gambar menggunakan /img/ karena folder public akan dilayani langsung dari root path saat di-build */}
              <img 
                src="/img/bahlianjg-removebg-preview.png" 
                alt="Tokoh Golkar" 
                // w-[80%] di mobile agar tidak kebesaran, w-[130%] di desktop agar membesar keluar dari batas container
                className="relative z-10 w-[80%] lg:w-[130%] max-w-none h-auto object-contain object-bottom-[0_20px_30px_rgba(0,0,0,0.4)] scale-100 lg:scale-110 origin-bottom lg:-translate-x-8"
                // Teknik Masking: Menghapus batas bawah gambar secara halus (fade-out) menggunakan gradient transparan ke hitam
                style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 15%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
              />

              {/* Gradasi Kuning di Bawah: Agar bagian bawah gambar menyatu dengan latar belakang */}
              <div className="absolute bottom-0 left-[-30%] right-[-30%] h-24 lg:h-40 bg-gradient-to-t from-[#FFC107] to-transparent z-20 pointer-events-none" />
            </div>
          </div>

          {/* KOLOM KANAN: Area Konten (Mengambil sisa 7 kolom) */}
          <div className="lg:col-span-7 fade-up" style={{ transitionDelay: '0.2s' }}>
            {/* Bagian Header Teks */}
            <div className="mb-10 text-center lg:text-left">
              <span className="text-white font-bold tracking-[0.2em] uppercase text-sm drop-shadow-md">Tentang Kami</span>
              <h2 className="font-[Montserrat] font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-2 leading-tight drop-shadow-lg">
                Gerakan Karya<br />
                <span className="text-gray-900">Untuk Indonesia</span>
              </h2>
            </div>

            {/* Looping (Mapping) data kartu Visi Misi */}
            <div className="space-y-6">
              {cards.map((card, i) => (
                <div 
                  key={i} 
                  // Efek glassmorphism (backdrop-blur) dengan interaksi hover (melayang ke atas / -translate-y-1)
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-5 border-l-8 border-[#FFD700]"
                >
                  {/* Lingkaran Ikon */}
                  <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#DAA520] flex items-center justify-center shadow-lg">
                    {/* Render komponen ikon secara dinamis (misal: <Target />, <Flag />) */}
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Teks Konten */}
                  <div>
                    <h3 className="font-[Montserrat] font-bold text-gray-900 text-xl mb-2">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Bagian Statistik Horizontal */}
        <div className="mt-20 fade-up" style={{ transitionDelay: '0.4s' }}>
          {/* Grid responsif: 2 kolom di layar HP, 4 kolom di layar besar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                // group class digunakan agar elemen anak bisa bereaksi saat elemen parent di-hover (misal: warna teks berubah)
                className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-b-4 border-[#FFD700] group"
              >
                {/* group-hover:text-[#DAA520] -> akan mengubah teks jadi emas jika kotaknya di-hover */}
                <h4 className="font-[Montserrat] font-black text-4xl sm:text-5xl text-gray-900 group-hover:text-[#DAA520] transition-colors">
                  {stat.value}
                </h4>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs sm:text-sm mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

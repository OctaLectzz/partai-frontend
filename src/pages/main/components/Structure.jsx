/**
 * Komponen Structure (Struktur Organisasi)
 * -------------------------------------------------------------------------
 * Menampilkan daftar pengurus/pemimpin partai dalam bentuk kartu (card).
 * Dilengkapi dengan efek hover interaktif (gambar membesar, teks muncul).
 * 
 * Konsep Pembelajaran:
 * 1. Array of Objects: Menyimpan data pengurus secara dinamis di `leaders`.
 * 2. Tailwind Hover States: Menggunakan class `group` dan `group-hover:` untuk mentrigger animasi
 *    pada elemen anak saat kontainer utamanya (parent) di-hover oleh mouse.
 */

// Data pengurus (Bisa diganti dengan data dari API/Database nantinya)
const leaders = [
  { name: 'Mohammad Saleh, ST., M.En.', role: 'Ketua DPD', img: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Mohammad-saleh-golkar-jateng.jpg' },
  { name: 'Bahlil Lahadalia, S.E., M.Si.', role: 'Ketua DPP', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Bahlil_Lahadalia_Official_Portrait.png' },
  { name: 'Jaka Wuryanta, S.H.', role: 'Ketua DPC', img: 'https://dprd.sukoharjokab.go.id/wp-content/uploads/2024/11/34.-JAKA-WURYANTA-SH-200x300.jpg' },
];

export default function Structure() {
  return (
    // Section dengan latar belakang gradient dinamis (.bg-abstract-structure ada di index.css)
    <section id="struktur" className="relative py-24 lg:py-32 overflow-hidden bg-abstract-structure">
      {/* Efek Lingkaran Blur di tengah atas untuk memperkaya visual background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* BAGIAN HEADER (Judul Section) */}
        <div className="text-center mb-16 fade-up">
          <span className="section-label">Kepengurusan</span>
          <h2 className="section-title text-3xl md:text-5xl text-white mt-3">Struktur Organisasi</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        {/* BAGIAN GRID KARTU (Cards Grid) */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Looping array leaders */}
          {leaders.map((leader, i) => (
            // 'group' class memberitahu tailwind bahwa ini adalah induk trigger untuk hover
            // Transition delay menggunakan inline style agar kartu muncul bergantian (cascade)
            <div key={i} className="fade-up group card-hover relative rounded-2xl overflow-hidden shadow-xl h-[320px] sm:h-[400px] lg:h-[500px]" style={{ transitionDelay: `${i * 0.15}s` }}>
              
              {/* Gambar Tokoh */}
              <img 
                src={leader.img} 
                alt={leader.name} 
                // Awalnya hitam putih (grayscale), saat di-hover jadi berwarna (grayscale-0) dan sedikit zoom-in (scale-105)
                className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out z-0" 
              />
              
              {/* Overlay Hitam (Agar teks nama di bawah selalu terbaca) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              
              {/* Overlay Warna Emas Transparan (Muncul hanya saat di-hover) */}
              <div className="absolute inset-0 bg-golkar-dark-gold/30 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              {/* BAGIAN TEKS (Nama & Jabatan) */}
              {/* Teks akan bergerak naik sedikit (-translate-y-2) saat parent di-hover */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-center z-20 transition-transform duration-500 transform group-hover:-translate-y-2">
                <h3 className="font-[Montserrat] font-bold text-white text-xl md:text-2xl drop-shadow-lg">{leader.name}</h3>
                <p className="text-golkar-yellow text-sm mt-1.5 font-semibold uppercase tracking-wider opacity-90 drop-shadow-md">{leader.role}</p>
                {/* Garis bawah animasi (mulai dari w-0 menjadi w-16 saat di-hover) */}
                <div className="w-0 h-1 bg-golkar-yellow mx-auto mt-4 group-hover:w-16 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

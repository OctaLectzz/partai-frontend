/**
 * Komponen CTA (Call To Action / Ajakan Bertindak)
 * -------------------------------------------------------------------------
 * Bertujuan untuk mengarahkan pengguna agar melakukan aksi tertentu
 * (contoh: mendaftar jadi kader, mengisi form). Biasanya diletakkan di dekat footer.
 * 
 * Konsep Pembelajaran:
 * 1. Smooth Scrolling: Menggunakan event klik untuk menahan aksi bawaan link (href="#..."),
 *    lalu melakukan scroll pelan ke section target menggunakan fungsi DOM JS `scrollIntoView`.
 */

import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background utama putih polos */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Tambahan tekstur/pattern titik-titik samar warna kuning */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center">
        <div className="fade-up">
          
          {/* Label Kecil di Atas Judul */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-golkar-yellow/15 text-golkar-dark-gold text-xs font-bold uppercase tracking-wider mb-6">
            Bergabung Bersama Kami
          </span>
          
          {/* Judul Utama Call To Action */}
          <h2 className="font-[Montserrat] font-black text-3xl md:text-5xl lg:text-6xl text-golkar-dark-gold leading-tight mb-6">
            Jadilah Bagian dari<br />Perubahan Nyata
          </h2>
          
          {/* Subjudul/Deskripsi */}
          <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Bersama Partai Golkar, wujudkan Indonesia yang lebih maju, adil, dan sejahtera. Daftarkan dirimu sebagai kader baru.
          </p>
          
          {/* Grup Tombol Aksi */}
          {/* flex-col di HP (atas-bawah), flex-row di layar agak besar (kiri-kanan) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {/* Tombol Utama (Primary Button) - Mengarah ke form Aspirasi */}
            <a href="#aspirasi" onClick={(e) => { 
                e.preventDefault(); 
                document.querySelector('#aspirasi')?.scrollIntoView({ behavior: 'smooth' }); 
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-gold text-white font-semibold text-sm uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-xl shadow-golkar-yellow/30">
              Daftar Sekarang <ArrowRight size={16} />
            </a>
            
            {/* Tombol Sekunder (Secondary Button) - Mengarah ke About / Tentang */}
            <a href="#tentang" onClick={(e) => { 
                e.preventDefault(); 
                document.querySelector('#tentang')?.scrollIntoView({ behavior: 'smooth' }); 
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-golkar-yellow text-golkar-dark-gold font-semibold text-sm uppercase tracking-wider hover:bg-golkar-yellow/10 transition-all duration-300">
              Pelajari Lebih Lanjut
            </a>
            
          </div>
        </div>
      </div>
    </section>
  );
}

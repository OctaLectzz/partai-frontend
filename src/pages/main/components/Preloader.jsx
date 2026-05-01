/**
 * Komponen Preloader (Animasi Loading Awal)
 * -------------------------------------------------------------------------
 * Komponen ini muncul menutupi seluruh layar saat website pertama kali dimuat.
 * Tujuannya untuk memberikan kesan premium dan menunggu halaman siap.
 * 
 * Konsep React:
 * 1. useState: Mengatur status 'loading' (apakah masih loading?) dan 'fadeOut' (mulai menghilang).
 * 2. useEffect & setTimeout: Mengatur waktu otomatis (timer) kapan preloader harus mulai menghilang (2 detik).
 * 3. Conditional Rendering: Jika loading sudah false, preloader tidak di-render sama sekali (return null).
 */

import { useEffect, useState } from 'react';

export default function Preloader() {
  // State untuk menentukan apakah komponen ini harus di-render atau dihapus
  const [loading, setLoading] = useState(true);
  
  // State untuk memicu animasi transisi (opacity-0) sebelum komponen benar-benar dihapus
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Timer 1: Memulai proses animasi fade out (menghilang) setelah 2 detik
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Timer 2: Menghapus komponen sepenuhnya (unmount) setelah animasi fade out selesai
    // 2800ms didapat dari 2000ms delay awal + 800ms durasi CSS transisi
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    // Cleanup function: Mencegah memory leak jika komponen dihapus sebelum timer selesai
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []); // Array kosong [] berarti efek ini hanya dijalankan sekali saat komponen dimuat

  // Jika state loading bernilai false, komponen ini akan hilang sepenuhnya dari struktur HTML
  if (!loading) return null;

  return (
    <div
      // Class dinamis: Jika fadeOut true, maka opacity menjadi 0 (transparan)
      // z-[100] memastikan preloader selalu berada di lapisan paling atas menutupi segalanya
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-800 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background utama gradient elegan warna kuning Golkar */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#E6C200] to-[#DAA520]" />

      {/* Efek visual gelombang/cahaya berputar di latar belakang */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {/* Menggunakan tailwind animate-spin untuk memutar elemen secara terus-menerus */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_50%)] animate-[spin_15s_linear_infinite]" />
      </div>

      {/* Kontainer Utama (Berada di atas background karena z-10) */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Bagian Logo: Tampil dengan efek membesar (scaleIn) */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-6 rounded-full overflow-hidden bg-white shadow-2xl flex items-center justify-center border-4 border-white animate-[scaleIn_0.8s_ease-out_forwards]">
          {/* Path gambar telah diperbaiki ke /img/ (karena folder public di Vite akan langsung dikenali dari root /) */}
          <img
            src="/img/golkarlogokntl.png"
            alt="Logo Partai Golkar"
            // Efek detak jantung (pulse) yang berulang terus (infinite)
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain animate-[pulse_2s_infinite]"
          />
        </div>

        {/* Bagian Teks: Muncul berurutan (slideUp dengan delay berbeda-beda) */}
        <div className="text-center overflow-hidden">
          <p className="font-[Montserrat] font-bold text-lg sm:text-xl text-[#001233] tracking-[0.3em] uppercase opacity-0 translate-y-4 animate-[slideUp_0.8s_ease-out_0.3s_forwards]">
            Dewan Pimpinan Daerah
          </p>
          <h1 className="font-[Montserrat] font-black text-3xl sm:text-5xl text-white tracking-widest mt-2 opacity-0 translate-y-4 animate-[slideUp_0.8s_ease-out_0.5s_forwards] drop-shadow-md">
            PARTAI GOLKAR
          </h1>
          <p className="font-[Inter] text-sm text-[#001233] tracking-[0.2em] uppercase mt-4 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            Kabupaten Sukoharjo
          </p>
        </div>
      </div>

      {/* 
        Injeksi gaya CSS animasi secara lokal menggunakan tag <style> 
        Ini berguna karena animasi kompleks lebih mudah ditulis dalam bentuk keyframes CSS biasa.
      */}
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/**
 * Komponen Navbar (Navigasi Atas)
 * -------------------------------------------------------------------------
 * Komponen ini adalah menu navigasi utama yang posisinya tetap di atas layar (sticky).
 * Dilengkapi dengan fitur:
 * - Mengubah background saat di-scroll (transparan -> putih)
 * - Menyembunyikan diri saat scroll ke bawah, dan muncul lagi saat scroll ke atas (smart hide)
 * - Menu burger responsif untuk mode mobile
 *
 * Konsep React yang diajarkan:
 * 1. useState: Untuk menyimpan status dinamis (apakah sudah di-scroll? apakah menu mobile terbuka?).
 * 2. useEffect: Untuk mendeteksi event listener global seperti 'scroll' pada window.
 * 3. Conditional Rendering & Template Literals: Memasukkan class CSS secara dinamis berdasarkan state.
 */

import { LogIn } from 'lucide-react'
import { useEffect, useState } from 'react'

// Data array untuk link menu navigasi. Ini mempermudah jika ingin menambah/mengubah menu.
const menuItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Program', href: '#program' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Berita', href: '#berita' },
  { label: 'Struktur', href: '#struktur' },
  { label: 'Peta', href: '#peta' },
  { label: 'Aspirasi', href: '#aspirasi' },
  { label: 'Kontak', href: '#kontak' }
]

export default function Navbar() {
  // State untuk melacak apakah user sudah men-scroll ke bawah lebih dari 60px
  const [scrolled, setScrolled] = useState(false)
  // State untuk menyembunyikan navbar saat scroll turun, dan menampilkannya saat scroll naik
  const [hidden, setHidden] = useState(false)
  // State untuk melacak apakah menu hamburger (mobile) sedang terbuka atau tertutup
  const [mobileOpen, setMobileOpen] = useState(false)

  // Hook useEffect ini akan dijalankan sekali saat komponen pertama kali di-render (karena array dependency [] kosong)
  useEffect(() => {
    let lastScroll = 0

    // Fungsi yang akan dipanggil setiap kali user melakukan scroll
    const onScroll = () => {
      const current = window.scrollY

      // Jika scroll lebih dari 60px, set scrolled jadi true (untuk mengubah background navbar jadi solid putih)
      setScrolled(current > 60)

      // Logika Smart Hide: Jika posisi scroll > 100px DAN arahnya turun (current > lastScroll), maka sembunyikan navbar
      setHidden(current > 100 && current > lastScroll)

      lastScroll = current // Simpan posisi scroll terakhir
    }

    // Tambahkan event listener ke window browser
    window.addEventListener('scroll', onScroll, { passive: true })

    // Cleanup function: Hapus event listener saat komponen dihancurkan (unmount) agar tidak terjadi memory leak
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fungsi untuk menangani klik pada link menu (Smooth Scrolling)
  const handleClick = (e, href) => {
    e.preventDefault() // Mencegah perilaku default link HTML yang langsung melompat kasar
    setMobileOpen(false) // Tutup menu mobile jika sedang terbuka
    const el = document.querySelector(href) // Cari elemen HTML berdasarkan ID (contoh: id="tentang")
    if (el) el.scrollIntoView({ behavior: 'smooth' }) // Lakukan scroll yang halus (smooth scroll)
  }

  return (
    <>
      {/* NAVBAR UTAMA */}
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled ? 'bg-white shadow-lg shadow-black/10' : 'bg-white/90 backdrop-blur-md'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="flex h-12 items-center justify-between md:h-20">
            {/* BAGIAN KIRI: Logo */}
            <a href="#beranda" onClick={(e) => handleClick(e, '#beranda')} className="flex items-center gap-3">
              <div className="border-golkar-yellow/40 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 bg-white shadow-sm md:h-12 md:w-12">
                <img src="/img/golkarlogokntl.png" alt="Logo Golkar" className="h-5 w-5 object-contain md:h-10 md:w-10" />
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">Dewan Pimpinan Daerah</p>
                <p className="text-golkar-dark-gold text-sm font-bold tracking-wide uppercase">Partai Golkar</p>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">Sukoharjo</p>
              </div>
            </a>

            {/* BAGIAN TENGAH: Menu Navigasi Desktop */}
            <div className="hidden items-center gap-5 xl:flex">
              {menuItems.map((item) => (
                <a key={item.href} href={item.href} onClick={(e) => handleClick(e, item.href)} className="nav-link">
                  {item.label}
                </a>
              ))}
            </div>

            {/* BAGIAN KANAN: Tombol Login & Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="/auth/login"
                className="border-golkar-yellow text-golkar-dark-gold hover:bg-golkar-yellow hidden items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:text-white hover:shadow-lg md:inline-flex"
              >
                <LogIn size={14} /> Login
              </a>

              {/* Tombol Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`hamburger flex flex-col gap-1.5 p-2 xl:hidden ${mobileOpen ? 'active' : ''}`}
                aria-label="Menu"
              >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY / BACKDROP BLUR (Latar Belakang Gelap Saat Menu Terbuka) */}
      <div
        className={`fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)} // Jika area gelap diklik, menu akan tertutup
      />

      {/* MENU MOBILE (Slide dari Kanan) */}
      <div
        className={`fixed top-0 right-0 z-[60] flex h-screen w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full' // Animasi geser (0 = terlihat, full = sembunyi di luar layar)
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <span className="text-golkar-dark-gold text-sm font-bold tracking-wider uppercase">Menu Navigasi</span>
          {/* Tombol Silang untuk Menutup Menu */}
          <button onClick={() => setMobileOpen(false)} className="hover:text-golkar-dark-gold p-2 text-gray-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto px-6 py-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="hover:text-golkar-dark-gold hover:bg-golkar-yellow/10 block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
          {/* Tombol Login untuk Mobile */}
          <a
            href="/auth/login"
            className="border-golkar-yellow text-golkar-dark-gold hover:bg-golkar-yellow mt-6 rounded-full border-2 px-4 py-3 text-center text-sm font-bold tracking-wider uppercase transition-colors hover:text-white"
          >
            Login / Daftar
          </a>
        </div>
      </div>
    </>
  )
}

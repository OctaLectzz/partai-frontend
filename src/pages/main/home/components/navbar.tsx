import { LogIn } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let lastScroll = 0

    const onScroll = () => {
      const current = window.scrollY

      setScrolled(current > 60)

      setHidden(current > 100 && current > lastScroll)

      lastScroll = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled ? 'bg-white shadow-lg shadow-black/10' : 'bg-white/90 backdrop-blur-md'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="flex h-12 items-center justify-between md:h-20">
            <a href="#beranda" onClick={(e) => handleClick(e, '#beranda')} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-golkar-yellow/40 bg-white shadow-sm md:h-12 md:w-12">
                <img src="/img/logo/logo.jpeg" alt="Logo Golkar" className="h-5 w-5 object-contain md:h-10 md:w-10" />
              </div>

              <div className="hidden leading-tight sm:block">
                <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">Dewan Pimpinan Daerah</p>
                <p className="text-sm font-bold tracking-wide text-golkar-dark-gold uppercase">Partai Golkar</p>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">Sukoharjo</p>
              </div>
            </a>

            <div className="hidden items-center gap-5 xl:flex">
              {menuItems.map((item) => (
                <a key={item.href} href={item.href} onClick={(e) => handleClick(e, item.href)} className="nav-link">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/auth/login"
                className="hidden items-center gap-2 rounded-full border border-golkar-yellow px-5 py-2 text-xs font-semibold tracking-wider text-golkar-dark-gold uppercase transition-all duration-300 hover:scale-105 hover:bg-golkar-yellow hover:text-white hover:shadow-lg md:inline-flex"
              >
                <LogIn size={14} /> Login
              </a>

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

      <div
        className={`fixed inset-0 z-55 bg-black/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 z-60 flex h-screen w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <span className="text-sm font-bold tracking-wider text-golkar-dark-gold uppercase">Menu Navigasi</span>
          <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-500 transition-colors hover:text-golkar-dark-gold">
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
              className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-golkar-yellow/10 hover:text-golkar-dark-gold"
            >
              {item.label}
            </a>
          ))}

          <a
            href="/auth/login"
            className="mt-6 rounded-full border-2 border-golkar-yellow px-4 py-3 text-center text-sm font-bold tracking-wider text-golkar-dark-gold uppercase transition-colors hover:bg-golkar-yellow hover:text-white"
          >
            Login / Daftar
          </a>
        </div>
      </div>
    </>
  )
}

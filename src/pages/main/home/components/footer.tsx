import { Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = ['Beranda', 'Tentang', 'Agenda', 'Program', 'Galeri', 'Berita']

export default function Footer() {
  return (
    <footer id="kontak" className="relative overflow-hidden bg-white pt-20 pb-8">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full">
                <img src="/img/logo/logo.jpeg" alt="Logo Golkar" className="h-10 w-10 object-contain" />
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">DPD</p>
                <p className="text-sm font-bold text-golkar-dark-gold uppercase">Partai Golkar</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              Dewan Pimpinan Daerah Partai Golkar Kabupaten Sukoharjo. Bersatu membangun negeri.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wider text-golkar-dark-gold uppercase">Tautan</h4>

            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-sm text-gray-400 transition hover:text-golkar-dark-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wider text-golkar-dark-gold uppercase">Kontak</h4>

            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={14} className="mt-0.5 shrink-0" /> Jl. Wadyo Pranoto, Bendosari 55271
              </li>

              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="shrink-0" /> (0274) 123-456
              </li>

              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="shrink-0" /> info@golkarskh.or.id
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row">
          <p className="text-xs text-gray-300">&copy; {new Date().getFullYear()} DPD Partai Golkar Sukoharjo. Hak cipta dilindungi.</p>

          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-300 transition hover:text-golkar-dark-gold">
              Kebijakan Privasi
            </a>

            <a href="#" className="text-xs text-gray-300 transition hover:text-golkar-dark-gold">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

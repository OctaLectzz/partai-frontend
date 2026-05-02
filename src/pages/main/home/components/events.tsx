import { ArrowRight, Clock, MapPin } from 'lucide-react'

const agendaItems = [
  {
    date: '15',
    month: 'Mei',
    title: 'Musyawarah Daerah Partai Golkar Sukoharjo',
    location: 'Gedung DPRD Sukoharjo, Sukoharjo',
    time: '08:00 - 17:00 WIB',
    category: 'Musyawarah'
  },
  { date: '01', month: 'Jun', title: 'Bakti Sosial & Donor Darah', location: 'Alun-Alun Sukoharjo', time: '07:00 - 12:00 WIB', category: 'Sosial' },
  {
    date: '10',
    month: 'Jun',
    title: 'Rapat Koordinasi Pemenangan',
    location: 'Kantor DPD Golkar Sukoharjo',
    time: '13:00 - 16:00 WIB',
    category: 'Rapat'
  }
]

export default function EventsSection() {
  return (
    <section id="agenda" className="bg-abstract-agenda relative overflow-hidden py-24 lg:py-32">
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="fade-up mb-16 text-center">
          <span className="section-label">Kegiatan</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Agenda Terdekat</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        <div className="mx-auto grid max-w-4xl gap-4">
          {agendaItems.map((item, i) => (
            <div
              key={i}
              className="fade-up card-hover group flex flex-col items-start gap-5 rounded-xl bg-white p-5 shadow-md sm:flex-row sm:items-center"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="gradient-gold flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl">
                <span className="font-[Montserrat] text-2xl leading-none font-black text-white">{item.date}</span>
                <span className="text-xs font-semibold text-white/80 uppercase">{item.month}</span>
              </div>

              <div className="min-w-0 flex-1">
                <span className="mb-2 inline-block rounded-full bg-golkar-yellow/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-golkar-dark-gold uppercase">
                  {item.category}
                </span>

                <h3 className="mb-2 text-base font-semibold text-gray-800 transition-colors group-hover:text-golkar-dark-gold">{item.title}</h3>

                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {item.time}
                  </span>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="hidden shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-golkar-dark-gold sm:block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

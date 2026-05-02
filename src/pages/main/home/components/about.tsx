import { Flag, ShieldCheck, Target } from 'lucide-react'

const stats = [
  { value: '5', label: 'Wilayah' },
  { value: '78', label: 'Cabang' },
  { value: '12.4K', label: 'Kader' },
  { value: '45K+', label: 'Anggota' }
]

const cards = [
  {
    icon: Target,
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
]

export default function AboutSection() {
  return (
    <section id="tentang" className="relative overflow-hidden bg-linear-to-br from-[#FFD700] via-[#FFC107] to-[#DAA520] py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="fade-up relative mt-8 lg:col-span-5 lg:mt-0">
            <div className="relative mx-auto flex h-[260px] w-full max-w-lg items-end justify-center sm:h-[350px] lg:mx-0 lg:h-[650px]">
              <img
                src="/img/bahlianjg-removebg-preview.png"
                alt="Tokoh Golkar"
                className="object-bottom-[0_20px_30px_rgba(0,0,0,0.4)] relative z-10 h-auto w-[80%] max-w-none origin-bottom scale-100 object-contain lg:w-[130%] lg:-translate-x-8 lg:scale-110"
                style={{
                  maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
                }}
              />

              <div className="pointer-events-none absolute right-[-30%] bottom-0 left-[-30%] z-20 h-24 bg-linear-to-t from-[#FFC107] to-transparent lg:h-40" />
            </div>
          </div>

          <div className="fade-up lg:col-span-7" style={{ transitionDelay: '0.2s' }}>
            <div className="mb-10 text-center lg:text-left">
              <span className="text-sm font-bold tracking-[0.2em] text-white uppercase drop-shadow-md">Tentang Kami</span>

              <h2 className="mt-2 font-[Montserrat] text-4xl leading-tight font-black text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                Gerakan Karya
                <br />
                <span className="text-gray-900">Untuk Indonesia</span>
              </h2>
            </div>

            <div className="space-y-6">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-5 rounded-2xl border-l-8 border-[#FFD700] bg-white/95 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:flex-row sm:items-center"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#FFD700] to-[#DAA520] shadow-lg">
                    <card.icon className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <h3 className="mb-2 font-[Montserrat] text-xl font-bold text-gray-900">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-up mt-20" style={{ transitionDelay: '0.4s' }}>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group rounded-2xl border-b-4 border-[#FFD700] bg-white p-6 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-8"
              >
                <h4 className="font-[Montserrat] text-4xl font-black text-gray-900 transition-colors group-hover:text-[#DAA520] sm:text-5xl">
                  {stat.value}
                </h4>

                <p className="mt-3 text-xs font-bold tracking-widest text-gray-500 uppercase sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

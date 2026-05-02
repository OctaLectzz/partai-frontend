const leaders = [
  {
    name: 'Mohammad Saleh, ST., M.En.',
    role: 'Ketua DPD',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Mohammad-saleh-golkar-jateng.jpg'
  },
  {
    name: 'Bahlil Lahadalia, S.E., M.Si.',
    role: 'Ketua DPP',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Bahlil_Lahadalia_Official_Portrait.png'
  },
  {
    name: 'Jaka Wuryanta, S.H.',
    role: 'Ketua DPC',
    img: 'https://dprd.sukoharjokab.go.id/wp-content/uploads/2024/11/34.-JAKA-WURYANTA-SH-200x300.jpg'
  }
]

export default function StructureSection() {
  return (
    <section id="struktur" className="bg-abstract-structure relative overflow-hidden py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="fade-up mb-16 text-center">
          <span className="section-label">Kepengurusan</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Struktur Organisasi</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="fade-up group card-hover relative h-[320px] overflow-hidden rounded-2xl shadow-xl sm:h-[400px] lg:h-[500px]"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <img
                src={leader.img}
                alt={leader.name}
                className="absolute inset-0 z-0 h-full w-full object-cover object-top grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute inset-0 z-10 bg-golkar-dark-gold/30 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 z-20 transform p-6 text-center transition-transform duration-500 group-hover:-translate-y-2 sm:p-8">
                <h3 className="font-[Montserrat] text-xl font-bold text-white drop-shadow-lg md:text-2xl">{leader.name}</h3>
                <p className="mt-1.5 text-sm font-semibold tracking-wider text-golkar-yellow uppercase opacity-90 drop-shadow-md">{leader.role}</p>

                <div className="mx-auto mt-4 h-1 w-0 rounded-full bg-golkar-yellow shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-500 group-hover:w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

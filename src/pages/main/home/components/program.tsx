import { Briefcase, GraduationCap, HeartHandshake, Landmark, ShieldCheck, Sprout } from 'lucide-react'

const programs = [
  {
    icon: GraduationCap,
    title: 'Golkar Cerdas',
    desc: 'Program beasiswa dan pelatihan untuk meningkatkan kualitas pendidikan masyarakat Sukoharjo.'
  },
  { icon: HeartHandshake, title: 'Golkar Peduli', desc: 'Bakti sosial, bantuan bencana, dan program kesehatan untuk masyarakat yang membutuhkan.' },
  { icon: Sprout, title: 'Golkar Hijau', desc: 'Gerakan penghijauan dan pelestarian lingkungan di seluruh wilayah Sukoharjo.' },
  { icon: Landmark, title: 'Golkar Membangun', desc: 'Advokasi pembangunan infrastruktur dan fasilitas publik yang merata.' },
  { icon: ShieldCheck, title: 'Golkar Bersih', desc: 'Komitmen pemerintahan yang bersih, transparan, dan akuntabel.' },
  { icon: Briefcase, title: 'Golkar Mandiri', desc: 'Pemberdayaan UMKM dan penciptaan lapangan kerja bagi generasi muda.' }
]

export default function ProgramSection() {
  return (
    <section id="program" className="bg-abstract-program relative overflow-hidden py-24 lg:py-32">
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="fade-up mb-16 text-center">
          <span className="section-label">Program Unggulan</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Program Aksi Nyata</h2>

          <div className="gold-line mx-auto mt-5" />

          <p className="mx-auto mt-5 max-w-xl text-sm text-white/70">
            Enam program strategis untuk membangun Sukoharjo yang maju, berkeadilan, dan berkelanjutan.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog, i) => (
            <div
              key={i}
              className="fade-up group card-hover cursor-pointer rounded-2xl bg-white p-7 shadow-md"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="gradient-gold mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <prog.icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="mb-3 font-[Montserrat] text-lg font-bold text-gray-800 transition-colors group-hover:text-golkar-dark-gold">
                {prog.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-400">{prog.desc}</p>

              <div className="gradient-gold mt-5 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-white" />

      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
        <div className="fade-up">
          <span className="mb-6 inline-block rounded-full bg-golkar-yellow/15 px-4 py-1.5 text-xs font-bold tracking-wider text-golkar-dark-gold uppercase">
            Bergabung Bersama Kami
          </span>

          <h2 className="mb-6 font-[Montserrat] text-3xl leading-tight font-black text-golkar-dark-gold md:text-5xl lg:text-6xl">
            Jadilah Bagian dari
            <br />
            Perubahan Nyata
          </h2>

          <p className="mx-auto mb-10 max-w-xl leading-relaxed text-gray-400">
            Bersama Partai Golkar, wujudkan Indonesia yang lebih maju, adil, dan sejahtera. Daftarkan dirimu sebagai kader baru.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#aspirasi"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#aspirasi')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="gradient-gold inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wider text-white uppercase shadow-xl shadow-golkar-yellow/30 transition-all duration-300 hover:scale-105"
            >
              Daftar Sekarang <ArrowRight size={16} />
            </a>

            <a
              href="#tentang"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#tentang')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-golkar-yellow px-8 py-4 text-sm font-semibold tracking-wider text-golkar-dark-gold uppercase transition-all duration-300 hover:bg-golkar-yellow/10"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

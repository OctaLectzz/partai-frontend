import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="beranda" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-golkar-yellow via-golkar-gold to-golkar-yellow" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-white/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-golkar-dark-gold/20 blur-[100px]" />

      <div className="hero-overlay absolute inset-0 z-1" />

      <div
        className="pointer-events-none absolute inset-0 z-2 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="animate-hero-img-1 absolute bottom-0 left-[-10%] z-10 sm:left-[-5%] lg:left-[-80px]">
        <img
          src="/img/bahlil-removebg-preview.png"
          alt="Tokoh 1"
          className="h-[28vh] object-cover object-top sm:h-[45vh] lg:h-[72vh]"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
          }}
        />
      </div>

      <div className="animate-hero-img-2 absolute bottom-0 left-[12%] z-11 sm:left-[14%] lg:left-[8%]">
        <img
          src="/img/Prabowo-removebg-preview.png"
          alt="Tokoh 2"
          className="h-[25vh] object-cover object-top sm:h-[40vh] lg:h-[65vh]"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
          }}
        />
      </div>

      <div className="animate-hero-img-3 absolute right-[15%] bottom-0 z-11 sm:right-[18%] lg:right-[13%]">
        <img
          src="/img/Jaka-removebg-preview.png"
          alt="Tokoh 3"
          className="h-[25vh] object-cover object-top sm:h-[40vh] lg:h-[66vh]"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
          }}
        />
      </div>

      <div className="animate-hero-img-4 absolute right-[-5%] bottom-0 z-10 sm:right-[1%] lg:right-[-1%]">
        <img
          src="/img/saleh-removebg-preview.png"
          alt="Tokoh 4"
          className="h-[26vh] object-cover object-top sm:h-[42vh] lg:h-[66vh]"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)'
          }}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-4xl px-4 text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-white/80 uppercase text-shadow-sm md:text-sm">Dewan Pimpinan Daerah</p>
        <h1 className="mb-6 font-[Montserrat] text-5xl leading-none font-black tracking-wider text-white uppercase text-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          Partai
          <br />
          Golkar
        </h1>

        <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/15 px-6 py-2.5 backdrop-blur-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span className="text-xs font-semibold tracking-[0.2em] text-white uppercase md:text-sm">Kabupaten Sukoharjo</span>
          <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </div>

        <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed font-light text-white md:text-base">
          Bersatu membangun negeri dengan karya nyata untuk Indonesia yang lebih maju dan sejahtera
        </p>
      </div>

      <a
        href="#tentang"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#tentang')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition hover:text-white"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={20} className="animate-bounce-down" />
      </a>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-32 bg-linear-to-t from-golkar-yellow to-transparent" />

      <style>{`
        @keyframes heroFadeUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        /* Masing-masing kelas punya delay berbeda agar munculnya bergantian dari kiri ke kanan */
        .animate-hero-img-1 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }
        .animate-hero-img-2 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards; opacity: 0; }
        .animate-hero-img-3 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards; opacity: 0; }
        .animate-hero-img-4 { animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards; opacity: 0; }
      `}</style>
    </section>
  )
}

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    const removeTimer = setTimeout(() => {
      setLoading(false)
    }, 2800)

    return () => {
      clearTimeout(timer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center transition-opacity duration-800 ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#FFD700] via-[#E6C200] to-[#DAA520]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] animate-[spin_15s_linear_infinite] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex h-24 w-24 animate-[scaleIn_0.8s_ease-out_forwards] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-2xl sm:h-32 sm:w-32">
          <img src="/img/logo/logo.jpeg" alt="Logo Partai Golkar" className="h-20 w-20 animate-[pulse_2s_infinite] object-contain sm:h-28 sm:w-28" />
        </div>

        <div className="overflow-hidden text-center">
          <p className="translate-y-4 animate-[slideUp_0.8s_ease-out_0.3s_forwards] font-[Montserrat] text-lg font-bold tracking-[0.3em] text-golkar-navy uppercase opacity-0 sm:text-xl">
            Dewan Pimpinan Daerah
          </p>

          <h1 className="mt-2 translate-y-4 animate-[slideUp_0.8s_ease-out_0.5s_forwards] font-[Montserrat] text-3xl font-black tracking-widest text-white opacity-0 drop-shadow-md sm:text-5xl">
            PARTAI GOLKAR
          </h1>

          <p className="mt-4 animate-[fadeIn_1s_ease-out_1s_forwards] font-[Inter] text-sm tracking-[0.2em] text-golkar-navy uppercase opacity-0">
            Kabupaten Sukoharjo
          </p>
        </div>
      </div>

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
  )
}

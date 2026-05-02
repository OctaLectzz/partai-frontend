import { Play } from 'lucide-react'

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', title: 'Musyawarah Daerah 2025', type: 'image' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop', title: 'Pelatihan Kader Muda', type: 'image' },
  { src: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop', title: 'Bakti Sosial Merapi', type: 'video' },
  { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop', title: 'Deklarasi Kemenangan', type: 'image' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop', title: 'Rapat Pimpinan Daerah', type: 'image' },
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop', title: 'Konsolidasi Partai', type: 'video' }
]

export default function GallerySection() {
  return (
    <section id="galeri" className="bg-abstract-gallery relative overflow-hidden py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="fade-up mb-16 text-center">
          <span className="section-label">Dokumentasi</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Galeri Kegiatan</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="fade-up group card-hover relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl shadow-lg"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <img src={item.src} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

              <div className="absolute inset-0 bg-linear-to-t from-golkar-dark-gold via-golkar-dark-gold/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.type === 'video' && (
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
                    <Play className="ml-0.5 h-6 w-6 text-golkar-dark-gold" fill="currentColor" />
                  </div>
                )}

                <p className="px-4 text-center text-sm font-semibold text-white">{item.title}</p>
              </div>

              <div className="absolute top-3 right-3 rounded-md bg-white/80 px-2 py-1 text-[10px] font-semibold tracking-wider text-golkar-dark-gold uppercase backdrop-blur-sm">
                {item.type === 'video' ? 'Video' : 'Foto'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

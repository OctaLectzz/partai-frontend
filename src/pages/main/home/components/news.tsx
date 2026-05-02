import { ArrowUpRight, Clock } from 'lucide-react'

const newsItems = [
  {
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
    category: 'Organisasi',
    date: '28 Apr 2026',
    title: 'Golkar Sukoharjo Gelar Musda ke-XII, Siap Menangkan Pemilu 2029',
    excerpt: 'Musyawarah Daerah ke-12 Partai Golkar Sukoharjo berhasil menetapkan kepengurusan baru...'
  },
  {
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=300&fit=crop',
    category: 'Politik',
    date: '25 Apr 2026',
    title: 'Kader Golkar Dorong Percepatan Pembangunan Infrastruktur Sukoharjo',
    excerpt: 'Fraksi Golkar DPRD Sukoharjo mengajukan proposal percepatan pembangunan jalan...'
  },
  {
    img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=500&h=300&fit=crop',
    category: 'Sosial',
    date: '20 Apr 2026',
    title: 'Golkar Peduli Salurkan 1000 Paket Sembako di Sukoharjo',
    excerpt: 'Program Golkar Peduli kembali menyalurkan bantuan kepada masyarakat terdampak...'
  }
]

export default function NewsSection() {
  return (
    <section id="berita" className="bg-abstract-news relative overflow-hidden py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="fade-up mb-16 text-center">
          <span className="section-label">Informasi</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Kabar Terkini</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((news, i) => (
            <article
              key={i}
              className="fade-up group card-hover overflow-hidden rounded-2xl bg-white shadow-md"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <img src={news.img} alt={news.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />

                <div className="gradient-gold absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                  {news.category}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>{news.date}</span>
                </div>

                <h3 className="mb-3 leading-snug font-semibold text-gray-800 transition-colors group-hover:text-golkar-dark-gold">{news.title}</h3>

                <p className="mb-4 text-sm leading-relaxed text-gray-400">{news.excerpt}</p>

                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-golkar-dark-gold uppercase transition-all hover:gap-2"
                >
                  Baca Selengkapnya <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

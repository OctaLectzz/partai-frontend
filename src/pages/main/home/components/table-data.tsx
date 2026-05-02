import { Search } from 'lucide-react'
import { useState } from 'react'

const kaderData = [
  { no: 1, nama: 'H. Ahmad Suryanto', jabatan: 'Ketua DPD', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 2, nama: 'Hj. Siti Nurjanah', jabatan: 'Wakil Ketua', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 3, nama: 'Ir. Bambang W.', jabatan: 'Sekretaris', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 4, nama: 'Drs. Agus Prabowo', jabatan: 'Bendahara', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 5, nama: 'Ratna Dewi K.', jabatan: 'Kadiv Kaderisasi', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 6, nama: 'H. Wahyu Pratama', jabatan: 'Kadiv Pemenangan', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 7, nama: 'Sri Mulyani, S.Pd.', jabatan: 'Anggota DPRD', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 8, nama: 'Eko Prasetyo, S.H.', jabatan: 'Anggota DPRD', wilayah: 'Sukoharjo', status: 'Non-aktif' }
]

export default function TableDataSection() {
  const [search, setSearch] = useState('')

  const filtered = kaderData.filter(
    (k) => k.nama.toLowerCase().includes(search.toLowerCase()) || k.wilayah.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="bg-abstract-table relative overflow-hidden py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="fade-up mb-16 text-center">
          <span className="section-label">Data Kader</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Tabel Anggota</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        <div className="fade-up mx-auto mb-8 max-w-md">
          <div className="relative">
            <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau wilayah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-golkar-gold/30 bg-white py-3 pr-4 pl-11 text-sm text-gray-800 shadow-sm transition placeholder:text-gray-400 focus:border-golkar-dark-gold focus:ring-1 focus:ring-golkar-dark-gold/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="fade-up overflow-x-auto rounded-2xl bg-white shadow-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-golkar-yellow/20">
                <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-golkar-dark-gold uppercase">No</th>
                <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-golkar-dark-gold uppercase">Nama</th>
                <th className="hidden px-4 py-4 text-left text-xs font-semibold tracking-wider text-golkar-dark-gold uppercase md:table-cell">
                  Jabatan
                </th>
                <th className="hidden px-4 py-4 text-left text-xs font-semibold tracking-wider text-golkar-dark-gold uppercase sm:table-cell">
                  Wilayah
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-golkar-dark-gold uppercase">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((k) => (
                <tr key={k.no} className="border-b border-gray-100 transition hover:bg-golkar-yellow/5">
                  <td className="px-4 py-3.5 text-gray-400">{k.no}</td>
                  <td className="px-4 py-3.5 font-medium text-gray-800">{k.nama}</td>
                  <td className="hidden px-4 py-3.5 text-gray-500 md:table-cell">{k.jabatan}</td>
                  <td className="hidden px-4 py-3.5 text-gray-500 sm:table-cell">{k.wilayah}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase ${
                        k.status === 'Aktif' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
                      }`}
                    >
                      {k.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <p className="py-8 text-center text-sm text-gray-400">Tidak ada data ditemukan</p>}
        </div>
      </div>
    </section>
  )
}

/**
 * Komponen TableData (Tabel Data Kader)
 * -------------------------------------------------------------------------
 * Menampilkan data kader dalam bentuk tabel dengan fitur pencarian interaktif.
 * 
 * Konsep Pembelajaran:
 * 1. State Management (useState): Menyimpan kata kunci (keyword) pencarian yang diketik user.
 * 2. Array Filtering: Menggunakan `.filter()` dan `.includes()` secara real-time untuk 
 *    menyaring (mencari) data yang cocok dengan inputan.
 * 3. Conditional Classes: Mengubah warna status (Aktif/Non-aktif) menggunakan ternary operator di dalam className.
 */

import { Search } from 'lucide-react';
import { useState } from 'react';

// Data simulasi (dummy) kader partai
const kaderData = [
  { no: 1, nama: 'H. Ahmad Suryanto', jabatan: 'Ketua DPD', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 2, nama: 'Hj. Siti Nurjanah', jabatan: 'Wakil Ketua', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 3, nama: 'Ir. Bambang W.', jabatan: 'Sekretaris', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 4, nama: 'Drs. Agus Prabowo', jabatan: 'Bendahara', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 5, nama: 'Ratna Dewi K.', jabatan: 'Kadiv Kaderisasi', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 6, nama: 'H. Wahyu Pratama', jabatan: 'Kadiv Pemenangan', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 7, nama: 'Sri Mulyani, S.Pd.', jabatan: 'Anggota DPRD', wilayah: 'Sukoharjo', status: 'Aktif' },
  { no: 8, nama: 'Eko Prasetyo, S.H.', jabatan: 'Anggota DPRD', wilayah: 'Sukoharjo', status: 'Non-aktif' },
];

export default function TableData() {
  // State untuk menyimpan teks pencarian yang diketik pengguna
  const [search, setSearch] = useState('');
  
  // LOGIKA PENCARIAN (Filter)
  // Menyaring array 'kaderData' setiap kali komponen di-render ulang akibat ketikan di state 'search'
  // .toLowerCase() dipakai agar pencarian tidak case sensitive (huruf besar/kecil dianggap sama)
  const filtered = kaderData.filter((k) => 
    k.nama.toLowerCase().includes(search.toLowerCase()) || 
    k.wilayah.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-abstract-table">
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* BAGIAN HEADER JUDUL */}
        <div className="text-center mb-16 fade-up">
          <span className="section-label">Data Kader</span>
          <h2 className="section-title text-3xl md:text-5xl text-white mt-3">Tabel Anggota</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        {/* BAGIAN INPUT PENCARIAN (Search Bar) */}
        <div className="fade-up max-w-md mx-auto mb-8">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari nama atau wilayah..." 
              // Menghubungkan value input ke state 'search'
              value={search} 
              // Setiap kali ada ketikan (perubahan), perbarui state 'search'
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-golkar-gold/30 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-golkar-dark-gold focus:ring-1 focus:ring-golkar-dark-gold/20 transition shadow-sm" 
            />
          </div>
        </div>

        {/* BAGIAN TABEL DATA */}
        {/* overflow-x-auto: Memungkinkan tabel di-scroll ke samping jika layarnya kekecilan (contoh: di HP) */}
        <div className="fade-up overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full text-sm">
            {/* Bagian Kepala Tabel (Header) */}
            <thead>
              <tr className="border-b border-golkar-yellow/20">
                <th className="text-left py-4 px-4 text-golkar-dark-gold font-semibold text-xs uppercase tracking-wider">No</th>
                <th className="text-left py-4 px-4 text-golkar-dark-gold font-semibold text-xs uppercase tracking-wider">Nama</th>
                {/* Kolom Jabatan disembunyikan di HP, muncul di layar medium ke atas (md:table-cell) */}
                <th className="text-left py-4 px-4 text-golkar-dark-gold font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Jabatan</th>
                {/* Kolom Wilayah disembunyikan di layar sangat kecil, muncul di layar small ke atas (sm:table-cell) */}
                <th className="text-left py-4 px-4 text-golkar-dark-gold font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Wilayah</th>
                <th className="text-left py-4 px-4 text-golkar-dark-gold font-semibold text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            
            {/* Bagian Isi Tabel (Body) */}
            <tbody>
              {/* Melakukan mapping/looping pada data yang sudah DIFILTER, bukan data asli */}
              {filtered.map((k) => (
                <tr key={k.no} className="border-b border-gray-100 hover:bg-golkar-yellow/5 transition">
                  <td className="py-3.5 px-4 text-gray-400">{k.no}</td>
                  <td className="py-3.5 px-4 text-gray-800 font-medium">{k.nama}</td>
                  <td className="py-3.5 px-4 text-gray-500 hidden md:table-cell">{k.jabatan}</td>
                  <td className="py-3.5 px-4 text-gray-500 hidden sm:table-cell">{k.wilayah}</td>
                  <td className="py-3.5 px-4">
                    {/* Logika TERNARY OPERATOR untuk merubah warna Badge Status */}
                    {/* Jika Aktif -> Hijau (emerald). Jika Tidak -> Merah */}
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      k.status === 'Aktif' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
                    }`}>
                      {k.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* PESAN JIKA DATA TIDAK DITEMUKAN */}
          {/* Hanya dirender jika panjang array 'filtered' adalah 0 (tidak ada yang cocok dengan pencarian) */}
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">
              Tidak ada data ditemukan
            </p>
          )}
        </div>
        
      </div>
    </section>
  );
}

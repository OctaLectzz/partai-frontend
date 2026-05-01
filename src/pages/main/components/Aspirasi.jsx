/**
 * Komponen Aspirasi (Formulir Kontak)
 * -------------------------------------------------------------------------
 * Menyediakan form interaktif bagi masyarakat untuk mengirimkan pesan/aspirasi.
 * 
 * Konsep Pembelajaran:
 * 1. Form State Handling: Menggunakan objek dalam `useState` untuk menyimpan data input form.
 *    Bisa diset sekaligus menggunakan spread operator `{ ...form, nama: 'Budi' }`.
 * 2. Event Handling (onSubmit): Mencegah reload halaman (e.preventDefault()) saat form disubmit,
 *    lalu men-trigger aksi simulasi.
 * 3. Notifikasi: Memunculkan alert sukses sementara menggunakan fungsi `setTimeout`.
 */

import { Send, User, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Aspirasi() {
  // State `form` menyimpan data dari ketiga inputan sekaligus (objek form)
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  
  // State `submitted` untuk menentukan apakah notifikasi sukses harus muncul atau tidak
  const [submitted, setSubmitted] = useState(false);

  // Fungsi ini dipanggil saat tombol <button type="submit"> diklik
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah browser me-refresh halaman (default bawaan HTML form)
    setSubmitted(true); // Memunculkan pesan "Aspirasi berhasil dikirim"
    
    // Menghilangkan pesan sukses setelah 3 detik (3000 ms)
    setTimeout(() => setSubmitted(false), 3000);
    
    // Mereset isi form (mengosongkan inputan)
    setForm({ nama: '', email: '', pesan: '' });
  };

  return (
    <section id="aspirasi" className="relative py-24 lg:py-32 overflow-hidden bg-abstract-aspirasi">
      {/* Kontainer form menggunakan max-w-3xl agar tidak melebar terlalu ekstrim di layar lebar */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12 fade-up">
          <span className="section-label">Suara Anda</span>
          <h2 className="section-title text-3xl md:text-5xl text-white mt-3">Sampaikan Aspirasi</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        {/* BUNGKUSAN FORM */}
        <form onSubmit={handleSubmit} className="fade-up bg-white rounded-2xl p-8 space-y-5 shadow-lg">
          
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Input Nama Lengkap */}
            <div className="relative">
              {/* absolute left-4: memposisikan ikon orang di dalam kotak input */}
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Nama Lengkap" 
                required 
                value={form.nama} 
                // Mengubah khusus bagian 'nama' dari object form tanpa menghapus isian email/pesan
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-golkar-dark-gold focus:ring-1 focus:ring-golkar-yellow/30 transition" 
              />
            </div>

            {/* Input Email */}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email" 
                required 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-golkar-dark-gold focus:ring-1 focus:ring-golkar-yellow/30 transition" 
              />
            </div>
          </div>

          {/* Textarea Pesan Aspirasi */}
          <div className="relative">
            <MessageSquare size={16} className="absolute left-4 top-4 text-gray-400" />
            {/* resize-none: Mencegah pengguna menarik ujung textarea untuk mengubah ukuran manual */}
            <textarea 
              rows="5" 
              placeholder="Tulis aspirasi Anda..." 
              required 
              value={form.pesan} 
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-golkar-dark-gold focus:ring-1 focus:ring-golkar-yellow/30 transition resize-none" 
            />
          </div>

          {/* Tombol Submit */}
          <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-gold text-white font-semibold text-sm uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-lg">
            <Send size={16} /> Kirim Aspirasi
          </button>

          {/* PESAN NOTIFIKASI SUKSES */}
          {/* Bagian ini hanya dirender (<div...>) jika variabel 'submitted' bernilai true */}
          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-emerald-600 text-sm font-medium text-center">
                ✓ Aspirasi berhasil dikirim!
              </p>
            </div>
          )}
        </form>

      </div>
    </section>
  );
}

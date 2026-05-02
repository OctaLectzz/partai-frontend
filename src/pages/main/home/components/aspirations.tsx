import { Mail, MessageSquare, Send, User } from 'lucide-react'
import { useState } from 'react'

export default function AspirationSection() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    setTimeout(() => setSubmitted(false), 3000)

    setForm({ nama: '', email: '', pesan: '' })
  }

  return (
    <section id="aspirasi" className="bg-abstract-aspirasi relative overflow-hidden py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-4 lg:px-8">
        <div className="fade-up mb-12 text-center">
          <span className="section-label">Suara Anda</span>
          <h2 className="section-title mt-3 text-3xl text-white md:text-5xl">Sampaikan Aspirasi</h2>
          <div className="gold-line mx-auto mt-5" />
        </div>

        <form onSubmit={handleSubmit} className="fade-up space-y-5 rounded-2xl bg-white p-8 shadow-lg">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Input Full Name */}
            <div className="relative">
              <User size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nama Lengkap"
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="focus:border-golkar-dark-gold focus:ring-golkar-yellow/30 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-800 transition placeholder:text-gray-400 focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Input Email */}
            <div className="relative">
              <Mail size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="focus:border-golkar-dark-gold focus:ring-golkar-yellow/30 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-800 transition placeholder:text-gray-400 focus:ring-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <MessageSquare size={16} className="absolute top-4 left-4 text-gray-400" />
            <textarea
              rows={5}
              placeholder="Tulis aspirasi Anda..."
              required
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="focus:border-golkar-dark-gold focus:ring-golkar-yellow/30 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-800 transition placeholder:text-gray-400 focus:ring-1 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="gradient-gold inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Send size={16} /> Kirim Aspirasi
          </button>

          {submitted && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-center text-sm font-medium text-emerald-600">✓ Aspirasi berhasil dikirim!</p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

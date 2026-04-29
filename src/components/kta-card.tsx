import type { KtaFormValues } from '@/schemas/kta-schema'
import type { Kta } from '@/types/kta'
import { getInitials } from '@/utils/get-initials'
import { forwardRef } from 'react'

interface KtaCardProps {
  data: Partial<Kta> | Partial<KtaFormValues>
  photoPreview?: string | null
}

export const KtaCardFront = forwardRef<HTMLDivElement, KtaCardProps>(({ data, photoPreview }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex aspect-[1.586/1] w-[450px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
      style={{
        backgroundImage: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' // Gold gradient
      }}
    >
      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}
      />

      {/* Header */}
      <div className="relative flex items-center gap-4 bg-white/90 p-4 backdrop-blur-sm">
        <img src="/partai-logo.png" alt="Logo" className="h-10 w-10 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
        <div className="flex flex-col">
          <h2 className="text-lg font-black tracking-widest text-slate-900 uppercase">Partai Golongan Karya</h2>
          <p className="text-xs font-bold tracking-widest text-slate-700">Kartu Tanda Anggota</p>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 gap-4 p-4">
        {/* Photo */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex aspect-3/4 w-24 items-center justify-center overflow-hidden rounded-md border-2 border-white bg-slate-100 shadow-md">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
            ) : data.photo ? (
              <img
                src={data.photo instanceof File ? URL.createObjectURL(data.photo) : typeof data.photo === 'string' ? data.photo : ''}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-slate-400">{getInitials(data.name || 'NA')}</span>
            )}
          </div>
          <div className="rounded bg-black/80 px-2 py-0.5">
            <span className="text-[10px] font-bold text-white">{data.nik || 'NIK KOSONG'}</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col gap-1.5 text-xs text-slate-900">
          <div className="grid grid-cols-[80px_10px_1fr] items-start">
            <span className="font-semibold uppercase">Nama</span>
            <span>:</span>
            <span className="font-bold uppercase">{data.name || '-'}</span>
          </div>
          <div className="grid grid-cols-[80px_10px_1fr] items-start">
            <span className="font-semibold uppercase">TTL</span>
            <span>:</span>
            <span className="font-bold uppercase">
              {data.place_of_birth || '-'}, {data.date_of_birth || '-'}
            </span>
          </div>
          <div className="grid grid-cols-[80px_10px_1fr] items-start">
            <span className="font-semibold uppercase">Alamat</span>
            <span>:</span>
            <span className="leading-tight font-bold uppercase">
              {data.address || '-'}
              {data.rt && data.rw ? ` RT ${data.rt}/RW ${data.rw}` : ''}
              <br />
              {/* Note: In a real app we might pass the full province/regency names. For preview, we might just have IDs if not joined. */}
              {data.postal_code ? `Kode Pos ${data.postal_code}` : ''}
            </span>
          </div>
          <div className="grid grid-cols-[80px_10px_1fr] items-start">
            <span className="font-semibold uppercase">Jabatan</span>
            <span>:</span>
            <span className="font-bold uppercase">{data.position || 'ANGGOTA'}</span>
          </div>
        </div>
      </div>

      {/* Footer / Validity */}
      <div className="relative bg-black/90 py-1.5 text-center">
        <p className="text-[10px] font-bold tracking-widest text-white uppercase">Masa Berlaku: Seumur Hidup</p>
      </div>
    </div>
  )
})

KtaCardFront.displayName = 'KtaCardFront'

export const KtaCardBack = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex aspect-[1.586/1] w-[450px] flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xl"
      style={{
        backgroundImage: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' // Gold gradient
      }}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-white/50 bg-white/80 p-6 shadow-sm backdrop-blur-md">
        <h3 className="text-xl font-black tracking-widest text-slate-900 uppercase">Ketentuan KTA</h3>
        <ul className="list-inside list-decimal space-y-2 text-left text-xs font-semibold text-slate-800">
          <li>Kartu ini adalah milik sah Partai Golongan Karya.</li>
          <li>Kartu ini tidak dapat dipindahtangankan.</li>
          <li>Apabila menemukan kartu ini, harap kembalikan ke kantor DPD Partai terdekat.</li>
          <li>Penyalahgunaan kartu ini akan ditindak sesuai hukum yang berlaku.</li>
        </ul>
      </div>
    </div>
  )
})

KtaCardBack.displayName = 'KtaCardBack'

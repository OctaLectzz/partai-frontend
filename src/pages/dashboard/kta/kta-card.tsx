import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'
import { forwardRef } from 'react'

interface KtaCardProps {
  data: {
    nik?: string
    kta_number?: string | null
    name?: string
    position?: string
    gender?: string
    place_of_birth?: string
    date_of_birth?: string
    address?: string
    rt?: string
    rw?: string
    province_name?: string
    regency_name?: string
    district_name?: string
    village_name?: string
    photo?: string | null | File
  }
  side?: 'front' | 'back'
  className?: string
  id?: string
  style?: React.CSSProperties
}

// Standard HEX colors for html2canvas compatibility (avoiding oklch)
const COLORS = {
  primary: '#ffd700',
  primaryDark: '#FFA500',
  white: '#ffffff',
  white80: 'rgba(255, 255, 255, 0.8)',
  white50: 'rgba(255, 255, 255, 0.5)',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc'
}

export const KtaCard = forwardRef<HTMLDivElement, KtaCardProps>(({ data, side = 'front', className, id, style }, ref) => {
  // Helper to get image source
  const getPhotoSrc = () => {
    if (!data.photo) return null
    if (data.photo instanceof File) return URL.createObjectURL(data.photo)
    return data.photo
  }

  // Dummy KTA Number generator (matched to backend format YYYYMMDDxxxx)
  const getDisplayKtaNumber = () => {
    if (data.kta_number) return data.kta_number

    // Create a dummy that looks like NIK but follows backend logic
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')

    // Display as YYYYMMDD0921
    return `${y}${m}${d}0921`
  }

  const commonStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '450px',
    borderColor: COLORS.slate200,
    backgroundColor: COLORS.white,
    color: COLORS.slate800,
    ...style
  }

  if (side === 'back') {
    return (
      <div
        id={id}
        ref={ref}
        className={cn('relative aspect-[85.6/53.98] w-full overflow-hidden rounded-xl border', className)}
        style={{
          ...commonStyles,
          backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`
        }}
      >
        {/* Card Background Pattern (Back) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '10px 10px',
            opacity: 0.1
          }}
        />

        <div
          className="relative z-10 flex h-[88%] w-[92%] flex-col items-center justify-center gap-3 rounded-xl border p-5 shadow-sm"
          style={{
            backgroundColor: COLORS.white80,
            borderColor: COLORS.white50,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <h3 className="mb-1 text-[15px] font-black tracking-widest uppercase" style={{ color: COLORS.slate900 }}>
            SYARAT & KETENTUAN
          </h3>

          <ul className="list-inside list-decimal space-y-1 text-left text-[11px] font-semibold" style={{ color: COLORS.slate800 }}>
            <li>Kartu ini adalah milik sah Partai Golongan Karya.</li>
            <li>Kartu ini tidak dapat dipindahtangankan.</li>
            <li>Apabila menemukan kartu ini, harap kembalikan ke kantor DPD Partai terdekat.</li>
            <li>Penyalahgunaan kartu ini akan ditindak sesuai hukum yang berlaku.</li>
          </ul>

          <div className="flex w-full items-end justify-between px-2">
            <div className="flex flex-col items-start gap-1">
              <div className="h-10 w-10" style={{ backgroundColor: COLORS.slate200 }} />
              <span className="text-[8px]" style={{ color: COLORS.slate400 }}>
                VERIFIED MEMBER
              </span>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold" style={{ color: COLORS.slate800 }}>
                PARTAI GOLKAR
              </p>
              <p className="text-[9px]" style={{ color: COLORS.slate500 }}>
                Jakarta, {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id={id} ref={ref} className={cn('relative aspect-[85.6/53.98] w-full overflow-hidden rounded-xl border-2', className)} style={commonStyles}>
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: COLORS.primary }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}
        />

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full p-1" style={{ backgroundColor: COLORS.white }}>
            <img src="/logo.png" alt="Logo" className="h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-black tracking-widest text-slate-900 uppercase">Partai Golkar</h2>
            <p className="text-xs font-bold tracking-widest text-slate-700">Kartu Tanda Anggota</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-bold uppercase" style={{ color: COLORS.slate900 }}>
            ANGGOTA DIGITAL
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative flex h-full flex-col p-4 pt-3">
        {/* KTA Number */}
        <div className="mb-2 flex items-center gap-2 pl-1">
          <span className="text-[10px] font-bold" style={{ color: COLORS.slate900 }}>
            NO. ANGGOTA :
          </span>
          <span className="text-[15px] font-black tracking-[0.2em]" style={{ color: COLORS.slate900 }}>
            {getDisplayKtaNumber()}
          </span>
        </div>

        <div className="flex flex-1">
          {/* Photo Section (Left) */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-32 w-28 overflow-hidden rounded-lg border-2 shadow-inner"
              style={{ borderColor: COLORS.slate100, backgroundColor: COLORS.slate50 }}
            >
              {data.photo ? (
                <img src={getPhotoSrc() || ''} alt="Member" className="h-full w-full object-cover" />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-3xl font-bold"
                  style={{ backgroundColor: COLORS.slate200, color: COLORS.slate400 }}
                >
                  {getInitials(data.name || 'NA')}
                </div>
              )}
            </div>
          </div>

          {/* Info Section (Right) - Stacked Vertically (1 row per item) */}
          <div className="ml-4 flex flex-1 flex-col gap-1 overflow-hidden pr-2">
            <div>
              <p className="text-[9px] font-bold uppercase" style={{ color: COLORS.slate400 }}>
                NAMA
              </p>
              <p className="truncate text-[11px] font-bold uppercase" style={{ color: COLORS.slate800 }}>
                {data.name || '-'}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase" style={{ color: COLORS.slate400 }}>
                TEMPAT, TGL LAHIR
              </p>
              <p className="truncate text-[11px] font-bold uppercase" style={{ color: COLORS.slate700 }}>
                {data.place_of_birth || '-'}, {data.date_of_birth || '-'}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase" style={{ color: COLORS.slate400 }}>
                JABATAN
              </p>
              <p className="truncate text-[11px] font-bold uppercase" style={{ color: COLORS.slate800 }}>
                {data.position || '-'}
              </p>
            </div>

            <div className="mt-1">
              <p className="text-[9px] font-bold uppercase" style={{ color: COLORS.slate400 }}>
                ALAMAT
              </p>
              <p className="line-clamp-2 text-[9px] leading-tight font-medium uppercase" style={{ color: COLORS.slate600 }}>
                {data.address ? `${data.address}, RT ${data.rt || '00'} / RW ${data.rw || '00'}` : '-'}
                <br />
                {data.village_name || '-'}, {data.district_name || '-'}, {data.regency_name || '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full" style={{ backgroundColor: COLORS.primary, opacity: 0.1 }} />
      <div className="absolute right-0 bottom-0 h-1 w-1/2 rounded-tl-full" style={{ backgroundColor: COLORS.primary }} />
    </div>
  )
})

KtaCard.displayName = 'KtaCard'

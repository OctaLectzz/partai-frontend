import { useProvinces, useRegencies } from '@/hooks/use-region'
import { cn } from '@/lib/utils'
import type { Massa } from '@/types/massa'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface MassaPopupContentProps {
  massa: Massa
  t: TFunction
}

/**
 * Content for the Leaflet Popup that appears above a marker.
 * Uses Tailwind classes so it inherits dark mode styles correctly.
 */
export function MassaPopupContent({ massa, t }: MassaPopupContentProps) {
  const { data: provinces = [] } = useProvinces()
  const { data: regencies = [] } = useRegencies(massa.province_id ? String(massa.province_id) : undefined)

  const provinceName = useMemo(() => {
    return provinces.find((p) => String(p.id) === String(massa.province_id))?.name || massa.province?.name || ''
  }, [provinces, massa.province_id, massa.province])

  const regencyName = useMemo(() => {
    return regencies.find((r) => String(r.id) === String(massa.regency_id))?.name || massa.regency?.name || ''
  }, [regencies, massa.regency_id, massa.regency])

  return (
    <div className="w-[320px] font-sans">
      {/* Header */}
      <div className="bg-primary flex items-center gap-3 rounded-xl px-5 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/10">
          {massa.photo ? (
            <img src={massa.photo} alt={massa.full_name} className="h-full w-full rounded-full object-cover" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[14px] leading-tight font-bold text-gray-900">{massa.full_name}</div>
          <div className="mt-0.5 text-[12px] font-medium text-gray-900/80">{massa.nik}</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5">
        {/* Status + Profession */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white',
              massa.status === 'active' ? 'bg-green-600 dark:bg-green-600/90' : 'bg-red-600 dark:bg-red-600/90'
            )}
          >
            {massa.status === 'active' ? t('public.status.active') : t('public.status.inactive')}
          </span>
          {massa.profession && <span className="text-muted text-[12px]">{massa.profession}</span>}
        </div>

        {/* Address */}
        <div className="border-primary/30 bg-primary/10 flex items-start gap-2.5 rounded-xl border p-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-dark dark:text-primary mt-0.5 shrink-0"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div className="text-[12px] leading-relaxed">
            <div className="text-foreground font-semibold">{massa.address}</div>
            <div className="text-muted mt-0.5">
              RT {massa.rt}/RW {massa.rw}
              {massa.village ? `, ${massa.village.name}` : ''}
              {massa.district ? `, ${massa.district.name}` : ''}
            </div>
            <div className="text-muted">
              {regencyName}
              {provinceName ? `, ${provinceName}` : ''}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50 p-3 dark:border-blue-900/20 dark:bg-blue-900/10">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-blue-600 dark:text-blue-500"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <div className="text-[12px]">
            <span className="text-foreground font-semibold">{massa.phone_number}</span>
            {massa.email && <span className="text-muted ml-2">• {massa.email}</span>}
          </div>
        </div>

        {/* Coordinates */}
        <div className="border-border flex items-center justify-between border-t border-dashed pt-3">
          <span className="text-muted text-[10px] font-semibold tracking-wider uppercase">{t('dashboard.distributionMap.popup.coordinates')}</span>
          <span className="text-primary-dark dark:text-primary font-mono text-[11px]">
            {Number(massa.latitude).toFixed(6)}, {Number(massa.longitude).toFixed(6)}
          </span>
        </div>

        {/* View Detail Button */}
        <Link
          to={`/dashboard/mass-data/show/${massa.id}`}
          className="bg-primary hover:bg-primary-dark flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold text-gray-900 shadow-sm transition-all"
          style={{ textDecoration: 'none' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {t('public.viewDetail')}
        </Link>
      </div>
    </div>
  )
}

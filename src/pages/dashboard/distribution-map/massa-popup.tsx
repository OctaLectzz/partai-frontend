import { useProvinces, useRegencies } from '@/hooks/use-region'
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
 * Uses inline styles because Leaflet renders popup content outside
 * the normal React/Tailwind DOM context.
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
    <div style={{ width: '320px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}
        >
          {massa.photo ? (
            <img src={massa.photo} alt={massa.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {massa.full_name}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '2px' }}>{massa.nik}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Status + Profession */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'white',
              background: massa.status === 'active' ? '#16a34a' : '#dc2626'
            }}
          >
            {massa.status === 'active' ? t('public.status.active') : t('public.status.inactive')}
          </span>
          {massa.profession && <span style={{ fontSize: '12px', color: '#6b7280' }}>{massa.profession}</span>}
        </div>

        {/* Address */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            background: '#fffbeb',
            borderRadius: '12px',
            padding: '12px'
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, marginTop: '2px' }}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div style={{ fontSize: '12px', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 600, color: '#1f2937' }}>{massa.address}</div>
            <div style={{ color: '#6b7280', marginTop: '2px' }}>
              RT {massa.rt}/RW {massa.rw}
              {massa.village ? `, ${massa.village.name}` : ''}
              {massa.district ? `, ${massa.district.name}` : ''}
            </div>
            <div style={{ color: '#6b7280' }}>
              {regencyName}
              {provinceName ? `, ${provinceName}` : ''}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#eff6ff',
            borderRadius: '12px',
            padding: '12px'
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <div style={{ fontSize: '12px' }}>
            <span style={{ fontWeight: 600, color: '#1f2937' }}>{massa.phone_number}</span>
            {massa.email && <span style={{ color: '#6b7280', marginLeft: '8px' }}>• {massa.email}</span>}
          </div>
        </div>

        {/* Coordinates */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px dashed #e5e7eb',
            paddingTop: '12px'
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('dashboard.distributionMap.popup.coordinates')}
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#d97706' }}>
            {Number(massa.latitude).toFixed(6)}, {Number(massa.longitude).toFixed(6)}
          </span>
        </div>

        {/* View Detail Button */}
        <Link
          to={`/dashboard/mass-data/show/${massa.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
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

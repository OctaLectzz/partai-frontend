import { SummaryCard } from '@/components/summary-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEvents } from '@/hooks/use-event'
import { useMassas } from '@/hooks/use-massa'
import { Calendar, Eye, MapPin, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ClusterMap } from './cluster-map'
import { DistributionTable } from './distribution-table'
import { MapFilter } from './map-filter'
import { MapGuide } from './map-guide'

export default function DistributionMap() {
  const { t } = useTranslation()
  const { data: massas = [], isLoading: isLoadingMassa } = useMassas()
  const { data: events = [] } = useEvents()

  // Filters
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedRegency, setSelectedRegency] = useState('')

  // Filtered massas — use String() to handle number vs string ID mismatch from API
  const filteredMassas = useMemo(() => {
    return massas.filter((m) => {
      if (selectedProvince && String(m.province_id) !== String(selectedProvince)) return false
      if (selectedRegency && String(m.regency_id) !== String(selectedRegency)) return false
      return true
    })
  }, [massas, selectedProvince, selectedRegency])

  // Stats
  const stats = useMemo(() => {
    const total = massas.length
    const withCoords = massas.filter((m) => m.latitude && m.longitude && Number(m.latitude) !== 0 && Number(m.longitude) !== 0).length
    const provinces = new Set(massas.map((m) => String(m.province_id))).size
    const totalEvents = events.length

    return { total, withCoords, provinces, totalEvents }
  }, [massas, events])

  const handleReset = () => {
    setSelectedProvince('')
    setSelectedRegency('')
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t('dashboard.distributionMap.title')}</h1>
        <p className="text-muted mt-1 text-sm">{t('dashboard.distributionMap.subtitle')}</p>
      </div>

      {/* Summary Cards */}
      {isLoadingMassa ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title={t('dashboard.distributionMap.summary.totalMassa')}
            value={stats.total.toLocaleString()}
            borderColorClass="border-l-amber-500"
            valueColorClass="text-amber-600 dark:text-amber-400"
            icon={<Users className="h-5 w-5" />}
          />
          <SummaryCard
            title={t('dashboard.distributionMap.summary.visibleOnMap')}
            value={stats.withCoords.toLocaleString()}
            borderColorClass="border-l-emerald-500"
            valueColorClass="text-emerald-600 dark:text-emerald-400"
            icon={<Eye className="h-5 w-5" />}
          />
          <SummaryCard
            title={t('dashboard.distributionMap.summary.provincesCovered')}
            value={stats.provinces}
            borderColorClass="border-l-blue-500"
            valueColorClass="text-blue-600 dark:text-blue-400"
            icon={<MapPin className="h-5 w-5" />}
          />
          <SummaryCard
            title={t('dashboard.distributionMap.summary.totalEvents')}
            value={stats.totalEvents.toLocaleString()}
            borderColorClass="border-l-purple-500"
            valueColorClass="text-purple-600 dark:text-purple-400"
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>
      )}

      {/* Filter */}
      <MapFilter
        t={t}
        selectedProvince={selectedProvince}
        selectedRegency={selectedRegency}
        onProvinceChange={setSelectedProvince}
        onRegencyChange={setSelectedRegency}
        onReset={handleReset}
      />

      {/* Map */}
      <div className="relative">
        {isLoadingMassa ? <Skeleton className="h-[500px] rounded-2xl" /> : <ClusterMap massas={filteredMassas} className="h-[500px]" t={t} />}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="lg:col-span-1">
          {/* Guide */}
          <MapGuide t={t} className="h-full" />
        </div>

        <div className="lg:col-span-1">
          {/* Distribution Table */}
          <DistributionTable t={t} massas={massas} isLoading={isLoadingMassa} className="h-full" />
        </div>
      </div>
    </div>
  )
}

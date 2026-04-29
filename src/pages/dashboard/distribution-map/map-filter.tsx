import { Select } from '@/components/ui/select'
import { useProvinces, useRegencies } from '@/hooks/use-region'
import type { TFunction } from 'i18next'
import { Filter, RotateCcw } from 'lucide-react'
import { useMemo } from 'react'

interface MapFilterProps {
  t: TFunction
  selectedProvince: string
  selectedRegency: string
  onProvinceChange: (value: string) => void
  onRegencyChange: (value: string) => void
  onReset: () => void
}

export function MapFilter({ t, selectedProvince, selectedRegency, onProvinceChange, onRegencyChange, onReset }: MapFilterProps) {
  const { data: provinces = [], isLoading: isLoadingProvinces } = useProvinces()
  const { data: regencies = [], isLoading: isLoadingRegencies } = useRegencies(selectedProvince || undefined)

  const provinceOptions = useMemo(
    () => [{ label: t('dashboard.distributionMap.filter.allProvinces'), value: '' }, ...provinces.map((p) => ({ label: p.name, value: p.id }))],
    [provinces, t]
  )

  const regencyOptions = useMemo(
    () => [{ label: t('dashboard.distributionMap.filter.allRegencies'), value: '' }, ...regencies.map((r) => ({ label: r.name, value: r.id }))],
    [regencies, t]
  )

  const hasFilter = selectedProvince || selectedRegency

  return (
    <div className="bg-card border-card-border rounded-2xl border p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/20">
            <Filter className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-foreground text-sm font-bold">{t('dashboard.distributionMap.filter.title')}</span>
        </div>

        {hasFilter && (
          <button
            onClick={onReset}
            className="text-muted hover:text-foreground flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <RotateCcw className="h-3 w-3" />
            {t('public.resetText')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Select
          value={selectedProvince}
          onChange={(val: string) => {
            onProvinceChange(val)
            onRegencyChange('')
          }}
          options={provinceOptions}
          placeholder={t('dashboard.distributionMap.filter.provincePlaceholder')}
          searchPlaceholder={t('public.searchText')}
          isLoading={isLoadingProvinces}
        />

        <Select
          value={selectedRegency}
          onChange={onRegencyChange}
          options={regencyOptions}
          placeholder={t('dashboard.distributionMap.filter.regencyPlaceholder')}
          searchPlaceholder={t('public.searchText')}
          isLoading={isLoadingRegencies}
          disabled={!selectedProvince}
        />
      </div>
    </div>
  )
}

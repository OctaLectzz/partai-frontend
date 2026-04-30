import { Skeleton } from '@/components/ui/skeleton'
import { useAllRegencies, useProvinces } from '@/hooks/use-region'
import { cn } from '@/lib/utils'
import type { Massa } from '@/types/massa'
import type { TFunction } from 'i18next'
import { useMemo, useState } from 'react'

interface RegionDistribution {
  name: string
  count: number
  percentage: number
}

interface DistributionTableProps {
  t: TFunction
  massas: Massa[]
  className?: string
  isLoading?: boolean
}

export function DistributionTable({ t, massas, className = '', isLoading = false }: DistributionTableProps) {
  const { data: provinces = [], isLoading: isLoadingProvinces } = useProvinces()
  const { data: regencies = [], isLoading: isLoadingRegencies } = useAllRegencies()
  const [activeTab, setActiveTab] = useState<'province' | 'regency'>('province')
  const isLoadingData = isLoading || isLoadingProvinces || isLoadingRegencies

  // Build lookup maps
  const provinceLookup = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of provinces) {
      map.set(String(p.id), p.name)
    }
    return map
  }, [provinces])

  const regencyLookup = useMemo(() => {
    const map = new Map<string, string>()
    for (const r of regencies) {
      map.set(String(r.id), r.name)
    }
    return map
  }, [regencies])

  const distributions = useMemo<RegionDistribution[]>(() => {
    const map = new Map<string, { name: string; count: number }>()

    for (const m of massas) {
      const key = activeTab === 'province' ? String(m.province_id) : String(m.regency_id)

      let name = ''
      if (activeTab === 'province') {
        name = provinceLookup.get(key) || m.province?.name || `Province ${key}`
      } else {
        name = regencyLookup.get(key) || m.regency?.name || `Regency ${key}`
      }

      const existing = map.get(key)
      if (existing) {
        existing.count++
      } else {
        map.set(key, { name, count: 1 })
      }
    }

    const total = massas.length
    const result = Array.from(map.values())
      .map((item) => ({
        name: item.name,
        count: item.count,
        percentage: total > 0 ? (item.count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)

    return result
  }, [massas, provinceLookup, regencyLookup, activeTab])

  if (massas.length === 0 && !isLoadingData) {
    return null
  }

  return (
    <div className={cn('bg-card border-card-border flex flex-col overflow-hidden rounded-2xl border shadow-md', className)}>
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div>
          <h3 className="text-foreground text-sm font-bold">{t('dashboard.distributionMap.distribution.title')}</h3>
          <p className="text-muted mt-0.5 text-xs">{t('dashboard.distributionMap.distribution.subtitle')}</p>
        </div>

        <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800/80">
          <button
            onClick={() => setActiveTab('province')}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              activeTab === 'province' ? 'text-foreground bg-white shadow-sm dark:bg-gray-700' : 'text-muted hover:text-foreground'
            )}
          >
            {t('public.address.province')}
          </button>

          <button
            onClick={() => setActiveTab('regency')}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              activeTab === 'regency' ? 'text-foreground bg-white shadow-sm dark:bg-gray-700' : 'text-muted hover:text-foreground'
            )}
          >
            {t('public.address.regency')}
          </button>
        </div>
      </div>

      <div className="scrollbar-custom max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="text-muted px-5 py-3 text-left text-[10px] font-bold tracking-wider uppercase">
                {activeTab === 'province' ? t('dashboard.distributionMap.distribution.province') : 'KABUPATEN'}
              </th>
              <th className="text-muted px-5 py-3 text-right text-[10px] font-bold tracking-wider uppercase">
                {t('dashboard.distributionMap.distribution.total')}
              </th>
              <th className="text-muted px-5 py-3 text-right text-[10px] font-bold tracking-wider uppercase">%</th>
              <th className="text-muted px-5 py-3 text-[10px] font-bold tracking-wider uppercase">
                {t('dashboard.distributionMap.distribution.chart')}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoadingData
              ? Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Skeleton className="ml-auto h-4 w-12" />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Skeleton className="ml-auto h-4 w-10" />
                    </td>
                    <td className="px-5 py-3">
                      <Skeleton className="h-2 w-full rounded-full" />
                    </td>
                  </tr>
                ))
              : distributions.map((item, idx) => (
                  <tr key={item.name} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-muted flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold dark:bg-gray-800">
                          {idx + 1}
                        </span>
                        <span className="text-foreground line-clamp-1 text-sm font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-foreground text-sm font-bold">{item.count.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-primary text-sm font-semibold">{item.percentage.toFixed(1)}%</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="from-primary h-full rounded-full bg-linear-to-r to-amber-600 transition-all duration-700 ease-out"
                          style={{ width: `${Math.min(item.percentage, 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Footer total */}
      <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <span className="text-muted text-xs font-bold tracking-wider uppercase">{t('dashboard.distributionMap.distribution.totalAll')}</span>
          <span className="text-foreground text-sm font-bold">
            {isLoadingData ? <Skeleton className="h-4 w-10" /> : massas.length.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

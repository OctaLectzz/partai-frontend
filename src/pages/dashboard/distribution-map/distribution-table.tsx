import { useProvinces } from '@/hooks/use-region'
import { cn } from '@/lib/utils'
import type { Massa } from '@/types/massa'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'

interface ProvinceDistribution {
  name: string
  count: number
  percentage: number
}

interface DistributionTableProps {
  t: TFunction
  massas: Massa[]
  className?: string
}

export function DistributionTable({ t, massas, className = '' }: DistributionTableProps) {
  const { data: provinces = [] } = useProvinces()

  // Build province lookup map from API
  const provinceLookup = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of provinces) {
      map.set(String(p.id), p.name)
    }
    return map
  }, [provinces])

  const distributions = useMemo<ProvinceDistribution[]>(() => {
    const map = new Map<string, { name: string; count: number }>()

    for (const m of massas) {
      const key = String(m.province_id)
      // Resolve name: API province lookup → massa relation → fallback
      const name = provinceLookup.get(key) || m.province?.name || `Province ${key}`
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
  }, [massas, provinceLookup])

  if (distributions.length === 0) {
    return null
  }

  return (
    <div className={cn('bg-card border-card-border flex flex-col overflow-hidden rounded-2xl border shadow-md', className)}>
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <h3 className="text-foreground text-sm font-bold">{t('dashboard.distributionMap.distribution.title')}</h3>
        <p className="text-muted mt-0.5 text-xs">{t('dashboard.distributionMap.distribution.subtitle')}</p>
      </div>

      <div className="scrollbar-custom max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="text-muted px-5 py-3 text-left text-[10px] font-bold tracking-wider uppercase">
                {t('dashboard.distributionMap.distribution.province')}
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
            {distributions.map((item, idx) => (
              <tr key={item.name} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-muted flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold dark:bg-gray-800">
                      {idx + 1}
                    </span>
                    <span className="text-foreground text-sm font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="text-foreground text-sm font-bold">{item.count.toLocaleString()}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{item.percentage.toFixed(1)}%</span>
                </td>
                <td className="px-5 py-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-amber-400 to-amber-600 transition-all duration-700 ease-out"
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
          <span className="text-foreground text-sm font-bold">{massas.length.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

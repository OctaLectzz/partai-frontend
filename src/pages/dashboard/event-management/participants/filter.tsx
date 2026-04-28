import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { ColumnFiltersState } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Filter, RotateCcw, Search, Users } from 'lucide-react'
import { useMemo } from 'react'

interface ParticipantFilterSectionProps {
  t: TFunction
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  columnFilters: ColumnFiltersState
  onColumnFiltersChange: (value: ColumnFiltersState) => void
  totalCount: number
}

export function ParticipantFilterSection({
  t,
  globalFilter,
  onGlobalFilterChange,
  columnFilters,
  onColumnFiltersChange,
  totalCount
}: ParticipantFilterSectionProps) {
  const statusOptions = [
    { label: t('dashboard.participants.statusLabel.registered'), value: 'registered' },
    { label: t('dashboard.participants.statusLabel.attended'), value: 'attended' }
  ]

  const statusFilter = useMemo(() => (columnFilters.find((f) => f.id === 'status')?.value as string[]) || [], [columnFilters])

  const hasActiveFilters = globalFilter.length > 0 || columnFilters.length > 0

  const handleResetFilters = () => {
    onGlobalFilterChange('')
    onColumnFiltersChange([])
  }

  const handleStatusChange = (val: string[]) => {
    const otherFilters = columnFilters.filter((f) => f.id !== 'status')
    onColumnFiltersChange(val.length > 0 ? [...otherFilters, { id: 'status', value: val }] : otherFilters)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Users className="text-primary-dark h-5 w-5" />
        <h2 className="text-foreground text-lg font-bold">{t('dashboard.participants.title')}</h2>
        <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">{totalCount}</span>
      </div>

      <p className="text-muted mb-4 text-sm">{t('dashboard.participants.subtitle')}</p>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-[300px] flex-1">
          <Input
            icon={<Search size={18} />}
            placeholder={t('dashboard.participants.searchPlaceholder')}
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
          />
        </div>

        <div className="min-w-[200px]">
          <Select
            icon={<Filter size={18} />}
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusChange}
            isMultiple
            placeholder={t('public.allStatuses')}
            searchPlaceholder={t('public.searchStatusPlaceholder')}
            noOptionsMessage={t('dashboard.events.table.emptyMessage')}
          />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="text-muted h-10 px-3 transition-colors hover:text-red-500"
            icon={<RotateCcw size={16} />}
          >
            {t('public.resetText')}
          </Button>
        )}
      </div>
    </div>
  )
}

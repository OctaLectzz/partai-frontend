import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { ColumnFiltersState } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { CalendarDays, Filter, RotateCcw, Search, User } from 'lucide-react'
import { useMemo } from 'react'

interface MassFilterSectionProps {
  t: TFunction
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  columnFilters: ColumnFiltersState
  onColumnFiltersChange: (value: ColumnFiltersState) => void
}

export function MassFilterSection({ t, globalFilter, onGlobalFilterChange, columnFilters, onColumnFiltersChange }: MassFilterSectionProps) {
  const statusOptions = [
    { label: t('public.status.active'), value: 'active' },
    { label: t('public.status.inactive'), value: 'inactive' }
  ]

  const genderOptions = [
    { label: t('public.gender.male'), value: 'M' },
    { label: t('public.gender.female'), value: 'F' }
  ]

  const statusFilter = useMemo(() => (columnFilters.find((f) => f.id === 'status')?.value as string[]) || [], [columnFilters])
  const genderFilter = useMemo(() => (columnFilters.find((f) => f.id === 'gender')?.value as string[]) || [], [columnFilters])

  const hasActiveFilters = globalFilter.length > 0 || columnFilters.length > 0

  const handleResetFilters = () => {
    onGlobalFilterChange('')
    onColumnFiltersChange([])
  }

  const handleStatusChange = (val: string[]) => {
    const otherFilters = columnFilters.filter((f) => f.id !== 'status')
    onColumnFiltersChange(val.length > 0 ? [...otherFilters, { id: 'status', value: val }] : otherFilters)
  }

  const handleGenderChange = (val: string[]) => {
    const otherFilters = columnFilters.filter((f) => f.id !== 'gender')
    onColumnFiltersChange(val.length > 0 ? [...otherFilters, { id: 'gender', value: val }] : otherFilters)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays className="text-primary-dark h-5 w-5" />
        <h2 className="text-foreground text-lg font-bold">{t('dashboard.massa.title')}</h2>
      </div>

      <p className="text-muted mb-4 text-sm">{t('dashboard.massa.subtitle')}</p>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-[300px] flex-1">
          <Input
            icon={<Search size={18} />}
            placeholder={t('dashboard.massa.searchPlaceholder')}
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
            noOptionsMessage={t('dashboard.massa.emptyMessage')}
          />
        </div>

        <div className="min-w-[200px]">
          <Select
            icon={<User size={18} />}
            options={genderOptions}
            value={genderFilter}
            onChange={handleGenderChange}
            isMultiple
            placeholder={t('public.gender.label')}
            searchPlaceholder={t('public.gender.label')}
            noOptionsMessage={t('dashboard.massa.emptyMessage')}
          />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && <Button variant="danger" size="sm" onClick={handleResetFilters} icon={<RotateCcw size={16} />}></Button>}
      </div>
    </div>
  )
}

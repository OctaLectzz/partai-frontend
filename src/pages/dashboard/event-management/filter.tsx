import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useCategories } from '@/hooks/use-category'
import type { ColumnFiltersState } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { CalendarDays, Filter, RotateCcw, Search, Tag } from 'lucide-react'
import { useMemo } from 'react'

interface EventFilterSectionProps {
  t: TFunction
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  columnFilters: ColumnFiltersState
  onColumnFiltersChange: (value: ColumnFiltersState) => void
}

export function EventFilterSection({ t, globalFilter, onGlobalFilterChange, columnFilters, onColumnFiltersChange }: EventFilterSectionProps) {
  const { data: categoriesData } = useCategories()

  const statusOptions = [
    { label: t('dashboard.events.status.draft'), value: 'draft' },
    { label: t('dashboard.events.status.published'), value: 'published' },
    { label: t('dashboard.events.status.completed'), value: 'completed' },
    { label: t('dashboard.events.status.cancelled'), value: 'cancelled' }
  ]

  const categoryOptions = useMemo(() => {
    return (categoriesData || []).map((cat) => ({
      label: cat.name,
      value: cat.id.toString()
    }))
  }, [categoriesData])

  // Helpers to sync local filter state with table column filters
  const statusFilter = useMemo(() => (columnFilters.find((f) => f.id === 'status')?.value as string[]) || [], [columnFilters])
  const categoryFilter = useMemo(() => (columnFilters.find((f) => f.id === 'category_id')?.value as string[]) || [], [columnFilters])

  const hasActiveFilters = globalFilter.length > 0 || columnFilters.length > 0

  const handleResetFilters = () => {
    onGlobalFilterChange('')
    onColumnFiltersChange([])
  }

  const handleStatusChange = (val: string[]) => {
    const otherFilters = columnFilters.filter((f) => f.id !== 'status')
    onColumnFiltersChange(val.length > 0 ? [...otherFilters, { id: 'status', value: val }] : otherFilters)
  }

  const handleCategoryChange = (val: string[]) => {
    const otherFilters = columnFilters.filter((f) => f.id !== 'category_id')
    onColumnFiltersChange(val.length > 0 ? [...otherFilters, { id: 'category_id', value: val }] : otherFilters)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays className="text-primary-dark h-5 w-5" />
        <h2 className="text-foreground text-lg font-bold">{t('dashboard.events.table.title')}</h2>
      </div>

      <p className="text-muted mb-4 text-sm">{t('dashboard.events.table.subtitle')}</p>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-[300px] flex-1">
          <Input
            icon={<Search size={18} />}
            placeholder={t('dashboard.events.searchPlaceholder')}
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

        <div className="min-w-[200px]">
          <Select
            icon={<Tag size={18} />}
            options={categoryOptions}
            value={categoryFilter}
            onChange={handleCategoryChange}
            isMultiple
            placeholder={t('dashboard.events.allCategories')}
            searchPlaceholder={t('dashboard.events.searchCategoryPlaceholder')}
            noOptionsMessage={t('dashboard.events.table.emptyMessage')}
          />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && <Button variant="danger" size="sm" onClick={handleResetFilters} icon={<RotateCcw size={16} />}></Button>}
      </div>
    </div>
  )
}

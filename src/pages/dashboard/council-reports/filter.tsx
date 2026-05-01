import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { ColumnFiltersState } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { FileText, Filter, RotateCcw, Search } from 'lucide-react'
import { useMemo } from 'react'

interface CouncilReportFilterSectionProps {
  t: TFunction
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  columnFilters: ColumnFiltersState
  onColumnFiltersChange: (value: ColumnFiltersState) => void
}

export function CouncilReportFilterSection({
  t,
  globalFilter,
  onGlobalFilterChange,
  columnFilters,
  onColumnFiltersChange
}: CouncilReportFilterSectionProps) {
  const statusOptions = [
    { label: t('dashboard.councilReport.status.draft'), value: 'draft' },
    { label: t('dashboard.councilReport.status.submitted'), value: 'submitted' },
    { label: t('dashboard.councilReport.status.approved'), value: 'approved' },
    { label: t('dashboard.councilReport.status.rejected'), value: 'rejected' }
  ]

  const reportTypeOptions = [
    { label: t('dashboard.councilReport.reportType.meeting'), value: 'meeting' },
    { label: t('dashboard.councilReport.reportType.visit'), value: 'visit' },
    { label: t('dashboard.councilReport.reportType.socialization'), value: 'socialization' },
    { label: t('dashboard.councilReport.reportType.supervision'), value: 'supervision' },
    { label: t('dashboard.councilReport.reportType.aspiration'), value: 'aspiration' },
    { label: t('dashboard.councilReport.reportType.other'), value: 'other' }
  ]

  const statusFilter = useMemo(() => (columnFilters.find((f) => f.id === 'status')?.value as string[]) || [], [columnFilters])
  const reportTypeFilter = useMemo(() => (columnFilters.find((f) => f.id === 'report_type')?.value as string[]) || [], [columnFilters])

  const hasActiveFilters = globalFilter.length > 0 || columnFilters.length > 0

  const handleResetFilters = () => {
    onGlobalFilterChange('')
    onColumnFiltersChange([])
  }

  const handleStatusChange = (val: string[]) => {
    const otherFilters = columnFilters.filter((f) => f.id !== 'status')
    onColumnFiltersChange(val.length > 0 ? [...otherFilters, { id: 'status', value: val }] : otherFilters)
  }

  const handleReportTypeChange = (val: string[]) => {
    const otherFilters = columnFilters.filter((f) => f.id !== 'report_type')
    onColumnFiltersChange(val.length > 0 ? [...otherFilters, { id: 'report_type', value: val }] : otherFilters)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary-dark" />
        <h2 className="text-lg font-bold text-foreground">{t('dashboard.councilReport.table.tableTitle')}</h2>
      </div>

      <p className="mb-4 text-sm text-muted">{t('dashboard.councilReport.table.tableSubtitle')}</p>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-[300px] flex-1">
          <Input
            icon={<Search size={18} />}
            placeholder={t('dashboard.councilReport.searchPlaceholder')}
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
            noOptionsMessage={t('dashboard.councilReport.emptyMessage')}
          />
        </div>

        <div className="min-w-[200px]">
          <Select
            icon={<FileText size={18} />}
            options={reportTypeOptions}
            value={reportTypeFilter}
            onChange={handleReportTypeChange}
            isMultiple
            placeholder={t('dashboard.councilReport.allReportTypes')}
            searchPlaceholder={t('dashboard.councilReport.searchReportTypePlaceholder')}
            noOptionsMessage={t('dashboard.councilReport.emptyMessage')}
          />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && <Button variant="danger" size="sm" onClick={handleResetFilters} icon={<RotateCcw size={16} />}></Button>}
      </div>
    </div>
  )
}

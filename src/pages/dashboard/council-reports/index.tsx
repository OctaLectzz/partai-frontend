import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { DataTable } from '@/components/ui/data-table'
import { useCouncilReports, useDeleteCouncilReport } from '@/hooks/use-council-report'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getColumns } from './columns'
import { CouncilReportFilterSection } from './filter'
import { CouncilReportSummarySection } from './summary'

export default function CouncilReports() {
  const { data: reports = [], isLoading } = useCouncilReports()
  const { mutateAsync: deleteReport, isPending: isDeleting } = useDeleteCouncilReport()

  const { t } = useTranslation()
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [reportToDelete, setReportToDelete] = useState<{ id: number; title: string } | null>(null)

  const handleOpenDeleteModal = (id: number, title: string) => {
    setReportToDelete({ id, title })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!reportToDelete) return

    await deleteReport(reportToDelete.id)
    setIsDeleteModalOpen(false)
    setReportToDelete(null)
  }

  // Table Configuration
  const columns = useMemo(() => getColumns(t, handleOpenDeleteModal), [t])
  const table = useReactTable({
    data: reports,
    columns,
    state: {
      globalFilter,
      columnFilters
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.councilReport.title')}</h1>
          <p className="mt-1 text-sm text-muted">{t('dashboard.councilReport.subtitle')}</p>
        </div>

        <Link to="/dashboard/council-activity-reports/create">
          <Button className="gap-2 bg-primary font-semibold text-slate-900 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark">
            <Plus className="h-4 w-4" />
            {t('dashboard.councilReport.createNew')}
          </Button>
        </Link>
      </div>

      <CouncilReportSummarySection t={t} isLoading={isLoading} reports={reports} />

      <DataTable
        table={table}
        columns={columns}
        isLoading={isLoading}
        skeletonRows={10}
        emptyMessage={t('dashboard.councilReport.emptyMessage')}
        headerSlot={
          <CouncilReportFilterSection
            t={t}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
          />
        }
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title={t('dashboard.councilReport.deleteConfirm.title')}
        message={
          <>
            {t('dashboard.councilReport.deleteConfirm.message')}
            <br />
            <span className="mt-2 block text-lg font-bold text-foreground">{reportToDelete?.title}</span>
          </>
        }
        confirmLabel={t('public.confirmDeleteText')}
        cancelLabel={t('public.cancelText')}
      />
    </div>
  )
}

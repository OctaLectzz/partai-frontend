import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { DataTable } from '@/components/ui/data-table'
import { useDeleteMassa, useMassas } from '@/hooks/use-massa'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getColumns } from './columns'
import { MassFilterSection } from './filter'

export default function MassData() {
  const { data: massas = [], isLoading } = useMassas()
  const { mutateAsync: deleteMassa, isPending: isDeleting } = useDeleteMassa()

  const { t } = useTranslation()
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [massaToDelete, setMassaToDelete] = useState<{ id: number; name: string } | null>(null)

  const handleOpenDeleteModal = (id: number, name: string) => {
    setMassaToDelete({ id, name })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!massaToDelete) return

    await deleteMassa(massaToDelete.id)
    setIsDeleteModalOpen(false)
    setMassaToDelete(null)
  }

  const columns = useMemo(() => getColumns(t, handleOpenDeleteModal), [t])
  const table = useReactTable({
    data: massas,
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
          <h1 className="text-foreground text-2xl font-bold">{t('dashboard.massa.title')}</h1>
          <p className="text-muted mt-1 text-sm">{t('dashboard.massa.subtitle')}</p>
        </div>

        <Link to="/dashboard/mass-data/create">
          <Button className="bg-primary hover:bg-primary-dark shadow-primary/20 gap-2 font-semibold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            {t('dashboard.massa.createNew')}
          </Button>
        </Link>
      </div>

      <DataTable
        table={table}
        columns={columns}
        isLoading={isLoading}
        skeletonRows={10}
        emptyMessage={t('dashboard.massa.emptyMessage')}
        headerSlot={
          <MassFilterSection
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
        title={t('dashboard.massa.deleteConfirm.title')}
        message={
          <>
            {t('dashboard.massa.deleteConfirm.message')}
            <br />
            <span className="text-foreground mt-2 block text-lg font-bold">{massaToDelete?.name}</span>
          </>
        }
        confirmLabel={t('public.confirmDeleteText')}
        cancelLabel={t('public.cancelText')}
      />
    </div>
  )
}

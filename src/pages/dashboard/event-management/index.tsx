import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { DataTable } from '@/components/ui/data-table'
import { useDeleteEvent, useEvents } from '@/hooks/use-event'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getColumns } from './columns'
import { EventFilterSection } from './filter'
import { EventSummarySection } from './summary'

export default function EventManagement() {
  const { data: events = [], isLoading } = useEvents()
  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteEvent()

  const { t } = useTranslation()
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<{ slug: string; name: string } | null>(null)

  const handleOpenDeleteModal = (slug: string, name: string) => {
    setEventToDelete({ slug, name })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return

    await deleteEvent(eventToDelete.slug)
    setIsDeleteModalOpen(false)
    setEventToDelete(null)
  }

  // Table Configuration
  const columns = useMemo(() => getColumns(t, handleOpenDeleteModal), [t])
  const table = useReactTable({
    data: events,
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
          <h1 className="text-foreground text-2xl font-bold">{t('dashboard.events.title')}</h1>
          <p className="text-muted mt-1 text-sm">{t('dashboard.events.subtitle')}</p>
        </div>

        <Link to="/dashboard/events/create">
          <Button className="bg-primary hover:bg-primary-dark shadow-primary/20 gap-2 font-semibold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            {t('dashboard.events.createNew')}
          </Button>
        </Link>
      </div>

      <EventSummarySection t={t} isLoading={isLoading} events={events} />

      <DataTable
        table={table}
        columns={columns}
        isLoading={isLoading}
        skeletonRows={10}
        emptyMessage={t('dashboard.events.table.emptyMessage')}
        headerSlot={
          <EventFilterSection
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
        title={t('dashboard.events.deleteConfirm.title')}
        message={
          <>
            {t('dashboard.events.deleteConfirm.message')}
            <br />
            <span className="text-foreground mt-2 block text-lg font-bold">{eventToDelete?.name}</span>
          </>
        }
        confirmLabel={t('public.confirmDeleteText')}
        cancelLabel={t('public.cancelText')}
      />
    </div>
  )
}

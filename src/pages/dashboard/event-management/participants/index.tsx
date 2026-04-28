import { DataTable } from '@/components/ui/data-table'
import type { EventParticipant } from '@/types/event'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getParticipantColumns } from './columns'
import { ParticipantFilterSection } from './filter'

interface ParticipantsTableProps {
  participants: EventParticipant[]
}

export function ParticipantsTable({ participants }: ParticipantsTableProps) {
  const { t } = useTranslation()
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo(() => getParticipantColumns(t), [t])

  const table = useReactTable({
    data: participants,
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
    <DataTable
      table={table}
      columns={columns}
      skeletonRows={10}
      emptyMessage={t('dashboard.participants.emptyMessage')}
      headerSlot={
        <ParticipantFilterSection
          t={t}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          totalCount={participants.length}
        />
      }
    />
  )
}

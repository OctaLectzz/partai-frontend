import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import type { EventParticipant } from '@/types/event-participant'
import { formatDateTime } from '@/utils/format'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState
} from '@tanstack/react-table'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Columns
function getCheckinColumns(t: (key: string) => string): ColumnDef<EventParticipant, unknown>[] {
  return [
    {
      accessorKey: 'participant_code',
      header: () => t('dashboard.qrCheckin.participantTable.code'),
      cell: ({ row }) => <span className="font-mono text-xs font-semibold text-foreground">{row.original.participant_code}</span>
    },
    {
      accessorKey: 'massa.full_name',
      header: () => t('dashboard.qrCheckin.participantTable.name'),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{row.original.massa?.full_name || '-'}</span>
        </div>
      ),
      filterFn: (row, _columnId, filterValue: string) => {
        const name = row.original.massa?.full_name?.toLowerCase() || ''
        const code = row.original.participant_code?.toLowerCase() || ''
        const q = filterValue.toLowerCase()
        return name.includes(q) || code.includes(q)
      }
    },
    {
      accessorKey: 'massa.nik',
      header: () => t('dashboard.qrCheckin.participantTable.nik'),
      cell: ({ row }) => <span className="font-mono text-xs text-muted">{row.original.massa?.nik || '-'}</span>
    },
    {
      accessorKey: 'status',
      header: () => t('dashboard.qrCheckin.participantTable.status'),
      cell: ({ row }) => {
        const status = row.original.status
        const variant: BadgeVariant = status === 'attended' ? 'success' : 'slate'
        const label =
          status === 'attended' ? t('dashboard.qrCheckin.participantTable.attended') : t('dashboard.qrCheckin.participantTable.registered')

        return <Badge variant={variant}>{label}</Badge>
      },
      filterFn: (row, _columnId, filterValue: string) => {
        if (!filterValue || filterValue === 'all') return true
        return row.original.status === filterValue
      }
    },
    {
      accessorKey: 'attended_at',
      header: () => t('dashboard.qrCheckin.participantTable.checkedInAt'),
      cell: ({ row }) => {
        const attendedAt = row.original.attended_at
        if (!attendedAt) {
          return <span className="text-xs text-muted italic">{t('dashboard.qrCheckin.participantTable.notCheckedIn')}</span>
        }
        return <span className="text-sm text-foreground">{formatDateTime(attendedAt)}</span>
      }
    }
  ]
}

// Filter Section
interface FilterSectionProps {
  t: (key: string) => string
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  totalCount: number
  attendedCount: number
}

function CheckinFilterSection({
  t,
  globalFilter,
  onGlobalFilterChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  attendedCount
}: FilterSectionProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">{t('dashboard.qrCheckin.participantTable.title')}</h2>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {t('dashboard.qrCheckin.participantTable.liveIndicator')}
            </span>
          </div>
          <p className="text-sm text-muted">
            {t('dashboard.qrCheckin.participantTable.subtitle')} ({attendedCount}/{totalCount})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="cursor-pointer rounded-xl border border-card-border bg-card px-3 py-3.5 text-sm transition-colors outline-none hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">{t('dashboard.qrCheckin.participantTable.allStatus')}</option>
          <option value="attended">{t('dashboard.qrCheckin.participantTable.attended')}</option>
          <option value="registered">{t('dashboard.qrCheckin.participantTable.registered')}</option>
        </select>

        {/* Search */}
        <div className="w-64">
          <Input
            icon={<Search size={16} />}
            placeholder={t('dashboard.qrCheckin.participantTable.searchPlaceholder')}
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Main Table Component
interface CheckinParticipantTableProps {
  participants: EventParticipant[]
  isLoading?: boolean
}

export function CheckinParticipantTable({ participants, isLoading = false }: CheckinParticipantTableProps) {
  const { t } = useTranslation()
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [statusFilter, setStatusFilter] = useState('all')

  const columns = useMemo(() => getCheckinColumns(t), [t])

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    if (value === 'all') {
      setColumnFilters((prev) => prev.filter((f) => f.id !== 'status'))
    } else {
      setColumnFilters((prev) => {
        const others = prev.filter((f) => f.id !== 'status')
        return [...others, { id: 'status', value }]
      })
    }
  }

  const attendedCount = participants.filter((p) => p.status === 'attended').length

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
      isLoading={isLoading}
      skeletonRows={10}
      emptyMessage={t('dashboard.qrCheckin.participantTable.emptyMessage')}
      headerSlot={
        <CheckinFilterSection
          t={t}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          totalCount={participants.length}
          attendedCount={attendedCount}
        />
      }
    />
  )
}

import { Button } from '@/components/ui/button'
import { LongText } from '@/components/ui/long-text'
import type { Event } from '@/types/event'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Calendar, Edit, Eye, MapPin, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const columnHelper = createColumnHelper<Event>()

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-slate-200 text-slate-700',
  published: 'bg-blue-500 text-white shadow-sm shadow-blue-500/20',
  completed: 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20',
  cancelled: 'bg-red-500 text-white shadow-sm shadow-red-500/20'
}

export const getColumns = (t: TFunction, onDelete: (slug: string, name: string) => void) => [
  columnHelper.accessor('name', {
    header: () => t('dashboard.events.table.headers.event'),
    cell: (info) => (
      <div className="flex flex-col gap-0.5">
        <LongText align="left" className="text-foreground w-48 font-bold">
          {info.getValue()}
        </LongText>
        {info.row.original.description && (
          <LongText align="left" className="text-muted mt-0.5 w-48 text-xs">
            {info.row.original.description}
          </LongText>
        )}
      </div>
    )
  }),
  columnHelper.accessor('start_date', {
    header: () => t('dashboard.events.table.headers.dateTime'),
    cell: (info) => (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Calendar className="text-muted h-4 w-4" />
        <div>
          <p className="text-foreground">{info.getValue()}</p>
          <p className="text-muted text-xs">{info.row.original.start_time}</p>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('location', {
    header: () => t('dashboard.events.table.headers.location'),
    cell: (info) => (
      <div className="flex items-start gap-2">
        <MapPin className="text-muted mt-0.5 h-4 w-4 shrink-0" />
        <LongText align="left" className="w-42 text-sm">
          {info.getValue() || ''}
        </LongText>
      </div>
    )
  }),
  columnHelper.accessor('organizer', {
    header: () => t('dashboard.events.table.headers.organizer'),
    cell: (info) => <span>{info.getValue()}</span>
  }),
  columnHelper.accessor('participants_count', {
    header: () => t('dashboard.events.table.headers.participants'),
    cell: (info) => {
      const event = info.row.original
      const count = info.getValue() || 0
      const target = event.target_participants
      const pct = target ? Math.min(100, Math.round((count / target) * 100)) : 0

      return (
        <div className="flex flex-col gap-1.5">
          <span className="text-foreground font-semibold">
            {count} / {target || '-'}
          </span>
          {target && (
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
              <div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
      )
    }
  }),
  columnHelper.accessor('status', {
    header: () => <span className="block text-center">{t('dashboard.events.table.headers.status')}</span>,
    filterFn: 'arrIncludesSome',
    cell: (info) => {
      const status = info.getValue()
      return (
        <div className="text-center">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[status] || 'bg-slate-200 text-slate-600'}`}
          >
            {t(`dashboard.events.status.${status}`)}
          </span>
        </div>
      )
    }
  }),
  columnHelper.accessor('category_id', {
    id: 'category_id',
    header: () => null,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.length) return true
      const value = row.getValue(columnId)
      return filterValue.includes(String(value))
    },
    cell: () => null
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="block text-center">{t('dashboard.events.table.headers.actions')}</span>,
    cell: (info) => (
      <div className="flex items-center justify-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
          icon={<Eye className="h-4 w-4" />}
        />

        <Link to={`/dashboard/events/${info.row.original.slug}/edit`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
            icon={<Edit className="h-4 w-4" />}
          />
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(info.row.original.slug, info.row.original.name)}
          className="h-9 w-9 p-0 text-slate-400 hover:bg-red-50 hover:text-red-600"
          icon={<Trash2 className="h-4 w-4" />}
        />
      </div>
    )
  })
]

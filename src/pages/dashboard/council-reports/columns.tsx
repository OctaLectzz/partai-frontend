import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LongText } from '@/components/ui/long-text'
import type { CouncilReport } from '@/types/council-report'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Calendar, Edit, Eye, ImageIcon, MapPin, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const columnHelper = createColumnHelper<CouncilReport>()

const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  draft: 'slate',
  submitted: 'info',
  approved: 'success',
  rejected: 'danger'
}

const REPORT_TYPE_VARIANTS: Record<string, BadgeVariant> = {
  meeting: 'primary',
  visit: 'info',
  socialization: 'success',
  supervision: 'warning',
  aspiration: 'outline',
  other: 'slate'
}

export const getColumns = (t: TFunction, onDelete: (id: number, title: string) => void) => [
  columnHelper.accessor('title', {
    header: () => t('dashboard.councilReport.table.title'),
    cell: (info) => (
      <div className="flex flex-col gap-0.5">
        <LongText align="left" className="w-48 font-bold text-foreground">
          {info.getValue()}
        </LongText>
        {info.row.original.description && (
          <LongText align="left" className="mt-0.5 w-48 text-xs text-muted">
            {info.row.original.description}
          </LongText>
        )}
      </div>
    )
  }),
  columnHelper.accessor('report_type', {
    header: () => t('dashboard.councilReport.table.reportType'),
    filterFn: 'arrIncludesSome',
    cell: (info) => {
      const type = info.getValue()
      return <Badge variant={REPORT_TYPE_VARIANTS[type] || 'slate'}>{t(`dashboard.councilReport.reportType.${type}`)}</Badge>
    }
  }),
  columnHelper.accessor('activity_date', {
    header: () => t('dashboard.councilReport.table.activityDate'),
    cell: (info) => (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Calendar className="h-4 w-4 text-muted" />
        <div>
          <p className="text-foreground">{info.getValue()}</p>
          {info.row.original.start_time && <p className="text-xs text-muted">{info.row.original.start_time}</p>}
        </div>
      </div>
    )
  }),
  columnHelper.accessor('location', {
    header: () => t('dashboard.councilReport.table.location'),
    cell: (info) => (
      <div className="flex items-start gap-2">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
        <LongText align="left" className="w-36 text-sm">
          {info.getValue() || ''}
        </LongText>
      </div>
    )
  }),
  columnHelper.accessor('media_count', {
    header: () => <span className="block text-center">{t('dashboard.councilReport.table.media')}</span>,
    cell: (info) => (
      <div className="flex items-center justify-center gap-1.5">
        <ImageIcon className="h-4 w-4 text-muted" />
        <span className="font-semibold text-foreground">{info.getValue() || 0}</span>
      </div>
    )
  }),
  columnHelper.accessor('status', {
    header: () => <span className="block text-center">{t('dashboard.councilReport.table.status')}</span>,
    filterFn: 'arrIncludesSome',
    cell: (info) => {
      const status = info.getValue()
      return (
        <div className="text-center">
          <Badge variant={STATUS_VARIANTS[status] || 'slate'}>{t(`dashboard.councilReport.status.${status}`)}</Badge>
        </div>
      )
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="block text-center">{t('dashboard.councilReport.table.actions')}</span>,
    cell: (info) => (
      <div className="flex items-center justify-center gap-1">
        <Link to={`/dashboard/council-activity-reports/show/${info.row.original.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
            icon={<Eye className="h-4 w-4" />}
          />
        </Link>

        <Link to={`/dashboard/council-activity-reports/edit/${info.row.original.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/30 dark:hover:text-amber-400"
            icon={<Edit className="h-4 w-4" />}
          />
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(info.row.original.id, info.row.original.title)}
          className="h-9 w-9 p-0 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          icon={<Trash2 className="h-4 w-4" />}
        />
      </div>
    )
  })
]

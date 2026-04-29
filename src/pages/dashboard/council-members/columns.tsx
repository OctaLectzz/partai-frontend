import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LongText } from '@/components/ui/long-text'
import type { Council } from '@/types/council'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const columnHelper = createColumnHelper<Council>()

export const getColumns = (t: TFunction, onDelete: (id: number, name: string) => void) => [
  columnHelper.accessor('nik', {
    header: () => t('dashboard.council.form.nikLabel'),
    cell: (info) => <span className="font-semibold">{info.getValue() || '-'}</span>
  }),
  columnHelper.accessor('name', {
    header: () => t('dashboard.council.form.nameLabel'),
    cell: (info) => (
      <div className="flex flex-col">
        <LongText align="left" className="text-foreground w-48 font-bold">
          {info.getValue()}
        </LongText>
        <span className="text-muted text-xs">{info.row.original.profession || '-'}</span>
      </div>
    )
  }),
  columnHelper.accessor('kta_number', {
    header: () => t('dashboard.council.form.ktaNumberLabel'),
    cell: (info) => <span>{info.getValue() || '-'}</span>
  }),
  columnHelper.accessor('phone_number', {
    header: () => t('dashboard.council.form.phoneNumberLabel'),
    cell: (info) => <span>{info.getValue() || '-'}</span>
  }),
  columnHelper.accessor('gender', {
    header: () => <span className="block text-center">{t('dashboard.council.form.genderLabel')}</span>,
    enableGlobalFilter: false,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true
      return filterValue.includes(row.getValue(columnId))
    },
    cell: (info) => (
      <div className="text-center">
        <span className="text-foreground text-sm font-medium">
          {info.getValue() === 'M' ? t('public.gender.male') : info.getValue() === 'F' ? t('public.gender.female') : '-'}
        </span>
      </div>
    )
  }),
  columnHelper.accessor('status', {
    header: () => <span className="block text-center">{t('dashboard.council.form.statusLabel')}</span>,
    enableGlobalFilter: false,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true
      return filterValue.includes(row.getValue(columnId))
    },
    cell: (info) => {
      const status = info.getValue()
      return (
        <div className="text-center">
          <Badge variant={status ? 'success' : 'slate'}>{status ? t('public.status.active') : t('public.status.inactive')}</Badge>
        </div>
      )
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="block text-center">{t('dashboard.council.actions')}</span>,
    enableGlobalFilter: false,
    cell: (info) => (
      <div className="flex items-center justify-center gap-1">
        <Link to={`/dashboard/council-members/show/${info.row.original.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
            icon={<Eye className="h-4 w-4" />}
          />
        </Link>
        <Link to={`/dashboard/council-members/edit/${info.row.original.id}`}>
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
          onClick={() => onDelete(info.row.original.id, info.row.original.name)}
          className="h-9 w-9 p-0 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          icon={<Trash2 className="h-4 w-4" />}
        />
      </div>
    )
  })
]

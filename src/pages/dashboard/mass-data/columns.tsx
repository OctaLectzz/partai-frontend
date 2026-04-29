import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Massa } from '@/types/massa'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const columnHelper = createColumnHelper<Massa>()

export const getColumns = (t: TFunction, onDelete: (id: number, name: string) => void) => [
  columnHelper.accessor('nik', {
    header: () => t('dashboard.massa.form.nikLabel'),
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>
  }),
  columnHelper.accessor('full_name', {
    header: () => t('dashboard.massa.form.fullNameLabel'),
    cell: (info) => (
      <div className="flex flex-col">
        <span className="text-foreground font-bold">{info.getValue()}</span>
        <span className="text-muted text-xs">{info.row.original.profession || '-'}</span>
      </div>
    )
  }),
  columnHelper.accessor('phone_number', {
    header: () => t('dashboard.massa.form.phoneNumberLabel'),
    cell: (info) => <span>{info.getValue()}</span>
  }),
  columnHelper.accessor('address', {
    header: () => t('dashboard.massa.form.addressLabel'),
    cell: (info) => (
      <div className="flex flex-col">
        <span className="w-48 truncate text-sm">{info.getValue()}</span>
        <span className="text-muted text-xs">
          RT {info.row.original.rt} / RW {info.row.original.rw}
        </span>
      </div>
    )
  }),
  columnHelper.accessor('gender', {
    header: () => <span className="block text-center">{t('dashboard.massa.form.genderLabel')}</span>,
    filterFn: 'arrIncludesSome',
    cell: (info) => (
      <div className="text-center">
        <span className="text-foreground text-sm font-medium">{info.getValue() === 'M' ? t('public.gender.male') : t('public.gender.female')}</span>
      </div>
    )
  }),
  columnHelper.accessor('status', {
    header: () => <span className="block text-center">{t('dashboard.massa.form.statusLabel')}</span>,
    filterFn: 'arrIncludesSome',
    cell: (info) => {
      const status = info.getValue()
      return (
        <div className="text-center">
          <Badge variant={status === 'active' ? 'success' : 'slate'}>{t(`public.status.${status}`)}</Badge>
        </div>
      )
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="block text-center">{t('dashboard.massa.actions')}</span>,
    cell: (info) => (
      <div className="flex items-center justify-center gap-1">
        <Link to={`/dashboard/mass-data/show/${info.row.original.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
            icon={<Eye className="h-4 w-4" />}
          />
        </Link>
        <Link to={`/dashboard/mass-data/edit/${info.row.original.id}`}>
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
          onClick={() => onDelete(info.row.original.id, info.row.original.full_name)}
          className="h-9 w-9 p-0 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          icon={<Trash2 className="h-4 w-4" />}
        />
      </div>
    )
  })
]

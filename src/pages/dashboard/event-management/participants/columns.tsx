import { LongText } from '@/components/ui/long-text'
import type { EventParticipant } from '@/types/event'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'

const columnHelper = createColumnHelper<EventParticipant>()

const PARTICIPANT_STATUS_COLORS: Record<string, string> = {
  registered: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  attended: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
}

export const getParticipantColumns = (t: TFunction) => [
  columnHelper.accessor('participant_code', {
    header: () => t('dashboard.participants.code'),
    cell: (info) => <span className="text-primary font-mono text-xs font-semibold">{info.getValue()}</span>
  }),
  columnHelper.accessor('name', {
    header: () => t('dashboard.participants.name'),
    cell: (info) => (
      <LongText align="left" className="text-foreground w-44 font-semibold">
        {info.getValue()}
      </LongText>
    )
  }),
  columnHelper.accessor('nik', {
    header: () => t('dashboard.participants.nik'),
    cell: (info) => <span className="text-muted font-mono text-xs">{info.getValue()}</span>
  }),
  columnHelper.accessor('email', {
    header: () => t('dashboard.participants.email'),
    cell: (info) => (
      <LongText align="left" className="text-muted w-44 text-sm">
        {info.getValue()}
      </LongText>
    )
  }),
  columnHelper.accessor('whatsapp_number', {
    header: () => t('dashboard.participants.whatsapp'),
    cell: (info) => <span className="text-muted text-sm">{info.getValue()}</span>
  }),
  columnHelper.accessor('created_at', {
    header: () => t('dashboard.participants.registeredAt'),
    cell: (info) => {
      const date = new Date(info.getValue())
      return (
        <div className="text-muted text-sm whitespace-nowrap">
          <p>{date.toLocaleDateString('id-ID')}</p>
          <p className="text-xs">{date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      )
    }
  }),
  columnHelper.accessor('status', {
    header: () => <span className="block text-center">{t('dashboard.participants.status')}</span>,
    filterFn: 'arrIncludesSome',
    cell: (info) => {
      const status = info.getValue()
      return (
        <div className="text-center">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
              PARTICIPANT_STATUS_COLORS[status] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            {t(`dashboard.participants.statusLabel.${status}`, { defaultValue: status })}
          </span>
        </div>
      )
    }
  })
]

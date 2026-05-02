import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LongText } from '@/components/ui/long-text'
import { useDownloadParticipantTicket } from '@/hooks/use-event-participant'
import type { EventParticipant } from '@/types/event-participant'
import { formatDateTime } from '@/utils/format'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Download, Loader2 } from 'lucide-react'

const columnHelper = createColumnHelper<EventParticipant>()

const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  registered: 'info',
  attended: 'success'
}

const DownloadTicketAction = ({ participantCode }: { participantCode: string }) => {
  const { mutate: download, isPending } = useDownloadParticipantTicket()

  return (
    <div className="flex justify-center">
      <Button
        variant="ghost"
        className="h-10 w-10 p-0 text-slate-400 hover:bg-primary hover:text-primary dark:hover:bg-primary/30 dark:hover:text-primary"
        onClick={() => download(participantCode)}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export const getParticipantColumns = (t: TFunction) => [
  columnHelper.accessor('participant_code', {
    header: () => t('dashboard.participants.code'),
    cell: (info) => <span className="font-mono text-xs font-semibold text-primary">{info.getValue()}</span>
  }),
  columnHelper.display({
    id: 'massa_info',
    header: () => t('dashboard.participants.name'),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <LongText align="left" className="w-48 font-semibold text-foreground">
          {row.original.massa?.full_name ?? '-'}
        </LongText>
        <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">{row.original.massa?.nik ?? '-'}</span>
      </div>
    )
  }),
  columnHelper.display({
    id: 'contact_info',
    header: () => t('dashboard.participants.email'),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <LongText align="left" className="text-muted-foreground w-48 text-sm">
          {row.original.massa?.email ?? '-'}
        </LongText>
        <span className="text-muted-foreground/80 text-xs font-medium">{row.original.massa?.phone_number ?? '-'}</span>
      </div>
    )
  }),
  columnHelper.accessor('status', {
    header: () => <span className="block text-center">{t('dashboard.participants.status')}</span>,
    filterFn: 'arrIncludesSome',
    cell: (info) => {
      const status = info.getValue()
      return (
        <div className="text-center">
          <Badge variant={STATUS_VARIANTS[status] || 'slate'}>{t(`dashboard.participants.statusLabel.${status}`, { defaultValue: status })}</Badge>
        </div>
      )
    }
  }),
  columnHelper.accessor('attended_at', {
    header: () => t('dashboard.participants.attendance'),
    cell: (info) => {
      const val = info.getValue()
      if (!val) return <span className="text-muted-foreground/50 px-2 text-sm italic">{t('dashboard.participants.notYet')}</span>

      return (
        <div className="text-muted-foreground px-2 text-sm whitespace-nowrap">
          <p className="font-medium">{formatDateTime(val)}</p>
        </div>
      )
    }
  }),
  columnHelper.accessor('created_at', {
    header: () => t('dashboard.participants.registeredAt'),
    cell: (info) => {
      return (
        <div className="text-muted-foreground text-sm whitespace-nowrap">
          <p className="font-medium">{formatDateTime(info.getValue())}</p>
        </div>
      )
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="block text-center">{t('dashboard.participants.actions')}</span>,
    cell: ({ row }) => <DownloadTicketAction participantCode={row.original.participant_code} />
  })
]

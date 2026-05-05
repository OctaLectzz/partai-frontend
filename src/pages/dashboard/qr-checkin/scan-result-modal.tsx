import { Avatar } from '@/components/ui/avatar'
import { Modal } from '@/components/ui/modal'
import type { EventParticipant } from '@/types/event-participant'
import { formatDateTime } from '@/utils/format'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ScanResultModalProps {
  isOpen: boolean
  onClose: () => void
  status: 'success' | 'error'
  message?: string
  participant?: EventParticipant
}

export function ScanResultModal({ isOpen, onClose, status, message, participant }: ScanResultModalProps) {
  const { t } = useTranslation()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={status === 'success' ? t('dashboard.qrCheckin.modal.successTitle') : t('dashboard.qrCheckin.modal.errorTitle')}
    >
      {status === 'success' && participant && (
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <CheckCircle2 size={32} className="text-emerald-500" />
          </div>
          <h3 className="text-center text-xl font-bold text-foreground">
            {message ? t(message, { name: participant.massa?.full_name }) : t('dashboard.qrCheckin.modal.successMessage')}
          </h3>

          <div className="mt-4 w-full rounded-xl border border-card-border bg-gray-50 p-4 dark:bg-gray-800/50">
            <div className="flex items-center gap-4">
              <Avatar
                photo={participant.massa?.photo}
                name={participant.massa?.full_name}
                size="lg"
                className="h-16 w-16 border-2 border-emerald-500"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">{participant.massa?.full_name}</span>
                <span className="text-sm text-muted">{participant.massa?.nik}</span>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <div>
                <div className="text-xs text-muted uppercase">{t('dashboard.qrCheckin.modal.participantCode')}</div>
                <div className="font-medium text-foreground">{participant.participant_code}</div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">{t('dashboard.qrCheckin.modal.checkedInAt')}</div>
                <div className="font-medium text-foreground">{participant.attended_at ? formatDateTime(participant.attended_at) : '-'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <XCircle size={40} className="text-red-500" />
          </div>
          <h3 className="mt-2 text-xl font-bold text-foreground">{t('dashboard.qrCheckin.modal.errorTitle')}</h3>
          <p className="text-muted">{message ? t(message) : t('dashboard.events.response.failedScanMsg')}</p>

          {participant && (
            <div className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 p-4 text-left dark:border-red-900/30 dark:bg-red-900/10">
              <div className="flex items-center gap-3">
                <Avatar photo={participant.massa?.photo} name={participant.massa?.full_name} size="md" />
                <div className="flex flex-col">
                  <div className="font-medium text-foreground">{participant.massa?.full_name}</div>
                  <div className="text-sm text-muted">{participant.participant_code}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

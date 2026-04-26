import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ConfirmLogoutProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isPending?: boolean
}

export function ConfirmLogout({ isOpen, onClose, onConfirm, isPending }: ConfirmLogoutProps) {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('dashboard.logoutConfirm.title')}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10">
          <LogOut size={32} />
        </div>

        <p className="mb-8 text-gray-500 dark:text-gray-400">
          {t('dashboard.logoutConfirm.message')}
        </p>

        <div className="flex w-full gap-3">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            onClick={onClose}
            disabled={isPending}
          >
            {t('dashboard.logoutConfirm.cancel')}
          </Button>

          <Button
            variant="primary"
            className="flex-1 cursor-pointer border-none bg-red-600! text-white! shadow-lg shadow-red-500/20 hover:bg-red-700!"
            onClick={onConfirm}
            disabled={isPending}
          >
            {t('dashboard.logoutConfirm.confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { useCouncils } from '@/hooks/use-council'
import type { Council } from '@/types/council'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CouncilSelectorProps {
  onSelect: (council: Council) => void
  isOpen: boolean
  onClose: () => void
}

export function CouncilSelector({ onSelect, isOpen, onClose }: CouncilSelectorProps) {
  const { t } = useTranslation()
  const { data: councils, isLoading } = useCouncils()
  const [search, setSearch] = useState('')

  const filteredCouncils = councils?.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.nik.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('dashboard.kta.selector.title')} className="max-w-2xl">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            placeholder={t('dashboard.kta.selector.searchPlaceholder')}
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="text-muted h-4 w-4" />}
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="p-4 text-center">{t('public.loadingText')}</div>
          ) : filteredCouncils?.length === 0 ? (
            <div className="text-muted-foreground p-4 text-center">{t('public.noData')}</div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredCouncils?.map((council) => (
                <div
                  key={council.id}
                  onClick={() => {
                    onSelect(council)
                    onClose()
                  }}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-lg border p-3 text-left transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelect(council)
                      onClose()
                    }
                  }}
                >
                  <Avatar name={council.name} photo={council.photo} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{council.name}</p>
                    <p className="text-muted-foreground text-xs">{council.nik}</p>
                  </div>
                  <Button size="sm" type="button" tabIndex={-1}>
                    {t('public.select')}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

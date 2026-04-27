import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { Copy, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

interface CopyableLinkFieldProps {
  link: string
  className?: string
  variant?: 'amber' | 'blue' | 'default'
}

export function CopyableLinkField({ link, variant = 'default' }: CopyableLinkFieldProps) {
  const { t } = useTranslation()

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    toast.success(t('public.copySuccess'))
  }

  const variantStyles = {
    amber: 'hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/30 dark:hover:text-amber-400',
    blue: 'hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-400',
    default: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100'
  }

  const currentStyles = variantStyles[variant]

  return (
    <div className="flex items-center gap-2">
      <div className="bg-card border-card-border text-muted flex-1 truncate rounded-lg border px-3 py-2.5 text-xs font-medium">{link}</div>
      <div className="flex shrink-0 gap-1">
        <Tooltip content={t('public.copyTooltip')}>
          <Button variant="ghost" size="sm" onClick={handleCopy} className={`h-9 w-9 p-0 ${currentStyles}`} icon={<Copy size={16} />} />
        </Tooltip>
        <Tooltip content={t('public.openTooltip')}>
          <a href={link} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm" className={`h-9 w-9 p-0 ${currentStyles}`} icon={<ExternalLink size={16} />} />
          </a>
        </Tooltip>
      </div>
    </div>
  )
}

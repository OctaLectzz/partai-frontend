import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface LiveFeedItemProps {
  name: string
  code: string
  timeLabel: string
  status: string
  statusVariant?: BadgeVariant
  icon?: ReactNode
  className?: string
}

export function LiveFeedItem({ name, code, timeLabel, status, statusVariant = 'success', icon, className }: LiveFeedItemProps) {
  return (
    <div
      className={cn(
        'animate-in slide-in-from-top-2 fade-in flex items-center gap-4 rounded-xl border border-card-border bg-card p-4 transition-all duration-300',
        className
      )}
    >
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="truncate font-mono text-xs text-muted">{code}</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <Badge variant={statusVariant} className="text-[9px]">
          {status}
        </Badge>
        <span className="text-[10px] text-muted">{timeLabel}</span>
      </div>
    </div>
  )
}

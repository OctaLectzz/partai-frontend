import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface InfoListItemProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  trailing?: ReactNode
  className?: string
  onClick?: () => void
}

export function InfoListItem({ icon, title, subtitle, trailing, className = '', onClick }: InfoListItemProps) {
  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200',
        onClick && 'cursor-pointer hover:bg-card-hover',
        className
      )}
      onClick={onClick}
    >
      {icon && <div className="flex shrink-0 items-center justify-center">{icon}</div>}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        {subtitle && <p className="mt-0.5 truncate text-xs text-muted">{subtitle}</p>}
      </div>

      {trailing && <div className="shrink-0">{trailing}</div>}
    </Component>
  )
}

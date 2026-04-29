import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'slate'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'slate', className = '' }: BadgeProps) {
  const variantClasses: Record<BadgeVariant, string> = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    danger: 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400',
    info: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    outline: 'border-card-border bg-transparent text-foreground',
    slate: 'bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase transition-colors',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

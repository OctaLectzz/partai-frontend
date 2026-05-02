import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface QuickActionCardProps {
  to: string
  icon: ReactNode
  title: string
  description: string
  iconColorClass?: string
  iconBgClass?: string
  className?: string
}

export function QuickActionCard({
  to,
  icon,
  title,
  description,
  iconColorClass = 'text-primary-dark',
  iconBgClass = 'bg-primary/10',
  className = ''
}: QuickActionCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group border-card-border bg-card relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
        className
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
          iconBgClass,
          iconColorClass
        )}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-foreground text-sm font-bold">{title}</h3>
        <p className="text-muted mt-0.5 text-xs leading-relaxed">{description}</p>
      </div>

      <ArrowRight className="text-muted h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

      {/* Decorative hover gradient */}
      <div className="from-primary/5 pointer-events-none absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  )
}

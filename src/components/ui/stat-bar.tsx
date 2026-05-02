import { cn } from '@/lib/utils'

interface StatBarProps {
  label: string
  value: number
  total: number
  colorClass?: string
  bgColorClass?: string
  className?: string
}

export function StatBar({ label, value, total, colorClass = 'bg-primary', bgColorClass = 'bg-primary/10', className = '' }: StatBarProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">{value.toLocaleString()}</span>
          <span className="text-xs text-muted">({percentage}%)</span>
        </div>
      </div>
      <div className={cn('h-2 w-full overflow-hidden rounded-full', bgColorClass)}>
        <div className={cn('h-full rounded-full transition-all duration-700 ease-out', colorClass)} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

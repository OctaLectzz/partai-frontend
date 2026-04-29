import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  icon?: React.ReactNode
  borderColorClass: string
  valueColorClass: string
}

export function SummaryCard({ title, value, borderColorClass, valueColorClass, className = '', icon = undefined, ...props }: SummaryCardProps) {
  return (
    <Card
      withTopBar={false}
      className={cn(
        'group overflow-hidden rounded-2xl border-l-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
        borderColorClass,
        className
      )}
      {...props}
    >
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-muted text-xs font-bold tracking-wider uppercase">{title}</span>
            <span className={cn('text-3xl font-extrabold tracking-tight', valueColorClass)}>{value}</span>
          </div>

          {icon && (
            <div
              className={cn(
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-current/10 transition-all duration-300 group-hover:scale-110',
                valueColorClass
              )}
            >
              {icon}
            </div>
          )}
        </div>

        {/* Decorative background shape */}
        <div
          className={cn(
            'absolute -right-8 -bottom-8 h-28 w-28 rotate-45 transform bg-current opacity-[0.03] transition-transform duration-500 group-hover:rotate-90',
            valueColorClass
          )}
        />
      </CardContent>
    </Card>
  )
}

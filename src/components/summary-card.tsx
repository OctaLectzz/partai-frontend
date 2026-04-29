import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  borderColorClass: string
  valueColorClass: string
}

export function SummaryCard({ title, value, borderColorClass, valueColorClass, className = '', ...props }: SummaryCardProps) {
  return (
    <Card withTopBar={false} className={cn('overflow-hidden rounded-2xl border-l-4', borderColorClass, className)} {...props}>
      <CardContent className="p-6">
        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-muted text-xs font-bold tracking-wider uppercase">{title}</span>
          <span className={cn('text-3xl font-bold', valueColorClass)}>{value}</span>
        </div>

        {/* Decorative background shape */}
        <div className="bg-primary/5 absolute -right-6 -bottom-6 h-24 w-24 rotate-45 transform" />
      </CardContent>
    </Card>
  )
}

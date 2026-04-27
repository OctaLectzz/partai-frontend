import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  withTopBar?: boolean
  topBarColor?: string
}

export function Card({ children, className, withTopBar = true, topBarColor = 'bg-primary' }: CardProps) {
  return (
    <div className={cn('bg-card border-card-border relative overflow-hidden rounded-2xl border shadow-md', className)}>
      {withTopBar && <div className={cn('absolute top-0 left-0 h-1.5 w-full', topBarColor)} />}
      {children}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('p-8', className)}>{children}</div>
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('flex items-center justify-between px-8 pt-8 pb-4', className)}>{children}</div>
}

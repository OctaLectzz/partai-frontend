import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={cn('animate-pulse cursor-wait rounded-md bg-gray-200 dark:bg-gray-700', className)} />
}

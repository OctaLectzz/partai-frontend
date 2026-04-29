import { cn } from '@/lib/utils'
import ImagePreview from './image-preview'

interface AvatarProps {
  name?: string | null
  photo?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  enablePreview?: boolean
}

export function Avatar({ name, photo, size = 'md', className = '', enablePreview = true }: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-32 w-32 text-4xl'
  }

  return (
    <ImagePreview
      src={photo}
      alt={name || 'User'}
      initials={name || 'NA'}
      shape="round"
      aspect="1/1"
      enablePreview={enablePreview}
      className={cn(sizeClasses[size], 'shadow-primary/20 border-2 border-white shadow-sm dark:border-slate-800', className)}
    />
  )
}

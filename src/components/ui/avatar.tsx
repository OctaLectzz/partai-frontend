import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'

interface AvatarProps {
  name?: string | null
  photo?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ name, photo, size = 'md', className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  }

  return (
    <div
      className={cn(
        sizeClasses[size],
        'bg-primary shadow-primary/20 flex items-center justify-center overflow-hidden rounded-full font-bold text-gray-900 shadow-sm',
        className
      )}
    >
      {photo ? <img src={photo} alt={name || 'User'} className="h-full w-full object-cover" /> : <span>{getInitials(name)}</span>}
    </div>
  )
}

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="animate-in fade-in absolute inset-0 bg-black/40 backdrop-blur-sm duration-200" onClick={onClose} />

      {/* Content */}
      <div className={cn('animate-in fade-in zoom-in-95 bg-card relative w-full max-w-md rounded-2xl p-6 shadow-2xl duration-200', className)}>
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-foreground text-lg font-bold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-muted hover:bg-card-hover hover:text-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  )
}

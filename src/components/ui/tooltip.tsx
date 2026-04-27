import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: ReactNode
  className?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'left' | 'center' | 'right'
}

export function Tooltip({ children, content, className = '', position = 'top', align = 'center' }: TooltipProps) {
  // We use padding instead of margin to create an invisible hover bridge.
  // This extends the hoverable area so the cursor doesn't fall into a "dead zone".
  const positionStyles = {
    top: 'bottom-full pb-2',
    bottom: 'top-full pt-2',
    left: 'right-full pr-2',
    right: 'left-full pl-2'
  }[position]

  const alignmentStyles = {
    top: {
      left: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      right: 'right-0'
    },
    bottom: {
      left: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      right: 'right-0'
    },
    left: {
      left: 'top-0',
      center: 'top-1/2 -translate-y-1/2',
      right: 'bottom-0'
    },
    right: {
      left: 'top-0',
      center: 'top-1/2 -translate-y-1/2',
      right: 'bottom-0'
    }
  }[position][align]

  const arrowStyles = {
    top: {
      left: 'left-4',
      center: 'left-1/2 -translate-x-1/2',
      right: 'right-4'
    },
    bottom: {
      left: 'left-4',
      center: 'left-1/2 -translate-x-1/2',
      right: 'right-4'
    },
    left: {
      left: 'top-2',
      center: 'top-1/2 -translate-y-1/2',
      right: 'bottom-2'
    },
    right: {
      left: 'top-2',
      center: 'top-1/2 -translate-y-1/2',
      right: 'bottom-2'
    }
  }[position][align]

  const arrowBaseStyles = {
    top: 'top-full border-t-slate-900',
    bottom: 'bottom-full border-b-slate-900',
    left: 'left-full border-l-slate-900',
    right: 'right-full border-r-slate-900'
  }[position]

  return (
    <div className={cn('group relative flex', className)}>
      {children}

      {/* Invisible Wrapper handling the hover bridge via padding */}
      <div
        className={cn(
          'pointer-events-none absolute z-999 w-max max-w-[280px] opacity-0 transition-all delay-500 duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:delay-0',
          positionStyles,
          alignmentStyles
        )}
      >
        {/* Actual Visible Tooltip Box */}
        <div className="relative scale-95 transform cursor-text rounded-lg bg-slate-900 px-3 py-2 text-xs leading-relaxed wrap-break-word whitespace-normal text-white shadow-2xl transition-transform duration-200 group-hover:scale-100">
          {content}

          {/* Arrow element placed inside the visible box */}
          <div className={cn('absolute h-0 w-0 border-4 border-transparent', arrowBaseStyles, arrowStyles)} />
        </div>
      </div>
    </div>
  )
}

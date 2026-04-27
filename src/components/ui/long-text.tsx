import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

interface LongTextProps {
  children: React.ReactNode
  tooltipContent?: React.ReactNode
  className?: string
  contentClassName?: string
  align?: 'left' | 'center' | 'right'
}

export function LongText({ children, tooltipContent, className = '', contentClassName = '', align = 'center' }: LongTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isOverflown, setIsOverflown] = useState(false)

  const checkOverflow = () => {
    const el = ref.current
    if (el) {
      const overflown = el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight
      setIsOverflown(overflown)
    }
  }

  useEffect(() => {
    checkOverflow()
    const handleResize = () => checkOverflow()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [children])

  const content = (
    <div ref={ref} className={cn('block w-full cursor-text truncate', className)}>
      {children}
    </div>
  )

  // If tooltipContent is provided, we ALWAYS show the tooltip regardless of overflow
  // OR we show it if it's overflown.
  // In the Select case, if we have "Label 1, Label 2, ...", it might NOT be overflown
  // but we still want the tooltip to show the full list.
  const shouldShowTooltip = tooltipContent !== undefined || isOverflown

  if (!shouldShowTooltip) {
    return content
  }

  return (
    <Tooltip
      align={align}
      content={<div className={cn('max-w-xs leading-relaxed wrap-break-word whitespace-normal', contentClassName)}>{tooltipContent ?? children}</div>}
      className="flex w-full max-w-full min-w-0 items-center"
    >
      {content}
    </Tooltip>
  )
}

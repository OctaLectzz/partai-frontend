import { cn } from '@/lib/utils'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  description?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ error, label, description, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-foreground mb-1.5 block text-sm font-medium">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        className={cn(
          'border-card-border bg-card text-foreground placeholder-muted min-h-[120px] w-full rounded-xl border px-4 py-3.5 transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
          'focus:border-primary focus:ring-primary/20',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
          className
        )}
        {...props}
        value={'value' in props ? (props.value ?? '') : undefined}
      />

      {description && <p className="text-muted mt-1.5 text-[11px] leading-tight italic">{description}</p>}

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'
export { Textarea }

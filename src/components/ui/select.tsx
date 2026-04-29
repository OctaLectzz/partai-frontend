import { LongText } from '@/components/ui/long-text'
import { cn } from '@/lib/utils'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  value: string | string[]
  onChange: (value: any) => void
  placeholder?: string
  searchPlaceholder?: string
  noOptionsMessage?: string
  icon?: ReactNode
  className?: string
  variant?: 'default' | 'dark'
  isMultiple?: boolean
  disabled?: boolean
  label?: string
  description?: string
  error?: string
  required?: boolean
  isLoading?: boolean
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  noOptionsMessage = 'No options found',
  icon,
  className = '',
  variant = 'default',
  isMultiple = false,
  disabled = false,
  label,
  description,
  error,
  required = false,
  isLoading = false
}: SelectProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const isSelected = (val: string) => {
    if (isMultiple && Array.isArray(value)) {
      return value.some((v) => String(v) === String(val))
    }
    return String(value) === String(val)
  }

  const selectedOptions = options.filter((opt) => isSelected(opt.value))
  const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const styles = {
    default: {
      input: 'border-card-border bg-card text-foreground focus:border-primary focus:ring-primary/20',
      dropdown: 'bg-card border-card-border shadow-2xl',
      option: 'hover:bg-card-hover text-foreground',
      selected: 'bg-primary/10 text-primary font-semibold',
      icon: 'text-muted'
    },
    dark: {
      input: 'border-gray-600 bg-gray-700/50 text-white focus:border-primary focus:ring-primary/20',
      dropdown: 'bg-gray-800 border-gray-600 shadow-2xl',
      option: 'hover:bg-gray-700 text-gray-200',
      selected: 'bg-primary/20 text-primary font-semibold',
      icon: 'text-gray-400'
    }
  }[variant]

  const handleSelect = (val: string) => {
    if (disabled) return
    if (isMultiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(val) ? currentValues.filter((v) => v !== val) : [...currentValues, val]
      onChange(newValues)
    } else {
      onChange(val)
      setIsOpen(false)
      setSearch('')
    }
  }

  const renderLabel = () => {
    if (isLoading) {
      return <span className="text-muted animate-pulse">{t('public.loadingText')}</span>
    }

    if (selectedOptions.length === 0) {
      return <span className="text-muted block w-full truncate text-left">{placeholder}</span>
    }

    const fullLabel = selectedOptions.map((o) => o.label).join(', ')
    const displayLabel =
      selectedOptions.length > 2
        ? selectedOptions
            .slice(0, 2)
            .map((o) => o.label)
            .join(', ') + ', ...'
        : fullLabel

    return (
      <div className="flex w-full min-w-0 items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <LongText align="left" tooltipContent={fullLabel} className="block w-full truncate text-left">
            {displayLabel}
          </LongText>
        </div>

        {isMultiple && (
          <span className="bg-primary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white">
            {selectedOptions.length}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label className={cn('block text-sm font-medium', variant === 'dark' ? 'text-gray-300' : 'text-foreground')}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className={cn('relative w-full', isOpen ? 'z-1001' : 'z-0')} ref={containerRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            'flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-200 outline-none focus:ring-2',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            styles.input,
            isOpen ? 'ring-2' : ''
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
            {icon && <span className={cn(styles.icon, 'shrink-0')}>{icon}</span>}
            <div className="flex min-w-0 flex-1 items-center overflow-hidden">{renderLabel()}</div>
          </div>
          <ChevronDown size={18} className={cn('shrink-0 transition-transform duration-200', styles.icon, isOpen ? 'rotate-180' : '', 'ml-2')} />
        </button>

        {isOpen && (
          <div
            className={cn('absolute left-0 mt-2 w-full min-w-[200px] overflow-hidden rounded-xl border transition-all duration-200', styles.dropdown)}
          >
            <div className="border-card-border relative border-b p-2">
              <Search size={16} className="text-muted absolute top-1/2 left-4 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg bg-transparent py-2 pr-10 pl-9 text-sm outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-muted hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="max-h-60 overflow-y-auto p-1">
              <div className="text-muted mb-1 flex items-center justify-between px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
                <span>Options</span>
                <span>{filteredOptions.length}</span>
              </div>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      isSelected(option.value) ? styles.selected : styles.option
                    )}
                  >
                    <span className="truncate pr-4">{option.label}</span>
                    {isSelected(option.value) && <Check size={14} className="text-primary shrink-0" />}
                  </button>
                ))
              ) : (
                <div className="text-muted px-3 py-4 text-center text-xs">{noOptionsMessage}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {description && <p className="text-muted mt-1 text-[11px] leading-tight italic">{description}</p>}

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

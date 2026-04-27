import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, icon, children, className = '', disabled, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'

    const variantClasses = {
      primary: 'bg-primary text-gray-900 hover:bg-primary-dark active:scale-[0.98] shadow-lg shadow-primary/20',
      secondary: 'bg-gray-700 text-white hover:bg-gray-600 active:scale-[0.98]',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-gray-900 active:scale-[0.98]',
      ghost: 'text-muted hover:bg-card-hover hover:text-foreground active:scale-[0.98]',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]'
    }

    const sizeClasses = {
      sm: 'px-4 py-2.5 text-xs gap-1.5',
      md: 'px-6 py-3 text-sm gap-2',
      lg: 'px-8 py-3.5 text-sm gap-2'
    }

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }

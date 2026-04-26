import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react'

type InputVariant = 'default' | 'dark'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  error?: string
  label?: string
  variant?: InputVariant
}

const variantStyles: Record<
  InputVariant,
  { wrapper: string; input: string; icon: string; toggle: string; label: string }
> = {
  default: {
    wrapper: '',
    input:
      'border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-primary focus:ring-primary/20',
    icon: 'text-[var(--color-text-muted)]',
    toggle: 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
    label: 'text-[var(--color-text)]'
  },
  dark: {
    wrapper: '',
    input:
      'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-primary focus:ring-primary/20',
    icon: 'text-gray-400',
    toggle: 'text-gray-400 hover:text-gray-200',
    label: 'text-gray-300'
  }
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, label, variant = 'default', className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
    const styles = variantStyles[variant]

    return (
      <div className={`w-full ${styles.wrapper}`}>
        {label && (
          <label className={`mb-1.5 block text-sm font-medium ${styles.label}`}>{label}</label>
        )}
        <div className="relative">
          {icon && (
            <span
              className={`pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 ${styles.icon}`}
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            className={`w-full rounded-xl border px-4 py-3.5 transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${styles.input} ${icon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer transition-colors ${styles.toggle}`}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export { Input }

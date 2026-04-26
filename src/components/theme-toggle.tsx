import { useTheme } from '@/contexts/theme-context'
import { Monitor, Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50/50 p-1 dark:border-gray-700 dark:bg-gray-800/50">
      <button
        onClick={() => setTheme('light')}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all ${
          theme === 'light'
            ? 'text-primary-dark bg-white shadow-sm'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        title="Light Mode"
      >
        <Sun size={16} />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all ${
          theme === 'dark'
            ? 'text-primary bg-gray-700 shadow-sm'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        title="Dark Mode"
      >
        <Moon size={16} />
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all ${
          theme === 'system'
            ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        title="System Mode"
      >
        <Monitor size={16} />
      </button>
    </div>
  )
}

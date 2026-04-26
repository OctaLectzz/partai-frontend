import { useLocale } from '@/contexts/locale-context'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50/50 p-1 dark:border-gray-700 dark:bg-gray-800/50">
      <button
        onClick={() => setLocale('id')}
        className={`flex h-8 cursor-pointer items-center justify-center rounded-full px-3 text-xs font-bold transition-all ${
          locale === 'id'
            ? 'text-primary-dark dark:text-primary bg-white shadow-sm dark:bg-gray-700'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
      >
        ID
      </button>

      <button
        onClick={() => setLocale('en')}
        className={`flex h-8 cursor-pointer items-center justify-center rounded-full px-3 text-xs font-bold transition-all ${
          locale === 'en'
            ? 'text-primary-dark dark:text-primary bg-white shadow-sm dark:bg-gray-700'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  )
}

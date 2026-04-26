import i18n from '@/utils/i18n'
import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'

type Locale = 'en' | 'id'

type LocaleProviderState = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const initialState: LocaleProviderState = {
  locale: 'en',
  setLocale: () => null
}

const LocaleProviderContext = createContext<LocaleProviderState>(initialState)

export function LocaleProvider({
  children,
  defaultLocale = 'en',
  storageKey = 'lang'
}: {
  children: React.ReactNode
  defaultLocale?: Locale
  storageKey?: string
}) {
  const [locale, _setLocale] = useState<Locale>(
    () => (Cookies.get(storageKey) as Locale) || defaultLocale
  )

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    Cookies.set(storageKey, newLocale, { expires: 365 })
    _setLocale(newLocale)
  }

  const value = {
    locale,
    setLocale
  }

  return <LocaleProviderContext.Provider value={value}>{children}</LocaleProviderContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLocale = () => {
  const context = useContext(LocaleProviderContext)

  if (context === undefined) throw new Error('useLocale must be used within a LocaleProvider')

  return context
}

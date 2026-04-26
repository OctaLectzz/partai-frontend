import en from '@/locales/en'
import id from '@/locales/id'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const t = i18n.t.bind(i18n)

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id }
  },
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n

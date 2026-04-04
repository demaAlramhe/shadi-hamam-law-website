import { useLayoutEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations'
import { siteConfig } from '../config/siteConfig'
import { LanguageContext } from './languageContext'

const STORAGE_KEY = 'shadi-law-locale'

export function LanguageProvider({ children, defaultLocale = 'he' }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'he' || stored === 'ar') return stored
    } catch {
      /* ignore */
    }
    return defaultLocale
  })

  const setLocale = (next) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const value = useMemo(() => {
    const t = translations[locale] || translations.he
    return { locale, setLocale, t }
  }, [locale])

  useLayoutEffect(() => {
    document.documentElement.lang = locale === 'he' ? 'he' : 'ar'
    document.documentElement.dir = 'rtl'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', value.t.meta.description)
    document.title =
      locale === 'ar'
        ? `${siteConfig.officeNameAr} | مرافقة قانونية مهنية`
        : value.t.meta.title
  }, [locale, value.t.meta.description, value.t.meta.title])

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

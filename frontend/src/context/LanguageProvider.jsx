import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './languageContext.js'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'am'
      ? 'የሕዝብ መመሪያ — የመንግሥት አገልግሎት'
      : 'Public Service Guide — Government Services'
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.content = language === 'am'
        ? 'ስለ ኢትዮጵያ የመንግሥት አገልግሎቶች ግልጽና አስተማማኝ መመሪያ።'
        : 'Clear, reliable guidance for government services in Ethiopia.'
    }
  }, [language])

  const value = useMemo(() => ({
    language,
    toggleLanguage: () => setLanguage((current) => current === 'en' ? 'am' : 'en'),
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider

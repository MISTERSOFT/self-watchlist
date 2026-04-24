import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
// @ts-ignore
import resources from 'virtual:i18next-loader'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ['en', 'fr'],
    fallbackLng: ['en', 'fr'],
    ns: ['common', 'home'],
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    // lng: 'en',
    detection: {
      order: ['localStorage', 'sessionStorage', 'navigator'],
      lookupCookie: 'self-watchlist-lang',
      lookupLocalStorage: 'self-watchlist-lang',
      lookupSessionStorage: 'self-watchlist-lang',
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n

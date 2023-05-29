import { createI18n } from 'vue-i18n'
import { supportedLanguages } from '@/constants'

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}

const userLanguage = getUserLanguage()

const i18n = createI18n({
  locale: userLanguage || 'ru',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})

function getUserLanguage () {
  const userLang = navigator.language.substring(0, 2)
  if (supportedLanguages.includes(userLang)) {
    return userLang
  }
  return null
}

export default i18n

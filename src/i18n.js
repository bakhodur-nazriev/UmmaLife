import {createI18n} from 'vue-i18n'
import {supportedLanguages} from '@/constants'

function loadLocaleMessages() {
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

function getUserLanguage() {
	const userLang = navigator.language.substring(0, 2)
	if (supportedLanguages.includes(userLang)) {
		return userLang
	}
	return null
}

// console.log(getUserLanguage())

const i18n = createI18n({
	locale: getUserLanguage(),
	fallbackLocale: 'en',
	messages: loadLocaleMessages()
})

export default i18n

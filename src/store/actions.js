/* eslint-disable */
import axios from 'axios'

export default {
	toggleTheme({commit, state}) {
		const newTheme = state.selectedTheme === 'light' ? 'dark' : 'light'
		commit('setSelectedTheme', newTheme)
	},
	login({commit}) {
		// Логика для аутентификации пользователя
		// Установка isAuthenticated в true при успешной аутентификации
		commit('setAuthenticated', true)
	},
	logout({commit}) {
		// Логика для выхода пользователя
		// Установка isAuthenticated в false при выходе
		commit('setAuthenticated', false)
	},
	toggleChangeTabStyle({commit, state}) {
		commit('setChangeTabStyle', !state.shouldChangeTabStyle)
	},
	saveAccessToken({commit}, token) {
		commit('setAccessToken', token)
	},

	async checkEmail({commit}, email) {
		try {
			const formData = new FormData()
			formData.append('server_key', process.env.VUE_APP_SERVER_KEY)
			formData.append('email', email)

			const headers = {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'multipart/form-data',
			}

			const response = await axios.post('https://ummalife.com/api/check-email', formData, {headers})

			if (response.data.api_status === 200) {
				// Добавьте нужные мутации или действия, чтобы обработать успешный ответ от сервера
				commit('response', response.data)
			} else {
				// Обработка ошибок при неудачном ответе от сервера
				commit('HANDLE_ERROR', response.data.errors.error_text)
			}
		} catch (error) {
			console.error('Error occurred:', error)
		}
	},
}

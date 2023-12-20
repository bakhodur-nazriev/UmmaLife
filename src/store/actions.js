import axios from 'axios'
import {getFormData} from '@/utils'

export default {
	toggleTheme({commit, state}) {
		const newTheme = state.selectedTheme === 'light' ? 'dark' : 'light'
		commit('setSelectedTheme', newTheme)
	},
	login({commit}) {
		commit('setAuthenticated', true)
	},
	logout({commit}) {
		commit('setAuthenticated', false)
	},
	toggleChangeTabStyle({commit, state}) {
		commit('setChangeTabStyle', !state.shouldChangeTabStyle)
	},
	saveAccessToken({commit}, token) {
		commit('setAccessToken', token)
	},
	updateLanguage({commit}, language) {
		const payload = getFormData({
			server_key: process.env.VUE_APP_SERVER_KEY,
			language: language
		})

		const headers = {'Content-Type': 'multipart/form-data'}

		const accessToken = localStorage.getItem('access_token')
		const params = {access_token: accessToken}

		axios.post('/update-user-data', payload, {params, headers})
			.then(() => {
				commit('setLanguage', language);
			})
			.catch(error => {
				console.error('Ошибка обновления языка:', error);
			});
		commit('setLanguage', language);
	}
}

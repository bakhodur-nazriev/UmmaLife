/* eslint-disable */
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      email: '',
      phoneNumber: '',
      selectedTheme: 'light',
      isAuthenticated: false
    }
  },
  getters: {
    getEmail (state) {
      return state.email
    },
    getPhoneNumber (state) {
      return state.phoneNumber
    },
    getSelectedTheme (state) {
      return state.selectedTheme
    },
    isAuthenticated (state) {
      return state.isAuthenticated
    },
    getAuthenticated (state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    setEmail (state, email) {
      state.email = email
    },
    setPhoneNumber (state, phoneNumber) {
      state.phoneNumber = phoneNumber
    },
    setAuthenticated (state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
    setSelectedTheme (state, selectedTheme) {
      state.selectedTheme = selectedTheme
    }
  },
  actions: {
    toggleTheme ({ commit, state }) {
      const newTheme = state.selectedTheme === 'light' ? 'dark' : 'light'
      commit('setSelectedTheme', newTheme)
    },
    login({ commit }) {
      // Логика для аутентификации пользователя
      // Установка isAuthenticated в true при успешной аутентификации
      commit('setAuthenticated', true)
    },
    logout({ commit }) {
      // Логика для выхода пользователя
      // Установка isAuthenticated в false при выходе
      commit('setAuthenticated', false)
    }
  }
})
export default store

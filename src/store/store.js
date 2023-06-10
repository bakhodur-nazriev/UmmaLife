import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      email: '',
      phoneNumber: '',
      selectedTheme: 'light'
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
    }
  },
  mutations: {
    setEmail (state, email) {
      state.email = email
    },
    setPhoneNumber (state, phoneNumber) {
      state.phoneNumber = phoneNumber
    },
    setSelectedTheme (state, selectedTheme) {
      state.selectedTheme = selectedTheme
    }
  },
  actions: {
    toggleTheme ({ commit, state }) {
      const newTheme = state.selectedTheme === 'light' ? 'dark' : 'light'
      commit('setSelectedTheme', newTheme)
    }
  }
})
export default store

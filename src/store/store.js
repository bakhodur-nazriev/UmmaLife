import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      email: '',
      phoneNumber: '',
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
    }
  },
  actions: {
    login () {},
    logout () {}
  }
})
export default store

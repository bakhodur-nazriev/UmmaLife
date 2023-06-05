import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      email: '',
      phoneNumber: ''
    }
  },
  getters: {
    getEmail (state) {
      return state.email
    },
    getPhoneNumber (state) {
      return state.phoneNumber
    }
  },
  mutations: {
    setEmail (state, email) {
      state.email = email
    },
    setPhoneNumber (state, phoneNumber) {
      state.phoneNumber = phoneNumber
    }
  }
})
export default store

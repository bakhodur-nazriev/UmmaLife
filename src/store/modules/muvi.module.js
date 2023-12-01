export default {
  namespaced: true,
  state() {
    return {
      muvies: [],
      initialIndex: 0,
      from: 'feeds'
    }
  },
  mutations: {
    setMuvies(state, muvies) {
      state.muvies = muvies
    },
    setInitialIndex(state, initialIndex) {
      state.initialIndex = initialIndex
    },
    setFrom(state, from) {
      state.from = from
    }
  },
  getters: {
    getMuvies(state) {
      return state.muvies
    },
    getInitialIndex(state) {
      return state.initialIndex
    },
    getFrom(state) {
      return state.from
    }
  }
}

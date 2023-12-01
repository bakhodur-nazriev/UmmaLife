export default {
  namespaced: true,
  state() {
    return {
      muvies: [],
      initialIndex: 0
    }
  },
  mutations: {
    setMuvies(state, muvies) {
      state.muvies = muvies
    },
    setInitialIndex(state, initialIndex) {
      state.initialIndex = initialIndex
    }
  },
  getters: {
    getMuvies(state) {
      return state.muvies
    },
    getInitialIndex(state) {
      return state.initialIndex
    }
  }
}

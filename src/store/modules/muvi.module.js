export default {
  namespaced: true,
  state() {
    return {
      muvies: [],
      initialIndex: 0,
      from: 'feeds',
      playbackSpeed: 1
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
    },
    setPlaybackSpeed(state, playbackSpeed) {
      state.playbackSpeed = playbackSpeed
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
    },
    getPlaybackSpeed(state) {
      return state.playbackSpeed
    }
  }
}

export default {
  namespaced: true,
  state() {
    return {
      audios: [],
      index: -1,
      isPlayerOpen: false,
      isListOpen: false
    }
  },
  mutations: {
    setAudioPlaying(state, index) {
      state.audios.forEach((audio) => (audio.isPlaying = false))
      state.audios[index].isPlaying = true
    },
    setAudioPause(state, index) {
      state.audios[index].isPlaying = false
    },
    setIndex(state, index) {
      state.index = index
    },
    setIsPlayerOpen(state, isPlayerOpen) {
      state.isPlayerOpen = isPlayerOpen
    },
    setIsLiked(state, index) {
      state.audios[index].isLiked = !state.audios[index].isLiked
    },
    setListOpen(state, isListOpen) {
      state.isListOpen = isListOpen
    },
    setAudios(state, audios) {
      state.audios = audios
    }
  },
  actions: {
    playHandler({ commit }, index) {
      commit('setIsPlayerOpen', false)
      commit('setAudioPlaying', index)
      commit('setIndex', index)
      setTimeout(() => {
        commit('setIsPlayerOpen', true)
      }, 0)
    }
  }
}

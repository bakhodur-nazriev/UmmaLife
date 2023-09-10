export default {
  namespaced: true,
  state() {
    return {
      audios: [],
      audioIndex: -1,
      isPlayerOpen: false,
      isListOpen: false,
      isLoop: false,
      isPlaying: false
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
      state.audioIndex = index
    },
    setIsPlayerOpen(state, isPlayerOpen) {
      state.isPlayerOpen = isPlayerOpen
    },
    setIsLiked(state, id) {
      const index = state.audios.findIndex((a) => a.id === id)
      if (index !== -1) {
        state.audios[index].isLiked = !state.audios[index].isLiked
      }
    },
    setListOpen(state, isListOpen) {
      state.isListOpen = isListOpen
    },
    setAudios(state, audios) {
      state.audios = audios
    },
    addAudio(state, audio) {
      const found = state.audios.find((a) => a.id === audio.id)
      if (!found) {
        state.audios.push(audio)
      }
    },
    setIsLoop(state, isLoop) {
      state.isLoop = isLoop
    },
    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying
    }
  },
  actions: {
    playHandler({ commit }, index) {
      commit('setIsPlayerOpen', false)
      commit('setAudioPlaying', index)
      commit('setIndex', index)
      commit('setIsPlayerOpen', true)
    }
  }
}

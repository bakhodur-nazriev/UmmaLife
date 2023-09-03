import { audios } from '@/dummy.js'

export default {
  namespaced: true,
  state() {
    return {
      audios: audios,
      isPlayerOpen: false,
      chosenAudios: [],
      index: -1
    }
  },
  mutations: {
    playSingleAudio(state, audio) {
      state.chosenAudios.length = 0
      state.chosenAudios.push(audio)
      state.isPlayerOpen = true
    },
    setPlayerClose(state) {
      state.isPlayerOpen = false
      state.index = -1
    },
    setActiveIndex(state, index) {
      state.index = index
    }
  }
}

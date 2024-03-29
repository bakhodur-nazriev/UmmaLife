/* eslint-disable */
import { createStore } from 'vuex'
import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'

// Modules
import audioModule from './modules/audio.module'
import messengerModule from './modules/messenger.module'
import muviModule from './modules/muvi.module'

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    audio: audioModule,
    messenger: messengerModule,
    muvi: muviModule
  }
})
export default store

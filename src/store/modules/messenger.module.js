import { getFormData } from '@/utils'
import axios from 'axios'
/* eslint-disable */

export default {
  namespaced: true,
  state() {
    return {
      chats: [],
      chat: {},
      isLoading: true
    }
  },
  mutations: {
    setChats(state, chats) {
      state.chats = chats
    },
    setSingleChat(state, chat_id) {
      state.chat = state.chats.find((chat) => chat.chatId === chat_id)
    }
  },
  actions: {
    async getChats({ state, commit }) {
      try {
        state.isLoading = true
        const payload = getFormData({
          server_key: process.env.VUE_APP_SERVER_KEY
        })

        const { data } = await axios.post('/get-chats', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            access_token: localStorage.getItem('access_token')
          }
        })
        commit('setChats', data.data)
      } catch (err) {
        console.log(err)
      } finally {
        state.isLoading = false
      }
    }
  },
  getters: {
    getAllChats(state) {
      return state.chats
    },
    getSingleChat(state) {
      return state.chat
    }
  }
}

import { getFormData } from '@/utils'
import axios from 'axios'
/* eslint-disable */

export default {
  namespaced: true,
  state() {
    return {
      chats: [],
      chat: {},
      chatMessages: [],
      isLoading: false,
      newMessage: {},
      newMessages: []
    }
  },
  mutations: {
    setChats(state, chats) {
      state.chats = chats
    },
    setSingleChatByChatId(state, chat_id) {
      state.chat = state.chats.find((chat) => chat.chatId === chat_id)
    },
    setSingleChat(state, chat) {
      state.chat = chat
    },
    setChatMessages(state, chatMessages) {
      state.chatMessages = chatMessages
    },
    pushMessage(state, message) {
      if (Array.isArray(state?.chatMessages[0]?.block)) {
        state.chatMessages[0]?.block.push(message)
      }
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setUnreadMessages(state, newMessages) {
      state.newMessages = newMessages
    },
    setNewMessages(state, data) {
      const index = state.newMessages.findIndex((message) => message.chatid === data.chatid)
      if (index === -1) {
        state.newMessages.push(data)
      } else {
        state.newMessages[index] = data
      }

      localStorage.setItem('newMessages', JSON.stringify(state.newMessages))
    },
    clearNewMessage(state, message) {
      state.newMessages = state.newMessages.filter((m) => m.chatId !== message.chatId)
      localStorage.setItem('newMessages', JSON.stringify(state.newMessages))
    }
  },
  actions: {
    async getChats({ commit }) {
      try {
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
      }
    },
    async getChatMessages({ state, commit }, chat_id) {
      try {
        const payload = getFormData({
          server_key: process.env.VUE_APP_SERVER_KEY,
          chat_id,
          chat_type: 'user'
        })

        const { data } = await axios.post('/get-chat-messages', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            access_token: localStorage.getItem('access_token')
          }
        })

        commit('setChatMessages', data.data)
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
    },
    getRoomChatMessages(state) {
      return state.chatMessages
    },
    getIsLoading(state) {
      return state.isLoading
    }
  }
}

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
      chatIsLoading: false,
      countElements: 0,
      isScrolling: false
    }
  },
  mutations: {
    setIsScrolling(state, isScrolling) {
      state.isScrolling = isScrolling
    },
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
      if (
        state?.chatMessages.length > 0 &&
        Array.isArray(state?.chatMessages[state?.chatMessages.length - 1]?.block)
      ) {
        state.chatMessages[state?.chatMessages.length - 1]?.block.push(message)
      }
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setChatIsLoading(state, chatIsLoading) {
      state.chatIsLoading = chatIsLoading
    },
    setCountElements(state, countElements) {
      state.countElements = countElements
    },
    setIsTyping(state, chat) {
      const index = state.chats.findIndex((ch) => ch?.chatId === chat?.chatId)
      state.chats[index].isTyping = chat.isTyping
      if (state.chat.chatId === chat.chatId) {
        state.chat.isTyping = chat.isTyping
      }
    },
    setUserLastSeen(state, chat) {
      const index = state.chats.findIndex((ch) => ch?.chatId === chat?.chatId)
      state.chats[index].userLastSeen = chat.userLastSeen
      if (state.chat.chatId === chat.chatId) {
        state.chat.userLastSeen = chat.userLastSeen
      }
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
    async getChatMessages({ state, commit }, { chat_id, direction, page }) {
      try {
        const payload = getFormData({
          server_key: process.env.VUE_APP_SERVER_KEY,
          chat_id,
          chat_type: 'user',
          page,
          direction,
          limit: 20
        })

        const { data } = await axios.post('/get-chat-messages', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            access_token: localStorage.getItem('access_token')
          }
        })
        if (direction === 'down') {
          state.chatMessages = data.data
        } else {
          state.chatMessages.unshift(...data.data)
        }
        commit('setChatMessages', state.chatMessages)
        commit('setCountElements', data.countElements)
      } catch (err) {
        console.log(err)
      } finally {
        state.isLoading = false
        state.chatIsLoading = false
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
    },
    getChatIsLoading(state) {
      return state.chatIsLoading
    },
    getCountElements(state) {
      return state.countElements
    },
    getIsScrolling(state) {
      return state.isScrolling
    }
  }
}

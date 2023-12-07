import { getFormData, convertDate } from '@/utils'
import axios from 'axios'
/* eslint-disable */

export default {
  namespaced: true,
  state() {
    return {
      chats: [],
      chat: {},
      chatMessages: []
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
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const messageToPush = {
        message: message?.message,
        messageId: Date.now(),
        messageDate: convertDate(new Date()),
        messageAuthor: message.messageAuthor,
        messageAuthorId: user?.user_id,
        messageAuthorImage: message?.messageAuthorImage,
        messageType: 'text',
        messageSeen: false,
        messageOwner: true,
        messageEdited: false,
        mediaData: [],
        mentionUsers: [],
        fetchUrlData: [],
        replyMessage: null
      }
      if (Array.isArray(state?.chatMessages[0]?.block)) {
        state.chatMessages[0]?.block.push(messageToPush)
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
    async getChatMessages({ commit }, chat_id) {
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
    }
  }
}

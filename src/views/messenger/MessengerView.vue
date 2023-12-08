<template>
  <div class="messenger" v-if="getters['messenger/getAllChats'].length > 0">
    <div class="messenger__wrapper">
      <MessangerNavigation :chats="getters['messenger/getAllChats']" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MessangerNavigation from '@/components/messanger/MessangerNavigation.vue'
import { useStore } from 'vuex'
import io from 'socket.io-client'
import { useRoute } from 'vue-router'
import store from '../../store/store'
const { getters, dispatch, commit } = useStore()

const route = useRoute()
const socket = io(`${process.env.VUE_APP_SOCKET_URL}`, {
  query: {
    hash: localStorage.getItem('hash')
  }
})
socket.emit('join', { user_id: localStorage.getItem('access_token') })

socket.on('on_new_message_chatroom', (data) => {
  commit('messenger/setNewMessages', data)
  dispatch('messenger/getChats')
  if (route.params?.id) {
    commit('messenger/setSingleChatByChatId', +route.params?.id)
    dispatch('messenger/getChatMessages', route.params?.id)
  }
})

dispatch('messenger/getChats')
onMounted(() => {
  commit('messenger/setUnreadMessages', JSON.parse(localStorage.getItem('newMessages') || '[]'))
})
</script>

<style scoped lang="scss">
.messenger {
  max-width: 1651px;
  width: 100%;
  padding: 16px;
  height: 100%;

  &__wrapper {
    display: grid;
    gap: 16px;
    grid-template-columns: 480px 1fr;
    height: 100%;
  }
}
</style>

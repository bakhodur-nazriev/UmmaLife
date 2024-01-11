<template>
  <div
    class="messenger"
    v-if="getters['messenger/getAllChats'].length > 0"
    :class="{ 'messenger-detail': route.params?.id }"
  >
    <div class="messenger__wrapper">
      <MessangerNavigation :chats="getters['messenger/getAllChats']" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import MessangerNavigation from '@/components/messanger/MessangerNavigation.vue'
import { useStore } from 'vuex'
import io from 'socket.io-client'
import { useRoute } from 'vue-router'
import { sleep } from '@/utils'

const { getters, dispatch, commit } = useStore()
const route = useRoute()

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
  query: {
    hash: localStorage.getItem('hash')
  }
})
socket.emit('join', { user_id: localStorage.getItem('access_token') })

socket.on('on_new_message_chatroom', async (data) => {
  console.log('on_new_message_chatroom')
  storeOrUpdateData(data)
  dispatch('messenger/getChats')
  if (+route.params?.id === data?.chatId) {
    commit('messenger/setIsScrolling', true)
    commit('messenger/setSingleChatByChatId', +route.params?.id)
    await dispatch('messenger/getChatMessages', {
      chat_id: route.params?.id,
      page: 1,
      direction: 'down'
    })
    await sleep(2000)
    commit('messenger/setIsScrolling', false)
  }
})

socket.on('on_typing', (data) => {
  commit('messenger/setIsTyping', data)
})

socket.on('on_user_status', (data) => {
  commit('messenger/setUserLastSeen', data)
})

socket.on('on_edit_message', async (data) => {
  console.log('on_edit_message')
  await dispatch('messenger/getChatMessages', {
    chat_id: route.params?.id,
    direction: 'down',
    page: null
  })
})

socket.on('on_delete_multiple_messages', async (data) => {
  console.log('on_delete_multiple_messages')
  await dispatch('messenger/getChatMessages', {
    chat_id: route.params?.id,
    direction: 'down',
    page: null
  })
})

function storeOrUpdateData(data) {
  // Retrieve existing data from local storage
  const existingData = JSON.parse(localStorage.getItem('newMessages') || '[]')

  // Find index of the data with the same id
  const index = existingData.findIndex((item) => item.chatId === data.chatId)

  if (index === -1) {
    // If the data with the id doesn't exist, push the new data
    existingData.push(data)
  } else {
    // If the data with the id exists, update it
    existingData[index] = data
  }

  // Save the updated data back to local storage
  localStorage.setItem('newMessages', JSON.stringify(existingData))
}

dispatch('messenger/getChats')
</script>

<style scoped lang="scss">
.messenger {
  max-width: 1651px;
  width: 100%;
  padding: 16px;
  height: 100%;
  @media (max-width: 767px) {
    padding: 0;
  }

  &__wrapper {
    display: grid;
    gap: 16px;
    grid-template-columns: 480px 1fr;
    height: 100%;

    @media (max-width: 1435px) {
      grid-template-columns: 350px 1fr;
    }
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      .room__empty {
        display: none;
      }
    }
  }
}
</style>

<style lang="scss">
.messenger-detail {
  .navigation {
    @media (max-width: 767px) {
      display: none !important;
    }
  }
}
</style>

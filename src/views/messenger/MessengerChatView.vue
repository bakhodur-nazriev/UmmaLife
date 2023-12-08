<template>
  <div class="room">
    <div class="room__top">
      <div class="room__profile">
        <img :src="chat?.chatImage" :alt="chat?.chatName" class="room__profile--img" />
        <router-link to="#" class="room__profile--info">
          <div class="room__profile--name">{{ chat?.chatName }}</div>
          <div class="room__profile--account">
            {{ multiFormatDateString(chat?.userLastSeen) }}
          </div>
        </router-link>
      </div>
      <div class="room__details" @click="showDeleteDropdown = true">
        <menu-details-icon class="room__details--icon" />
      </div>
      <delete-dropdown
        @handleClickOutside="showDeleteDropdown = false"
        @handleDeleteChat="isDeleteModalOpen = true"
        v-if="showDeleteDropdown"
      />
    </div>
    <div class="room__messages">
      <div class="room__messages--inner" ref="room">
        <div v-for="block in store.getters['messenger/getRoomChatMessages']" :key="block.date">
          <div class="room__messages--date">{{ formatDate(block?.date) }}</div>
          <ChatMessage
            v-for="message in block.block"
            :message="message"
            :key="message.messageId"
            :isLoading="store.getters['messenger/getIsLoading']"
            @contextmenu.prevent="($event) => openContextMenu($event, message.messageId)"
            :isLastMessage="message === block.block[block.block.length - 1]"
          />
        </div>
      </div>
      <ContextMenu
        v-show="isContextMenuOpen"
        @open="isContextMenuOpen = true"
        @close="isContextMenuOpen = false"
        @shareMessage="shareMessage"
        @editMessage="editMessage"
        @deleteMessage="deleteMessage"
        ref="menu"
      />
    </div>
    <ChatRoomForm
      @submitHandler="submitHandler"
      :isLoading="store.getters['messenger/getIsLoading']"
    />
  </div>

  <teleport to="body">
    <delete-confirm v-if="isDeleteModalOpen" :user="user" @close="isDeleteModalOpen = false" />
  </teleport>
</template>

<script>
/* eslint-disable */
import { useRoute } from 'vue-router'
import { ref, watch, nextTick, onUpdated, onMounted } from 'vue'
import { useStore } from 'vuex'
import { timeFormat } from '@/mixins/timeFormat'
import io from 'socket.io-client'
import { convertDate } from '@/utils'

import DeleteDropdown from '@/components/messanger/dropdowns/DeleteDropdown.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import ChatRoomForm from '@/components/messanger/ChatRoomForm.vue'
import ChatMessage from '@/components/messanger/ChatMessage.vue'
import ContextMenu from '@/components/messanger/dropdowns/ContextMenu.vue'
import DeleteConfirm from '@/components/messanger/modal/DeleteConfirm.vue'

export default {
  components: {
    MenuDetailsIcon,
    ChatRoomForm,
    ChatMessage,
    DeleteDropdown,
    ContextMenu,
    DeleteConfirm
  },
  mixins: [timeFormat],
  data() {
    return {
      showDeleteDropdown: false,
      isContextMenuOpen: false,
      isDeleteModalOpen: false,
      messageId: null,
      edit: false,
      share: false
    }
  },
  computed: {
    // selectedMessage() {
    //   return this.user.messages.find((message) => message.id === this.messageId)
    // }
  },
  methods: {
    openContextMenu(e, id) {
      const target = e.target
      if (target.closest('.message__inner')) {
        this.$refs.menu.open(e)
        this.messageId = id
      }
    },
    // async submitHandler(value, type) {
    //   const index = this.users.findIndex((u) => u.id === this.user.id)
    //   if (type.state === 'noedit') {
    //     this.users[index].messages.push({
    //       id: Date.now(),
    //       message: value,
    //       status: 'notread',
    //       state: 'send'
    //     })
    //   }
    //   if (type.state === 'edit') {
    //     const messageIndex = this.users[index].messages.findIndex(
    //       (message) => message.id === type.data.id
    //     )

    //     this.users[index].messages[messageIndex].message = value
    //   }
    //   if (type.state === 'share') {
    //     this.users[index].messages.push({
    //       id: Date.now(),
    //       message: {
    //         user_name: type.data.user_name,
    //         user_message:
    //           typeof type.data.user_message === 'string'
    //             ? type.data.user_message
    //             : type.data.user_message.text,
    //         text: value
    //       },
    //       state: 'send',
    //       status: 'notread'
    //     })
    //   }
    //   this.isLoading = true
    //   this.isLoading = false
    // },
    setValue(value) {
      this.value = value
    },
    shareMessage() {
      this.clearValues()
      this.isContextMenuOpen = false
      this.share = true
    },
    editMessage() {
      this.clearValues()
      if (this.selectedMessage.state === 'send') {
        this.isContextMenuOpen = false
        this.value =
          typeof this.selectedMessage.message === 'string'
            ? this.selectedMessage.message
            : this.selectedMessage.text
        this.edit = true
      }
    },
    deleteMessage() {
      this.isDeleteModalOpen = true
      this.isContextMenuOpen = false
    }
  }
}
</script>

<script setup>
const route = useRoute()
const store = useStore()
const room = ref()
const chat = ref({})

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`, {
  query: {
    hash: localStorage.getItem('hash')
  }
})

const scrollToBottom = () => {
  nextTick(() => {
    room.value.scrollIntoView({ block: 'end', inline: 'nearest' })
  })
}
const user = JSON.parse(localStorage.getItem('user') || '{}')

const submitHandler = (textValue) => {
  const privateMessageData = {
    chatId: chat.value?.chatId,
    chatType: chat.value?.chatType,
    chatName: chat.value?.chatName,
    chatImage: chat.value?.chatImage,
    message: textValue,
    messageAuthor: user?.name,
    messageAuthorId: localStorage.getItem('access_token'),
    messageAuthorImage: user?.avatar,
    messageAuthorIsPolice: user?.is_investor,
    messageAuthorIsVerified: user?.verified === '1',
    messageAuthorIsPremium: user?.is_premium === '1',
    messageAuthorPrivacy: '0',
    mediaData: [],
    fetchUrlData: {},
    replyId: 0,
    localId: Date.now()
  }
  tempMessagePush(textValue)
  store.commit('messenger/setSingleChat', privateMessageData)
  socket.emit('private_message_umma', privateMessageData)
}

const tempMessagePush = (textValue) => {
  const messageToPush = {
    message: textValue,
    messageId: Date.now(),
    messageDate: convertDate(new Date()),
    messageAuthor: user?.name,
    messageAuthorId: user?.user_id,
    messageAuthorImage: user?.avatar,
    messageType: 'text',
    messageSeen: false,
    messageOwner: true,
    messageEdited: false,
    mediaData: [],
    mentionUsers: [],
    fetchUrlData: [],
    replyMessage: null
  }
  store.commit('messenger/setIsLoading', true)
  store.commit('messenger/pushMessage', messageToPush)
}

const getMessagesData = async () => {
  store.commit('messenger/setSingleChatByChatId', +route.params?.id)
  chat.value = store.getters['messenger/getSingleChat']
  await store.dispatch('messenger/getChatMessages', route.params?.id)
}
watch(
  () => route.params?.id,
  () => {
    getMessagesData()
  }
)
getMessagesData()
onMounted(() => {
  store.commit('messenger/clearNewMessage', chat.value)
})

onUpdated(() => {
  scrollToBottom()
  store.commit('messenger/clearNewMessage', chat.value)
})
</script>

<style lang="scss" scoped>
.room {
  border: 2px solid var(--color-white);
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }

  &__top {
    z-index: 10;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 56px 16px 16px;
    border-radius: 16px 16px 0 0;
    background-color: var(--color-white);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__profile {
    display: flex;
    align-items: center;
    gap: 16px;
    &--img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
    }
    &--info {
      text-decoration: none;
    }
    &--name {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 7px;
    }
    &--account {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-silver-chalice);
      &.online {
        color: var(--color-green);
      }
    }
  }
  &__details {
    cursor: pointer;
    display: grid;
    place-items: center;
    background-color: transparent;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    width: 42px;
    transition: all 0.3s;
    &:hover {
      background-color: var(--color-gallery-first);
    }
  }
  &__messages {
    padding: 16px 16px 0;
    flex-grow: 1;
    overflow-y: auto;
    position: relative;
    &--date {
      display: block;
      position: sticky;
      z-index: 2;
      background-color: var(--color-white);
      backdrop-filter: blur(6px);
      width: fit-content;
      margin: 0px auto 8px;
      border-radius: 10px;
      padding: 0px 8px;
      top: 4px;
      bottom: 0px;
      font-size: 12px;
      color: var(--color-mine-shaft);
      line-height: 20px;
      text-align: center;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.05);
    }
  }
}
</style>

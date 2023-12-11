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
        <LoadingBar v-if="store.getters['messenger/getChatIsLoading']" />
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
    <div class="room__messages" :style="{ opacity: !isMounting ? '1' : '0' }" ref="roomMessagesRef">
      <div class="room__messages--inner" ref="room">
        <div
          v-intersection-observer="loadMore"
          v-if="
            !store.getters['messenger/getChatIsLoading'] &&
            store.getters['messenger/getCountElements'] >= 20
          "
          class="observer"
        ></div>
        <div
          v-for="(block, index) in store.getters['messenger/getRoomChatMessages']"
          :key="block.date"
          :id="`room_${index + 1}`"
        >
          <div class="room__messages--date">
            {{ formatDate(block?.date) }}
          </div>
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

<script setup>
/* eslint-disable */
import io from 'socket.io-client'
import { useRoute } from 'vue-router'
import { ref, watch, nextTick, onUpdated, onMounted, computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useStore } from 'vuex'
import { timeFormat } from '@/mixins/timeFormat'
import { convertDate, sleep } from '@/utils'

import DeleteDropdown from '@/components/messanger/dropdowns/DeleteDropdown.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import ChatRoomForm from '@/components/messanger/ChatRoomForm.vue'
import ChatMessage from '@/components/messanger/ChatMessage.vue'
import ContextMenu from '@/components/messanger/dropdowns/ContextMenu.vue'
import DeleteConfirm from '@/components/messanger/modal/DeleteConfirm.vue'
import LoadingBar from '@/components/ui/LoadingBar.vue'

const user = JSON.parse(localStorage.getItem('user') || '{}')
const route = useRoute()
const store = useStore()
const room = ref()
const chat = ref({})
const page = ref(1)
const isMounting = ref(false)
const roomMessagesRef = ref()
const state = ref('end')

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`, {
  query: { hash: localStorage.getItem('hash') }
})

const lastBlockId = computed(() => {
  const lastElement =
    store.getters['messenger/getRoomChatMessages'].length > 0
      ? store.getters['messenger/getRoomChatMessages'][0]
      : null
  const lastBlockItem = lastElement ? lastElement.block : null
  return lastBlockItem && lastBlockItem.length > 0 ? lastBlockItem[0].messageId : null
})

const scrollToBottom = (state) => {
  nextTick(() => {
    room.value.scrollIntoView({ block: state, inline: 'nearest' })
  })
}

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
  socket.emit('private_message_umma', privateMessageData, (data) => {
    console.log('private_message_umma')
  })
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
  store.commit('messenger/pushMessage', messageToPush)
  store.commit('messenger/setIsLoading', true)
}

const getMessagesData = async () => {
  isMounting.value = true
  store.commit('messenger/setSingleChatByChatId', +route.params?.id)
  chat.value = store.getters['messenger/getSingleChat']
  await store.dispatch('messenger/getChatMessages', { chat_id: route.params?.id, page: page.value })
  isMounting.value = false
}

const loadMore = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    const roomElement = document.querySelector('#room_1')
    state.value = 'nearest'
    page.value += 1
    store.commit('messenger/setChatIsLoading', true)
    store.commit('messenger/setCountElements', 0)
    await store.dispatch('messenger/getChatMessages', {
      chat_id: route.params?.id,
      page: page.value,
      last_message_id: lastBlockId.value
    })
    roomElement.scrollIntoView({ block: 'start', inline: 'nearest' })
    await sleep(3000)
    state.value = 'end'
  }
}

watch(
  () => route.params?.id,
  () => {
    store.commit('messenger/setChatIsLoading', true)
    store.commit('messenger/setChatMessages', [])
    page.value = 1
    getMessagesData()
  }
)
getMessagesData()

onUpdated(() => scrollToBottom(state.value))
onMounted(() => {
  store.commit('messenger/setChatIsLoading', true)
  store.commit('messenger/setChatMessages', [])
  page.value = 1
})
</script>

<script>
export default {
  mixins: [timeFormat],
  data() {
    return {
      showDeleteDropdown: false,
      isContextMenuOpen: false,
      isDeleteModalOpen: false,
      edit: false,
      share: false
    }
  },
  methods: {
    openContextMenu(e, id) {
      const target = e.target
      if (target.closest('.message__inner')) {
        this.$refs.menu.open(e)
        this.messageId = id
      }
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

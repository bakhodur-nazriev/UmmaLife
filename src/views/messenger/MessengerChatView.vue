<template>
  <div
    class="room"
    @dragenter.prevent="dragStartHandler"
    @dragleave.prevent="dragEndHandler"
    @dragover.prevent
    @drop.prevent="dropHandler"
    :class="{ dragging: isDragging }"
  >
    <div class="room__top">
      <div class="room__profile">
        <img
          :src="store.getters['messenger/getSingleChat']?.chatImage"
          :alt="store.getters['messenger/getSingleChat']?.chatName"
          class="room__profile--img"
        />
        <router-link to="#" class="room__profile--info">
          <div class="room__profile--name">
            {{ store.getters['messenger/getSingleChat']?.chatName }}
          </div>
          <div
            class="room__profile--account"
            :class="{
              online:
                store.getters['messenger/getSingleChat']?.isTyping ||
                multiFormatDateString(store.getters['messenger/getSingleChat']?.userLastSeen, true)
                  ?.isOnline
            }"
          >
            <template v-if="store.getters['messenger/getSingleChat']?.isTyping">
              {{ $t('chat.typing') }}
            </template>
            <template v-else>
              {{
                multiFormatDateString(store.getters['messenger/getSingleChat']?.userLastSeen, true)
                  ?.text
                  ? multiFormatDateString(
                      store.getters['messenger/getSingleChat']?.userLastSeen,
                      true
                    )?.text
                  : multiFormatDateString(
                      store.getters['messenger/getSingleChat']?.userLastSeen,
                      true
                    )
              }}
            </template>
          </div>
        </router-link>
        <LoadingBar v-if="store.getters['messenger/getChatIsLoading']" />
      </div>
      <div class="room__details" @click="showDeleteDropdown = true">
        <menu-details-icon class="room__details--icon" />
      </div>
      <delete-dropdown
        @handleClickOutside="showDeleteDropdown = false"
        @handleDeleteChat="() => handleDeleteChat('chat')"
        @clearChat="clearChatHandler"
        v-if="showDeleteDropdown"
      />
    </div>
    <div
      class="room__messages"
      ref="roomMessagesRef"
      :style="{ overflowY: isDragging ? 'hidden' : 'auto' }"
      @contextmenu.prevent="showContextMenu"
    >
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
            :isLastMessage="message === block.block[block.block.length - 1]"
          />
        </div>
      </div>
      <ContextMenu
        :contextMenuPosition="contextMenuPosition"
        :isContextMenuOpen="isContextMenuOpen"
        :isOwner="messageState.isOwner"
        @close="closeContextMenu"
        @replyMessage="replyMessage"
        @copyClipboard="copyClipboardFunc"
        @editMessage="editMenuClickHandler"
        @deleteMessage="() => handleDeleteChat('messege')"
      />
      <DropImage v-if="isDragging" />
    </div>
    <ChatRoomForm
      @submitHandler="(props) => (!isEditOpen ? submitHandler(props) : editHandler(props))"
      @typeHandler="typeHandler"
      @closeReply="isReplyOpen = false"
      @closeEdit="isEditOpen = false"
      @fileHandler="fileHandler"
      :isLoading="store.getters['messenger/getIsLoading']"
      :isReplyOpen="isReplyOpen"
      :selectedMessage="selectedMessage"
      :isEditOpen="isEditOpen"
    />
  </div>

  <teleport to="body">
    <delete-confirm
      v-if="isDeleteModalOpen"
      :deleteAction="deleteAction"
      :chat="chat"
      @close="isDeleteModalOpen = false"
      @handleDelete="handleDelete"
    />
    <MediaModal
      v-if="isReviewFileOpen"
      :isFileLoading="isFileLoading"
      :uploadedFile="uploadedFile"
      @closeModal="closeModal"
      @submitFileUpload="submitFileUpload"
    />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import io from 'socket.io-client'
import { useRoute } from 'vue-router'
import { ref, watch, nextTick, onMounted } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useStore } from 'vuex'
import { timeFormat } from '@/mixins/timeFormat'
import { convertDate, sleep, copyClipboard, getFormData } from '@/utils'

import DeleteDropdown from '@/components/messanger/dropdowns/DeleteDropdown.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import ChatRoomForm from '@/components/messanger/ChatRoomForm.vue'
import ChatMessage from '@/components/messanger/ChatMessage.vue'
import ContextMenu from '@/components/messanger/dropdowns/ContextMenu.vue'
import DeleteConfirm from '@/components/messanger/modal/DeleteConfirm.vue'
import LoadingBar from '@/components/ui/LoadingBar.vue'
import DropImage from '@/components/messanger/dropdowns/DropImage.vue'
import MediaModal from '@/components/messanger/modal/MediaModal.vue'

const user = JSON.parse(localStorage.getItem('user') || '{}')
const route = useRoute()
const store = useStore()
const room = ref()
const chat = ref({})
const page = ref(1)
const roomMessagesRef = ref()
const state = ref('end')
const isContextMenuOpen = ref(false)
const contextMenuPosition = ref({ top: 0, left: 0 })
const messageState = ref({ isOwner: false, messageId: null })
const selectedMessage = ref({})
const isReplyOpen = ref(false)
const isEditOpen = ref(false)
const isDeleteModalOpen = ref(false)
const showDeleteDropdown = ref(false)
const deleteAction = ref('messege')
const isDragging = ref(false)
const isFileLoading = ref(false)
const uploadedFile = ref({})
const isReviewFileOpen = ref(false)
const storage_url = ref(process.env.VUE_APP_STORAGE_URL)
const objectURL = ref(null)

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`, {
  query: { hash: localStorage.getItem('hash') }
})

const scrollToBottom = (state) => {
  nextTick(() => {
    room.value?.scrollIntoView({ block: state, inline: 'nearest' })
  })
}

const dragStartHandler = () => {
  isDragging.value = true
}
const dragEndHandler = (event) => {
  if (!event.target.closest('.room').contains(event.relatedTarget)) {
    isDragging.value = false
  }
}

const dropHandler = (event) => {
  isDragging.value = false
  fileHandler(event?.dataTransfer?.files[0])
  handleFileSelect(event?.dataTransfer?.files[0])
}

function handleFileSelect(file) {
  if (file) {
    isReviewFileOpen.value = true
    // Create a Blob from the selected file
    const blob = new Blob([file], { type: file.type })

    // Create an object URL from the Blob
    const fileUrl = URL.createObjectURL(blob)
    objectURL.value = {}
    setTimeout(() => {
      URL.revokeObjectURL(objectURL)
    }, 5000)
  }
}

const fileHandler = async (file) => {
  try {
    if (!file) return
    isFileLoading.value = true
    isReviewFileOpen.value = true
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      file
    })
    const { data } = await axios.post('/upload-file', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    uploadedFile.value = data?.data
  } catch (err) {
    console.log(err)
  } finally {
    isFileLoading.value = false
  }
}

const submitFileUpload = ({ message, file }) => {
  submitHandler({
    message,
    replyId: !!Object.keys(selectedMessage.value).length ? selectedMessage.value?.messageId : null,
    file,
    type: file?.type
  })
}

const closeModal = () => {
  isReviewFileOpen.value = false
  uploadedFile.value = {}
}

const showContextMenu = (event) => {
  contextMenuPosition.value = { top: 0, left: 0 }
  // Get mouse click coordinates
  const mouseX = event.clientX
  const mouseY = event.clientY

  // Get parent element and its position
  const parentElement = room.value
  const parentRect = parentElement.getBoundingClientRect()

  const contextMenu = document.querySelector('.context-menu')

  // Calculate relative position considering scroll
  const relativeX = mouseX - parentRect.left + parentElement.scrollLeft
  const relativeY = mouseY - parentRect.top + parentElement.scrollTop

  // Calculate maximum allowed positions
  const maxLeft = parentRect.width - contextMenu.clientWidth
  const maxTop = parentRect.height - contextMenu.clientHeight

  // Set context menu position, ensuring it doesn't go beyond parent edges
  contextMenuPosition.value = {
    top: Math.min(relativeY, maxTop) + 'px',
    left: Math.min(relativeX, maxLeft) + 'px'
  }

  defineMessageState(event)
}

const closeContextMenu = () => {
  isContextMenuOpen.value = false
  contextMenuPosition.value = { top: 0, left: 0 }
}

const defineMessageState = (event) => {
  isContextMenuOpen.value = false
  const target = event.target
  const messageInner = target.closest('.message__inner')
  if (messageInner) {
    const messageInnerParent = messageInner.parentElement
    messageState.value = {
      messageId: messageInnerParent.getAttribute('data-messageId'),
      isOwner: messageInnerParent.classList.contains('send')
    }
    isContextMenuOpen.value = true
  }
}

const getSelectedMessage = () => {
  if (messageState.value.messageId) {
    isContextMenuOpen.value = false

    const combinedArray = store.getters['messenger/getRoomChatMessages'].reduce(
      (result, current) => {
        // Extracting block array and date from the current object
        const { date, block, ...rest } = current

        // Combining block arrays into one array
        const combinedBlockArray = (result.block || []).concat(block)

        // Updating result object
        result = {
          ...rest,
          block: combinedBlockArray
        }

        return result
      },
      {}
    )
    if (combinedArray && combinedArray.block) {
      const message = combinedArray.block.find(
        (message) => message.messageId === +messageState.value.messageId
      )
      selectedMessage.value = message
    }
  }
}

const replyMessage = () => {
  getSelectedMessage()
  isReplyOpen.value = true
}

const copyClipboardFunc = () => {
  getSelectedMessage()
  copyClipboard(selectedMessage.value.message)
}

const editMenuClickHandler = () => {
  getSelectedMessage()
  isEditOpen.value = true
}

const handleDeleteChat = (action) => {
  chat.value = store.getters['messenger/getSingleChat']
  deleteAction.value = action
  isDeleteModalOpen.value = true
  if (action === 'messege') {
    getSelectedMessage()
  }
}

const handleDelete = async ({ chat, isChecked }) => {
  if (deleteAction.value === 'messege') {
    socket.emit(
      'delete_multiple_messages',
      {
        chatId: chat.chatId,
        chatType: chat.chatType,
        authorId: localStorage.getItem('access_token'),
        messageIds: [selectedMessage.value?.messageId],
        deleteForAll: isChecked
      },
      async (data) => {
        console.log('delete_multiple_messages')
        selectedMessage.value = {}
        contextMenuPosition.value = { top: 0, left: 0 }
        if (data && data.status === 200) {
          await store.dispatch('messenger/getChatMessages', {
            chat_id: route.params?.id,
            page: page.value,
            direction: 'down'
          })
        }
      }
    )
  } else {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      chat_id: chat?.chatId,
      chat_type: chat?.chatType
    })
    await axios.post('/delete-chat', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    await store.dispatch('messenger/getChats')
  }
}

const clearChatHandler = () => {
  showDeleteDropdown.value = false
  socket.emit(
    'clear_chat',
    {
      chatId: store.getters['messenger/getSingleChat']?.chatId,
      chatType: store.getters['messenger/getSingleChat']?.chatType,
      authorId: localStorage.getItem('access_token')
    },
    async (data) => {
      console.log('clear_chat')
      if (data && data.status === 200) {
        await store.dispatch('messenger/getChatMessages', {
          chat_id: route.params?.id,
          page: page.value,
          direction: 'down'
        })
      }
    }
  )
}

const checkFile = (file) => {
  return !!Object.keys(file || {}).length ? file : {}
}

const submitHandler = ({ message, replyId, file, type }) => {
  if (!type && !message) return
  const privateMessageData = {
    chatId: chat.value?.chatId,
    chatType: chat.value?.chatType,
    chatName: chat.value?.chatName,
    chatImage: chat.value?.chatImage,
    message,
    messageAuthor: user?.name,
    messageAuthorId: localStorage.getItem('access_token'),
    messageAuthorImage: user?.avatar,
    messageAuthorIsPolice: user?.is_investor,
    messageAuthorIsVerified: user?.verified === '1',
    messageAuthorIsPremium: user?.is_premium === '1',
    messageAuthorPrivacy: '0',
    mediaData: checkFile(file),
    fetchUrlData: {},
    replyId: replyId || 0,
    localId: Date.now()
  }
  tempMessagePush({ message, replyId, file })
  scrollToBottom(state.value)
  store.commit('messenger/setSingleChat', privateMessageData)
  socket.emit('private_message_umma', privateMessageData, (data) => {
    console.log('private_message_umma')
  })
}
const editHandler = ({ message, replyId }) => {
  const privateMessageData = {
    chatId: chat.value?.chatId,
    chatType: chat.value?.chatType,
    chatName: chat.value?.chatName,
    chatImage: chat.value?.chatImage,
    message,
    messageAuthor: user?.name,
    messageAuthorId: localStorage.getItem('access_token'),
    messageAuthorImage: user?.avatar,
    messageId: selectedMessage.value?.messageId
  }

  isEditOpen.value = false
  contextMenuPosition.value = { top: 0, left: 0 }
  socket.emit('edit_message', privateMessageData, async (data) => {
    console.log('edit_message')

    await store.dispatch('messenger/getChatMessages', {
      chat_id: route.params?.id,
      page: page.value,
      direction: 'down'
    })
  })
}

const tempMessagePush = ({ message, replyId, file }) => {
  const messageToPush = {
    message: message,
    messageId: Date.now(),
    messageDate: convertDate(new Date()),
    messageAuthor: user?.name,
    messageAuthorId: user?.user_id,
    messageAuthorImage: user?.avatar,
    messageType: checkFile(file) ? file?.type : 'text',
    messageSeen: false,
    messageOwner: true,
    messageEdited: false,
    mediaData: checkFile(file)
      ? {
          src: `${storage_url.value}${file?.src}`,
          title: file?.name,
          type: file?.type
        }
      : {},
    mentionUsers: [],
    fetchUrlData: [],
    replyMessage: !replyId
      ? {}
      : {
          message: selectedMessage?.value?.message,
          messageAuthor: selectedMessage?.value?.messageAuthor
        }
  }
  console.log(messageToPush)
  contextMenuPosition.value = { top: 0, left: 0 }
  store.commit('messenger/pushMessage', messageToPush)
  store.commit('messenger/setIsLoading', true)
}

const getMessagesData = async () => {
  store.commit('messenger/setSingleChatByChatId', +route.params?.id)
  chat.value = store.getters['messenger/getSingleChat']
  await store.dispatch('messenger/getChatMessages', {
    chat_id: route.params?.id,
    page: page.value,
    direction: 'down'
  })
  scrollToBottom(state.value)
}

const loadMore = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    const roomElement = document.querySelector('#room_1')
    state.value = 'nearest'
    scrollToBottom(state.value)
    page.value += 1
    store.commit('messenger/setChatIsLoading', true)
    store.commit('messenger/setCountElements', 0)

    await store.dispatch('messenger/getChatMessages', {
      chat_id: route.params?.id,
      direction: 'up',
      page: page.value
    })
    roomElement.scrollIntoView({ block: 'start', inline: 'nearest' })
    await sleep(3000)
    state.value = 'end'
  }
}

watch(
  () => route.params?.id,
  () => {
    page.value = 1
    store.commit('messenger/setChatIsLoading', true)
    store.commit('messenger/setChatMessages', [])
    contextMenuPosition.value = { top: 0, left: 0 }
    getMessagesData()
  }
)

watch(
  () => store.getters['messenger/getIsScrolling'],
  (isScrolling) => {
    if (isScrolling) {
      scrollToBottom(state.value)
    }
  }
)
// Listen user typing
const typeHandler = () => {
  const payload = {
    chatId: route.params?.id,
    chatType: 'user',
    authorId: localStorage.getItem('access_token'),
    authorName: user?.name,
    isTyping: ''
  }

  socket.emit('typing', payload)
}

onMounted(() => {
  store.commit('messenger/setChatIsLoading', true)
  store.commit('messenger/setChatMessages', [])
  page.value = 1
  getMessagesData()
})
</script>

<script>
export default {
  mixins: [timeFormat]
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
  position: relative;
  &.dragging::after {
    content: '';
    background-color: rgba($color: #000000, $alpha: 0);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
  }
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
    margin: 16px 0 0 16px;
    padding-right: 16px;
    flex-grow: 1;
    overflow-y: auto;
    position: relative;
    overflow-x: hidden;
    scale: 1;
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

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.5s ease,
    scale 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 0;
}

.observer {
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  padding: 1rem;
}
</style>

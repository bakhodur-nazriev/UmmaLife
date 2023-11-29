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
        <div v-for="block in messages" :key="block.date">
          <div style="color: var(--color-mine-shaft)">{{ multiFormatDateString(block.date) }}</div>
          <ChatMessage
            v-for="message in block.block"
            :message="message"
            :key="message.messageId"
            :isLoading="isLoading"
            @contextmenu.prevent="($event) => openContextMenu($event, message.messageId)"
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
      :value="value"
      :share="share"
      :edit="edit"
      :user="user"
      :isLoading="isLoading"
      @submitHandler="submitHandler"
      @setValue="setValue"
      @clearValues="clearValues"
    />
  </div>

  <teleport to="body">
    <delete-confirm v-if="isDeleteModalOpen" :user="user" @close="isDeleteModalOpen = false" />
  </teleport>
</template>

<script>
/* eslint-disable */
import DeleteDropdown from '@/components/messanger/dropdowns/DeleteDropdown.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import ChatRoomForm from '@/components/messanger/ChatRoomForm.vue'
import ChatMessage from '@/components/messanger/ChatMessage.vue'
import ContextMenu from '@/components/messanger/dropdowns/ContextMenu.vue'
import DeleteConfirm from '@/components/messanger/modal/DeleteConfirm.vue'
import { users } from '@/dummy'
import { sleep, getFormData } from '@/utils.js'
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { timeFormat } from '@/mixins/timeFormat'

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
      value: '',
      messageId: null,
      edit: false,
      share: false,
      user: null,
      isLoading: false,
      users,
      sleep
    }
  },
  computed: {
    // selectedMessage() {
    //   return this.user.messages.find((message) => message.id === this.messageId)
    // }
  },
  watch: {
    user: {
      handler() {
        this.scrollToBottom()
      },
      deep: true
    },
    '$route.params'() {
      this.renderPage()
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.room.scrollIntoView({ block: 'end', inline: 'nearest' })
      })
    },
    openContextMenu(e, id) {
      const target = e.target
      if (target.closest('.message__inner')) {
        this.$refs.menu.open(e)
        this.messageId = id
      }
    },
    async submitHandler(value, type) {
      const index = this.users.findIndex((u) => u.id === this.user.id)
      if (type.state === 'noedit') {
        this.users[index].messages.push({
          id: Date.now(),
          message: value,
          status: 'notread',
          state: 'send'
        })
      }
      if (type.state === 'edit') {
        const messageIndex = this.users[index].messages.findIndex(
          (message) => message.id === type.data.id
        )

        this.users[index].messages[messageIndex].message = value
      }
      if (type.state === 'share') {
        this.users[index].messages.push({
          id: Date.now(),
          message: {
            user_name: type.data.user_name,
            user_message:
              typeof type.data.user_message === 'string'
                ? type.data.user_message
                : type.data.user_message.text,
            text: value
          },
          state: 'send',
          status: 'notread'
        })
      }
      this.isLoading = true
      await sleep(300)
      this.isLoading = false
    },
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
    },
    clearValues() {
      this.share = false
      this.edit = false
    },
    renderPage() {
      if (this.$route.params.id) {
        this.user = this.users.find((user) => user.id === +this.$route.params.id)
      }
    }
  },
  mounted() {
    this.renderPage()
  },
  updated() {
    this.renderPage()
    this.scrollToBottom()
  }
}
</script>

<script setup>
const messages = ref([])
const route = useRoute()
const store = useStore()

const chat = ref({})
const isLoading = ref(false)

const getChatMessages = async (chat_id) => {
  try {
    isLoading.value = true
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

    messages.value = data.data
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
const getMessagesData = async () => {
  await getChatMessages(route.params?.id)
  store.commit('messenger/setSingleChat', +route.params?.id)
  chat.value = store.getters['messenger/getSingleChat']
}
onMounted(getMessagesData)

watch(() => route.params?.id, getMessagesData)
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
  }
}
</style>

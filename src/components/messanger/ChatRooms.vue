<template>
  <div class="room" v-if="user">
    <div class="room__top">
      <div class="room__profile">
        <img :src="user.image" :alt="user.name" class="room__profile--img" />
        <div class="room__profile--info">
          <div class="room__profile--name">{{ user.name }}</div>
          <div class="room__profile--account">{{ user.account }}</div>
        </div>
      </div>
      <div class="room__details" @click="showDeleteDropdown = true">
        <menu-details-icon />
        <delete-dropdown
          @handleClickOutside="showDeleteDropdown = false"
          @handleDeleteChat="isDeleteModalOpen = true"
          v-if="showDeleteDropdown"
        />
      </div>
    </div>
    <div class="room__messages" @contextmenu.prevent="openContextMenu">
      <div class="room__messages--inner" ref="room">
        <ChatMessage
          v-for="message in user.messages"
          :state="message.state"
          :key="message.id"
          :message="message.message"
          :data-id="message.id"
        />
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
      :selectedMessage="selectedMessage"
      :user="user"
      @submitHandler="submitHandler"
      @setValue="setValue"
      @clearValues="clearValues"
    />
  </div>
  <div v-else class="room__empty">
    <span>{{ $t('chat.empty_room') }}</span>
  </div>
  <teleport to="body">
    <delete-confirm v-if="isDeleteModalOpen" :user="user" @close="isDeleteModalOpen = false" />
  </teleport>
</template>

<script>
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
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['submitHandler'],
  data() {
    return {
      showDeleteDropdown: false,
      isContextMenuOpen: false,
      isDeleteModalOpen: false,
      value: '',
      messageId: null,
      edit: false,
      share: false
    }
  },
  computed: {
    selectedMessage() {
      return this.user.messages.find((message) => message.id === this.messageId)
    }
  },
  watch: {
    user: {
      handler() {
        this.scrollToBottom()
      },
      deep: true
    }
  },
  methods: {
    scrollToBottom() {
      setTimeout(() => {
        this.$refs.room.scrollIntoView({ block: 'end', inline: 'nearest' })
      }, 0)
    },
    openContextMenu(e) {
      const target = e.target
      if (target.closest('.message')) {
        console.log('message id', Number(target.getAttribute('data-id')))
        this.messageId = Number(target.getAttribute('data-id'))
        this.$refs.menu.open(e)
      }
    },
    submitHandler(value, type) {
      this.$emit('submitHandler', { value, user: this.user }, type)
    },
    setValue(value) {
      this.value = value
    },
    shareMessage() {
      this.clearValues()
      console.log('share', this.messageId)
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
  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
    }
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
    }
  }
  &__details {
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  &__messages {
    padding: 16px 16px 0;
    flex-grow: 1;
    overflow-y: auto;
    position: relative;
  }
}
</style>

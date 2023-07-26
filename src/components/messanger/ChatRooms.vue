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
      <div class="room__details" @click="showText = true">
        <menu-details-icon />
        <delete-dropdown
          @handleClickOutside="showText = false"
          v-if="showText"
        />
      </div>
    </div>
    <div class="room__messages">
      <div class="room__messages--inner" ref="room">
        <ChatMessage
          v-for="message in user.messages"
          :state="message.state"
          :key="message.id"
          :message="message.message"
        />
      </div>
    </div>
    <ChatRoomForm />
  </div>
  <div v-else class="room__empty">
    <span>{{ $t("chat.empty_room") }}</span>
  </div>
</template>

<script>
import DeleteDropdown from '@/components/messanger/dropdowns/DeleteDropdown.vue'

import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import ChatRoomForm from '@/components/messanger/ChatRoomForm.vue'
import ChatMessage from '@/components/messanger/ChatMessage.vue'

export default {
  components: {
    MenuDetailsIcon,
    ChatRoomForm,
    ChatMessage,
    DeleteDropdown
  },
  props: {
    user: {
      type: Object
    }
  },
  data () {
    return {
      showText: false
    }
  },
  watch: {
    user () {
      this.scrollToBottom()
    }
  },
  methods: {
    scrollToBottom () {
      setTimeout(() => {
        this.$refs.room.scrollIntoView({ block: 'end', inline: 'nearest' })
      }, 0)
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
  .message-dropdown {
    position: absolute;
    outline: none;
    z-index: 10;
    top: 0;
    left: 0;
  }
}
</style>

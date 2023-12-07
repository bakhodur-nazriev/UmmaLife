<template>
  <div class="navigation">
    <div class="navigation__top">
      <search-input :placeholder="$t('placeholders.search_input')" class="navigation__search" />
      <button class="navigation__add">
        <add-user-icon />
      </button>
    </div>
    <div class="navigation__menu">
      <ChatUser v-for="chat in chats" :chat="chat" :key="chat.chatId" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import SearchInput from '@/components/ui/SearchInput.vue'
import AddUserIcon from '@/components/icons/AddUserIcon.vue'
import ChatUser from '@/components/messanger/ChatUser.vue'

const props = defineProps({
  chats: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.navigation {
  border-radius: 20px;
  background: var(--color-white);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  &__top {
    width: 100%;
    padding: 16px;
    display: flex;
    gap: 16px;
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    border-radius: 20px 20px 0 0;
  }
  &__add {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 0;
    border: none;
    outline: none;
    background-color: var(--color-seashell);
    color: var(--color-mine-shaft);
  }
  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &__search {
    width: calc(100% - 64px);
  }
}
</style>

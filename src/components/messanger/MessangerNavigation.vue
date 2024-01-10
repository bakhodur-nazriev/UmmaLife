<template>
  <div class="navigation">
    <div class="navigation__top">
      <search-input
        :placeholder="$t('placeholders.search_input')"
        class="navigation__search"
        v-if="width > 767"
      />
      <div v-if="width < 767" class="navigation__top--title">{{ $t('links.messenger') }}</div>
      <div class="navigation__top--wrapper">
        <span v-if="width < 767" v-on-click-outside="handleCloseSearch">
          <button class="navigation__add" @click="handleSearchToggle">
            <SearchIcon />
          </button>
          <transition name="slide">
            <div v-if="isSearchOpen" class="settings__header--input">
              <SearchInput :full="true" :placeholder="$t('placeholders.search_input')" />
            </div>
          </transition>
        </span>
        <button class="navigation__add"><add-user-icon /></button>
        <button class="navigation__add settings-icon" v-if="width < 767"><SettingsIcon /></button>
      </div>
    </div>
    <div class="navigation__menu">
      <ChatUser
        v-for="(chat, index) in chats"
        :chat="chat"
        :key="chat.chatId"
        :index="index"
        :width="width"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import SearchInput from '@/components/ui/SearchInput.vue'
import AddUserIcon from '@/components/icons/AddUserIcon.vue'
import ChatUser from '@/components/messanger/ChatUser.vue'
import SearchIcon from '@/components/icons/settings/SearchIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'

const { width } = useWindowSize()

const isSearchOpen = ref(false)

const handleSearchToggle = () => {
  isSearchOpen.value = !isSearchOpen.value
}
const handleCloseSearch = () => {
  isSearchOpen.value = false
}

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
  @media (max-width: 767px) {
    border-radius: 0;
    margin-bottom: 60px;
    overflow-x: hidden;
  }
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
    @media (max-width: 767px) {
      border-radius: 0;
      justify-content: space-between;
      align-items: center;

      &--title {
        font-size: 20px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      &--wrapper {
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }
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
    @media (max-width: 767px) {
      width: 24px;
      height: 24px;
      background-color: transparent;
      color: var(--color-hippie-blue);
      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
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

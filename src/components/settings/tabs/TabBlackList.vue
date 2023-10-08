<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'main')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.black_list') }}</div>
      <div class="settings__header--search" @click="handleSearchOpen">
        <SearchIcon />
      </div>
      <transition name="slide">
        <div
          v-if="isSearchOpen"
          class="settings__header--input"
          v-on-click-outside="handleCloseSearch"
        >
          <SearchInput :full="true" :placeholder="$t('placeholders.search_input')" />
        </div>
      </transition>
    </div>
    <SettingsInfo>
      <template #icon>
        <BlackListIcon />
      </template>
      <template #title>{{ $t('settings.black_list.info_title') }}</template>
      <template #text>
        {{ $t('settings.black_list.info_text') }}
      </template>
    </SettingsInfo>
    <div class="settings__form create__group">
      <div class="create__group--block">
        <div class="users__wrapper">
          <UserCard v-for="user in groupsUsers" :black-list="true" :user="user" :key="user.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'
import BlackListIcon from '@/components/icons/settings/BlackListIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import UserCard from '@/components/groups/details/UserCard.vue'
import SearchIcon from '@/components/icons/settings/SearchIcon.vue'
import SearchInput from '@/components/ui/SearchInput.vue'

import { groupsUsers } from '@/dummy.js'
const emit = defineEmits(['handleSelectNav'])

const isSearchOpen = ref(false)

const handleSearchOpen = () => {
  isSearchOpen.value = true
}
const handleCloseSearch = () => {
  isSearchOpen.value = false
}
</script>

<style lang="scss" scoped>
.users__wrapper {
  @media (max-width: 767px) {
    gap: 0;
  }
}
.settings__header--input {
  position: absolute;
  bottom: 7px;
  right: 16px;
  width: calc(100% - 75px);
  &-block {
    width: 100%;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.5s;
  transform: translateX(0);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(120%);
}
</style>

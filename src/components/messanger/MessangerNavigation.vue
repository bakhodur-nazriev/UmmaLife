<template>
  <div class="navigation">
    <div class="navigation__top">
      <search-input :placeholder="$t('placeholders.search_input')" class="navigation__search" />
      <button class="navigation__add">
        <add-user-icon />
      </button>
    </div>
    <div class="navigation__menu">
      <ChatUser v-for="user in dummyUsers" :user="user" :key="user.id" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import axios from 'axios'
import { getFormData } from '@/utils'

import SearchInput from '@/components/ui/SearchInput.vue'
import AddUserIcon from '@/components/icons/AddUserIcon.vue'
import ChatUser from '@/components/messanger/ChatUser.vue'
const props = defineProps({
  dummyUsers: Array
})

const chats = ref([])

const getChats = async (video_id) => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY
    })

    const { data } = await axios.post('/get-chats', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    chats.value = data.data
    console.log(chats.value[0])
  } catch (err) {
    console.log(err)
  }
}
getChats()
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

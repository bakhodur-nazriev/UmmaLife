<template>
  <li
    class="muvi__add--list"
    @click="isTagPeopleOpen = !isTagPeopleOpen"
    v-on-click-outside="() => (isTagPeopleOpen = false)"
  >
    <div class="muvi__add--list-parent">
      <p><TagPeopleIcon /> {{ $t('add_muvi.tag_people') }}</p>
      <div class="muvi__add--selected" v-if="selectedUsers.length > 0">
        <div v-for="(user, index) in selectedUsers" :key="user.id">
          {{ user.name.trim() }}{{ selectedUsers.length - 1 !== index ? ', ' : '' }}
        </div>
      </div>
    </div>
    <ArrowDownIcon class="arrow" :class="{ open: isTagPeopleOpen }" />
    <div class="muvi__add--dropdown" v-if="isTagPeopleOpen" @click.stop>
      <div class="muvi__mobile--nav white">
        <button @click="isTagPeopleOpen = false" class="muvi__mobile--nav-btn">
          <ArrowLeftIcon />
        </button>
        <div class="muvi__mobile--nav-title">{{ $t('add_muvi.tag_people') }}</div>
        <div class="left"></div>
      </div>
      <div class="search__container--inner">
        <div class="search__container">
          <div class="search__container--wrapper">
            <LoupeIcon />
            <input type="text" :placeholder="$t('add_muvi.search')" @input="searchHandler" />
          </div>
        </div>
      </div>
      <div
        class="muvi__add--dropdown-list"
        v-for="(user, index) in users"
        :key="user.id"
        @click="handleClick(user)"
        :class="{ first: index === 0 }"
      >
        <UserInfo
          :avatar="user?.avatar"
          :username="user?.username"
          :status="{
            is_investor: user?.isInvestor || false,
            verified: user?.verified || '0',
            is_premium: user?.is_premium || '0'
          }"
        />
        <div class="selected__option--wrapper">
          <div class="selected__option--checkbox" :class="{ checked: user.isChecked }">
            <transition name="scale">
              <CheckMarkIcon v-if="user.isChecked" />
            </transition>
          </div>
        </div>
      </div>
      <div
        v-intersection-observer="loadMore"
        v-if="!isLoading && countElements >= 18"
        class="observer"
      ></div>
      <div class="selected__option--action">
        <SampleButton
          :size="14"
          width="100%"
          :title="`${$t('add_muvi.done')} (${selectedUsers.length})`"
          type="button"
          @click="emit('passTaggedUsers', selectedUsers), (isTagPeopleOpen = false)"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { getFormData } from '@/utils'
import axios from 'axios'
import { useDebounceFn } from '@vueuse/core'
import { vIntersectionObserver, vOnClickOutside } from '@vueuse/components'

import LoupeIcon from '@/components/icons/LoupeIcon.vue'
import TagPeopleIcon from '@/components/icons/shorts/TagPeopleIcon.vue'
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import ArrowDownIcon from '@/components/icons/shorts/ArrowDownIcon.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import UserInfo from '@/components/ui/UserInfo.vue'

const emit = defineEmits(['passTaggedUsers'])

const users = ref([])
const selectedUsers = ref(users.value.map((u) => u.isChecked))
const isTagPeopleOpen = ref(false)
const page = ref(1)
const user_id = ref(localStorage.getItem('user_id') || null)
const isLoading = ref(false)
const countElements = ref(0)

const handleClick = (user) => {
  user.isChecked = !user.isChecked
  selectedUsers.value = users.value.filter((u) => u.isChecked)
  emit('passTaggedUsers', selectedUsers.value)
}

const searchHandler = useDebounceFn((e) => {
  getUserFollowers(page.value, e.target.value)
}, 500)

const getUserFollowers = async (page, search = '') => {
  try {
    isLoading.value = true
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      page,
      search,
      user_id: user_id.value
    })
    const { data } = await axios.post('/get-user-followers', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    countElements.value = data.countElements
    if (search || page === 1) {
      users.value = data.data
    } else {
      users.value = [...users.value, ...data.data]
    }
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    page.value += 1
    await getUserFollowers(page.value)
  }
}

getUserFollowers(page.value)
</script>

<style lang="scss">
.muvi__add {
  &--dropdown {
    position: absolute;
    top: calc(100% + 6px);
    max-height: 292px;
    overflow-y: auto;
    left: 0;
    width: 100%;
    background-color: var(--color-white);
    border-radius: 12px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    z-index: 15;
    cursor: auto;
    .muvi__mobile--nav {
      display: none;
      @media (max-width: 767px) {
        display: flex;
      }
    }
    @media (max-width: 767px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      max-height: 100dvh;
      min-height: 100dvh;
      z-index: 20;
    }
    .search__container {
      width: 100%;
      background: var(--color-seashell);
      padding: 10px 16px;
      border-radius: 10px;
      user-select: none;
      &--inner {
        padding: 16px;
        position: sticky;
        width: 100%;
        left: 0;
        top: 0;
        background-color: var(--color-white);
        z-index: 50;
      }
      &--wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        svg {
          display: block;
          width: 16px;
          height: 16px;
          margin-top: 1px;
        }
        input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          background-color: transparent;
          color: var(--color-mine-shaft);
          &::placeholder {
            color: var(--color-secondary);
          }
        }
      }
    }
    .selected__option {
      &--action {
        display: none;
        @media (max-width: 767px) {
          display: block;
        }
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 16px;
        width: 100%;
      }
      &--checkbox {
        width: 24px;
        height: 24px;
        border: 1px solid var(--color-silver-chalice);
        border-radius: 5px;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s ease-in-out;
        color: var(--color-stable-white);
        cursor: pointer;
        &.checked {
          border: 1px solid var(--color-hippie-blue);
          background-color: var(--color-hippie-blue);
        }
      }
      &--wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
        width: fit-content;
      }
      &--text {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
    &-list {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      &.first {
        padding-top: 0 !important;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      img {
        width: 28px;
        height: 28px;
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
  &--selected {
    margin-top: 8px;
    padding-left: 28px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    & > div {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
  }
}
</style>

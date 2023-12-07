<template>
  <div class="mobile-select-model">
    <div class="mobile-select--inner" v-if="isShareOpen">
      <div
        class="mobile-select--block muvi__share"
        :class="isShareOpen && !className ? 'opened' : 'closed'"
        v-on-click-outside="handleClose"
      >
        <div class="session__modal--block muvi__add--dropdown">
          <div class="search__container--inner">
            <div class="search__container">
              <div class="search__container--wrapper">
                <LoupeIcon />
                <input
                  type="text"
                  :placeholder="$t('placeholders.search_input')"
                  @input="searchHandler"
                />
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
          <div v-if="!isLoading && users.length === 0" class="muvi__share--empty">
            {{ $t('muvi_mobile.no_users') }}
          </div>
        </div>
        <div
          class="muvi__share--actions"
          :class="{ fixed: actionFixed }"
          v-if="selectedUsers.length === 0"
        >
          <div class="muvi__share--copy">
            <SampleButton
              color="default"
              :size="14"
              :title="$t('links.copy_link')"
              icon="copy"
              padding="12px"
              width="100%"
              @click="copyLink"
            >
              <CopyLinkIcon />
            </SampleButton>
            <SampleButton
              color="default"
              :size="14"
              :title="$t('links.share')"
              icon="share"
              padding="12px"
              width="100%"
            >
              <ShareLinkIcon />
            </SampleButton>
          </div>
        </div>
        <form class="muvi__share--form" :class="{ fixed: actionFixed }" v-else>
          <textarea
            :placeholder="$t('chat.placeholder') + '...'"
            ref="textareaEl"
            @input="adjustTextareaHeight"
            :value="textareaValue"
          />
          <div class="muvi__share--submit">
            <SampleButton
              :title="$t('chat.send')"
              width="100%"
              :size="14"
              padding="15px"
              type="submit"
            />
          </div>
        </form>
        <div class="clipboard--message" v-if="message">{{ $t(message) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { ref } from 'vue'
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components'
import { getFormData, copyClipboard, sleep } from '@/utils'
import { useDebounceFn } from '@vueuse/core'

import LoupeIcon from '@/components/icons/LoupeIcon.vue'
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import ShareLinkIcon from '@/components/icons/ShareLinkIcon.vue'
import CopyLinkIcon from '@/components/icons/CopyLinkIcon.vue'
import UserInfo from '@/components/ui/UserInfo.vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  isShareOpen: {
    type: Boolean,
    default: false
  },
  muviId: {
    type: Number
  }
})

const route = useRoute()
const emit = defineEmits(['closeShare'])

const className = ref(false)
const textareaValue = ref('')
const actionFixed = ref(false)
const textareaEl = ref()

const page = ref(1)
const user_id = ref(localStorage.getItem('user_id') || null)
const isLoading = ref(false)
const users = ref([])
const selectedUsers = ref(users.value.map((u) => u.isChecked))
const countElements = ref(0)
const link = ref(`https://ummalife.com/${route.params?.lang || 'ru'}/muvi/${props.muviId}`)
const message = ref('')

const copyLink = async () => {
  message.value = await copyClipboard(link.value)
  await sleep(3000)
  message.value = ''
}

const handleClick = (user) => {
  user.isChecked = !user.isChecked
  selectedUsers.value = users.value.filter((u) => u.isChecked)
}

const handleClose = () => {
  className.value = true
  setTimeout(() => {
    emit('closeShare')
    className.value = false
  }, 100)
}
const adjustTextareaHeight = () => {
  const textarea = textareaEl.value

  if (textarea.value.trim() !== '') {
    textareaValue.value = textarea.value
    textarea.style.height = `${textarea.scrollHeight}px`
  } else {
    textareaValue.value = ''
    textarea.style.height = '58px'
  }
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
    if (search) {
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
.mobile-select-model {
  .muvi__add--dropdown {
    all: unset;
    flex-shrink: 1;
    flex-grow: 1;
  }
  .search__container--inner {
    position: sticky;
    left: 0;
    top: 0;
  }
  .muvi__share {
    max-height: 464px;
    min-height: 464px;
    display: flex;
    flex-direction: column;

    .search__container--inner {
      padding-top: 20px;
      &::after {
        content: '';
        width: 28px;
        height: 2px;
        border-radius: 2px;
        background-color: var(--color-secondary);
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .muvi__add--dropdown-list {
      padding: 10px 16px;
    }
    &--actions {
      padding: 20px 16px;
      width: 100%;
      background-color: var(--color-white);
      border-top: 1px solid var(--color-seashell);
      position: sticky;
      bottom: 0;
      left: 0;
      &.fixed {
        position: fixed;
      }
    }
    &--copy {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 7px;
    }
    &--empty {
      width: 232px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;
      text-align: center;
      margin: 84px auto 0;
      color: var(--color-secondary);
    }
    &--form {
      background-color: var(--color-white);
      width: 100%;
      position: sticky;
      bottom: 0;
      left: 0;

      &.fixed {
        position: fixed;
      }
      textarea {
        background-color: transparent;
        width: 100%;
        border: none;
        border-top: 1px solid var(--color-seashell);
        border-bottom: 1px solid var(--color-seashell);
        font-family: 'HelveticaNeueCyr', sans-serif;
        padding: 20px 16px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
        outline: none;
        overflow-y: hidden;
        height: 58px;
        &::placeholder {
          color: var(--color-secondary);
        }
      }
    }
    &--submit {
      padding: 20px 16px;
    }
  }
}
.clipboard--message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  font-size: 16px;
  color: var(--color-hippie-blue);
  text-align: center;
}
</style>

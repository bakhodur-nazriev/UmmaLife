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
                <input type="text" placeholder="Search" @input="handleSearch" />
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
            <div class="muvi__add--dropdown-info">
              <img :src="user.image" :alt="user.name" />
              <p>{{ user.name }}</p>
            </div>
            <div class="selected__option--wrapper">
              <div class="selected__option--checkbox" :class="{ checked: user.isChecked }">
                <transition name="scale">
                  <CheckMarkIcon v-if="user.isChecked" />
                </transition>
              </div>
            </div>
          </div>
          <div v-if="users.length === 0" class="muvi__share--empty">
            No users you are subscribed to or who are subscribed to you
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
              title="Copy link"
              icon="copy"
              padding="12px"
              width="100%"
            >
              <CopyLinkIcon />
            </SampleButton>
            <SampleButton
              color="default"
              :size="14"
              title="Share"
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
            placeholder="Write a message..."
            ref="textareaEl"
            @input="adjustTextareaHeight"
            :value="textareaValue"
          />
          <div class="muvi__share--submit">
            <SampleButton title="Send" width="100%" :size="14" padding="15px" type="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { users as allUsers } from '@/dummy.js'
import LoupeIcon from '@/components/icons/LoupeIcon.vue'
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import ShareLinkIcon from '@/components/icons/ShareLinkIcon.vue'
import CopyLinkIcon from '@/components/icons/CopyLinkIcon.vue'

const props = defineProps({
  isShareOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeShare'])

const className = ref(false)
const textareaValue = ref('')
const users = ref(allUsers)
const selectedUsers = ref(users.value.filter((u) => u.isChecked))
const actionFixed = ref(false)
const textareaEl = ref()

const handleSearch = (event) => {
  const value = event.target.value.trim().toLowerCase()
  if (value) {
    actionFixed.value = true
    users.value = users.value.filter((user) => user.name.toLowerCase().includes(value))
  } else {
    actionFixed.value = false
    users.value = allUsers
  }
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
</script>

<style lang="scss">
.mobile-select-model {
  .muvi__add--dropdown {
    all: unset;
  }
  .search__container--inner {
    position: sticky;
    left: 0;
    top: 0;
  }
  .muvi__share {
    max-height: 464px;
    min-height: 464px;

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
      display: flex;
      align-items: center;
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
</style>

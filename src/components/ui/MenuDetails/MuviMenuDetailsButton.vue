<template>
  <div class="menu__details">
    <div class="menu__toggle--button open__menu--details--button" @click="emit('toggle-menu')">
      <MenuDetailsIcon class="dropdown__toggle" />
    </div>

    <Transition name="bounce">
      <div class="menu__overlay" v-if="isMenuOpen">
        <ul class="dropdown__menu">
          <div class="muvi__menu--list playback">
            <PlaybackIcon />
            <div class="muvi__menu--wrapper">
              <div class="muvi__menu--list-text">{{ $t('add_muvi.playback_speed') }}</div>
              <ul class="muvi__menu--list-speed">
                <li
                  v-for="speed in playbackSpeeds"
                  :key="speed"
                  :class="{ active: speed === store.getters['muvi/getPlaybackSpeed'] }"
                  @click="handleSpeedSelect(speed)"
                >
                  {{ speed }}x
                </li>
              </ul>
            </div>
          </div>
          <template v-if="!muvi?.owner">
            <li class="muvi__menu--list download" @click="downloadRef?.click()">
              <AudioDownloadIcon />
              <span>{{ $t('library.download') }}</span>
              <a :href="muvi?.src" download hidden ref="downloadRef"></a>
            </li>

            <li class="muvi__menu--list hide" @click="hideMovieHandler">
              <HideIcon />
              <span>{{ $t('muvi.hide_muvi') }}</span>
            </li>

            <li class="muvi__menu--list" @click="blockUserHandler">
              <BlockIcon />
              <span>{{ $t('muvi.block_user') }}</span>
            </li>

            <li class="muvi__menu--list delete complain" @click="reportMuvi">
              <ComplainIcon />
              <span>{{ $t('buttons.complain') }}</span>
            </li>
          </template>
          <template v-else>
            <li class="muvi__menu--list download" @click="emit('editHandle'), emit('toggle-menu')">
              <EditIcon />
              <span>{{ $t('add_muvi.edit_muvi') }}</span>
            </li>
            <MuviViewList
              :menu="true"
              @passSelectedOption="(index) => emit('setPrivacyType', index)"
              :selectedIndex="+muvi?.privacy || 0"
            />
            <li class="muvi__add--list">
              <p><AllowCommentIcon />{{ $t('add_muvi.disable_comments') }}</p>
              <BaseToggle
                :checked="muvi?.comments_status === '0'"
                @update:isChecked="changeStatusCommentHandler"
              />
            </li>
            <li class="muvi__menu--list delete" @click="emit('deleteHandler')">
              <DeleteIcon />
              <div class="muvi__menu--list-text">{{ $t('add_muvi.delete_muvi') }}</div>
            </li>
          </template>
        </ul>
      </div>
    </Transition>
  </div>
</template>
<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { useStore } from 'vuex'

import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import HideIcon from '@/components/icons/MenuDetails/HideIcon.vue'
import BlockIcon from '@/components/icons/BlockIcon.vue'
import ComplainIcon from '@/components/icons/MenuDetails/ComplainIcon.vue'
import EditIcon from '@/components/icons/shorts/mobile/EditIcon.vue'
import PlaybackIcon from '@/components/icons/shorts/mobile/PlaybackIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import MuviViewList from '@/components/muvi/lists/MuviViewList.vue'
import AllowCommentIcon from '@/components/icons/shorts/AllowCommentIcon.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import DeleteIcon from '@/components/icons/MenuDetails/DeleteIcon.vue'
import { getFormData } from '@/utils'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  },
  muvi: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'setPlaybackSpeed',
  'toggle-menu',
  'closeMenu',
  'reported',
  'commentStatus',
  'setPrivacyType',
  'deleteHandler',
  'editHandle'
])
const store = useStore()
const downloadRef = ref()
const router = useRouter()
const playbackSpeeds = ref([1, 1.25, 1.75, 2])

const handleSpeedSelect = (speed) => {
  store.commit('muvi/setPlaybackSpeed', speed)
}

const hideMovieHandler = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id: props.muvi?.id
    })
    await axios.post('/hide-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    router.go(-1)
  } catch (err) {
    console.log(err)
  }
}
const blockUserHandler = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      user_id: props.muvi?.publisher?.user_id,
      block_action: 'add_block'
    })
    await axios.post('/block-user', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    router.go(-1)
  } catch (err) {
    console.log(err)
  }
}

const reportMuvi = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id: props.muvi?.id,
      text: '',
      type: 'spam'
    })

    await axios.post('/report-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    emit('reported')
  }
}

const changeStatusCommentHandler = (status) => {
  emit('commentStatus', { isDisabled: status })
}
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: scale-up-top-right 0.2s;
}

.bounce-leave-active {
  animation: scale-up-top-right 0.2s reverse;
}

@keyframes scale-up-top-right {
  0% {
    transform: scale(0.5);
    transform-origin: top right;
  }
  100% {
    transform: scale(1);
    transform-origin: top right;
  }
}

.menu__details {
  position: relative;
}

.menu__toggle--button {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 30px;
  user-select: none;
}

.menu__overlay {
  position: absolute;
  right: 0;
  background-color: var(--color-white);
  z-index: 500;
  border-radius: 10px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
}

.menu__overlay svg {
  color: var(--color-silver-chalice);
}

.dropdown__menu {
  list-style: none;
  margin: 0;
  padding: 0;
  width: max-content;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  color: var(--color-mine-shaft);

  &:hover {
    transition: all 0.15s ease-in-out;
    background-color: var(--color-seashell);
  }

  &__divider {
    width: 92%;
    margin: 1px auto;
  }
}

.muvi__add--list {
  background-color: transparent;
  &:hover {
    background-color: var(--color-seashell);
  }
}
.muvi__menu {
  max-height: 70dvh !important;
  &--block {
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &--list {
    padding: 16px 20px;
    border-radius: 12px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: var(--color-mine-shaft);
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-seashell);
    }
    &:not(.playback) {
      align-items: center;
      cursor: pointer;
    }
    &:hover {
      background-color: var(--color-seashell);
    }
    &.download svg {
      scale: 0.8;
    }
    &.hide svg {
      scale: 1.1;
    }
    &.complain {
      svg {
        scale: 1.1;
        color: var(--color-valencia) !important;
      }
    }
    svg {
      width: 16px;
      height: 16px;
      display: block;
    }
    &-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
      width: 100%;
    }
    &.selecttion {
      justify-content: space-between;
      align-items: center;
      .muvi__add--dropdown-top {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
    &-text {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &-speed {
      margin: 0;
      padding: 0;
      padding-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      list-style: none;
      li {
        padding: 8px;
        border-radius: 6px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
        cursor: pointer;
        &.active {
          background-color: var(--color-hippie-blue);
          color: var(--color-stable-white);
        }
      }
    }
    &-visible {
      margin-top: 8px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    &.delete {
      color: var(--color-valencia);
      .muvi__menu--list-text {
        color: var(--color-valencia);
      }
    }
  }
}
</style>

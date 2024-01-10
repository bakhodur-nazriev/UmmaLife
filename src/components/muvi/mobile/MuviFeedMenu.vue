<template>
  <div class="mobile-select-model">
    <div class="mobile-select--inner" v-if="isMenuOpen">
      <div
        class="mobile-select--block muvi__menu"
        :class="isMenuOpen && !className ? 'opened' : 'closed'"
        v-on-click-outside="handleClose"
      >
        <div class="mobile-select--header p-0" v-if="!isDropdownOpen"></div>
        <div class="mobile-select--header" v-else>{{ $t('add_muvi.can_view') }}</div>

        <div class="session__modal--block muvi__menu--block" v-if="!isDropdownOpen">
          <div class="muvi__menu--list">
            <PlaybackIcon />
            <div class="muvi__menu--wrapper">
              <div class="muvi__menu--list-text">{{ $t('add_muvi.playback_speed') }}</div>
              <ul class="muvi__menu--list-speed">
                <li
                  v-for="speed in playbackSpeeds"
                  :key="speed"
                  :class="{ active: speed === selectedSpeed }"
                  @click="handleSpeedSelect(speed)"
                >
                  {{ speed }}x
                </li>
              </ul>
            </div>
          </div>
          <template v-if="muvi?.owner">
            <div class="muvi__menu--list" @click.stop="handleDescription">
              <EditIcon />
              <div class="muvi__menu--list-text">
                {{ $t('add_muvi.edit_muvi') }}
              </div>
            </div>
            <div class="muvi__menu--list" @click="isDropdownOpen = true">
              <VisibleIcon />
              <div class="muvi__menu--wrapper">
                <div class="muvi__menu--list-text">{{ $t('add_muvi.change_view') }}</div>
                <div class="muvi__menu--list-visible">{{ $t(selectedOption.name) }}</div>
              </div>
            </div>
            <div class="muvi__menu--list">
              <CommentsIcon />

              <div class="muvi__menu--list-wrapper">
                <div class="muvi__menu--list-text">{{ $t('add_muvi.disable_comments') }}</div>
                <BaseToggle :checked="false" />
              </div>
            </div>
            <div class="muvi__menu--list delete" @click="deleteShortVideo">
              <DeleteIcon />
              <div class="muvi__menu--list-text">{{ $t('add_muvi.delete_muvi') }}</div>
            </div>
            <form class="muvi__share--form" v-if="editDescription" @submit.prevent="editShortVideo">
              <textarea
                :placeholder="$t('chat.placeholder') + '...'"
                ref="textareaEl"
                @input="adjustTextareaHeight"
                :value="textareaValue"
              />
              <div class="muvi__share--submit mt-4">
                <SampleButton
                  :title="$t('chat.send')"
                  width="100%"
                  :size="14"
                  padding="15px"
                  type="submit"
                />
              </div>
            </form>
          </template>
          <div class="muvi__menu--list delete" @click="reportMuvi" v-else>
            <ComplainIcon />
            <div class="muvi__menu--list-text">{{ $t('buttons.complain') }}</div>
          </div>
        </div>
        <div class="muvi__menu--block" v-else>
          <div
            class="muvi__menu--list selecttion"
            v-for="(option, index) in options"
            :key="option.id"
            @click="handleSelect(index)"
          >
            <div class="muvi__add--dropdown-left">
              <div class="muvi__add--dropdown-top">
                <component :is="option.icon" /> <span>{{ $t(option.name) }}</span>
              </div>
              <div class="muvi__menu--list-visible">{{ $t(option.text) }}</div>
            </div>
            <CustomRadio :isSelected="option.isSelected" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <CommentReportModal v-if="isReportModalOpen" />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { ref, reactive, nextTick } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { getFormData } from '@/utils'

import PlaybackIcon from '@/components/icons/shorts/mobile/PlaybackIcon.vue'
import EditIcon from '@/components/icons/shorts/mobile/EditIcon.vue'
import VisibleIcon from '@/components/icons/shorts/mobile/VisibleIcon.vue'
import CommentsIcon from '@/components/icons/shorts/mobile/CommentsIcon.vue'
import DeleteIcon from '@/components/icons/shorts/mobile/DeleteIcon.vue'
import AvailableAllIcon from '@/components/icons/shorts/AvailableAllIcon.vue'
import SubscribesOnlyIcon from '@/components/icons/shorts/SubscribesOnlyIcon.vue'
import SubscriptionsOnlyIcon from '@/components/icons/shorts/SubscriptionsOnlyIcon.vue'
import CustomRadio from '@/components/ui/CustomRadio.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import CommentReportModal from '@/components/ui/modals/CommentReportModal.vue'
import ComplainIcon from '@/components/icons/MenuDetails/ComplainIcon.vue'

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false
  },
  playbackSpeed: {
    type: Number,
    default: 1
  },
  muvi: Object
})

const emit = defineEmits(['closeMenu', 'setPlaybackSpeed'])

const className = ref(false)
const selectedSpeed = ref(props.playbackSpeed)
const playbackSpeeds = ref([1, 1.25, 1.75, 2])
const textareaValue = ref(props.muvi?.description || '')
const textareaEl = ref()
const isDropdownOpen = ref(false)
const editDescription = ref(false)
const isLoading = ref(false)
const isReportModalOpen = ref(false)
const options = ref([
  {
    id: 1,
    isSelected: true,
    name: 'add_muvi.views_options.name1',
    text: 'add_muvi.views_options.text1',
    icon: 'available-all-icon'
  },
  {
    id: 2,
    isSelected: false,
    name: 'add_muvi.views_options.name2',
    text: 'add_muvi.views_options.text2',
    icon: 'subscribes-only-icon'
  },
  {
    id: 3,
    isSelected: false,
    name: 'add_muvi.views_options.name3',
    text: 'add_muvi.views_options.text3',
    icon: 'subscriptions-only-icon'
  }
])
const selectedOption = ref(options.value[0])

const payload = reactive({
  server_key: import.meta.env.VITE_SERVER_KEY,
  video_id: props.muvi?.id,
  description: '',
  privacy_type: 0 //0 - Available to everyone * 1 - Who is following me * 2 - Who am I
})

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

const handleDescription = () => {
  editDescription.value = !editDescription.value
  if (editDescription.value) {
    nextTick(() => {
      adjustTextareaHeight()
    })
  }
}

const handleClose = () => {
  className.value = true
  setTimeout(() => {
    emit('closeMenu')
    className.value = false
  }, 100)
}

const handleSpeedSelect = (speed) => {
  selectedSpeed.value = speed
  emit('setPlaybackSpeed', speed)
}

const handleSelect = async (index) => {
  options.value.forEach((option) => (option.isSelected = false))
  options.value[index].isSelected = true
  selectedOption.value = options.value[index]
  isDropdownOpen.value = false
  await editShortVideo({ ...payload, privacy_type: index })
}

const editShortVideo = async () => {
  try {
    isLoading.value = true
    const submitPayload = getFormData({ ...payload, description: textareaValue.value })

    await axios.post('/edit-short-video', submitPayload, {
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
    isLoading.value = false
    editDescription.value = false
  }
}
const deleteShortVideo = async () => {
  try {
    isLoading.value = true
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      video_id: props.muvi?.id
    })

    await axios.post('/delete-short-video', payload, {
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
    isLoading.value = false
    emit('closeMenu')
  }
}

const reportMuvi = async () => {
  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      video_id: props.muvi?.id,
      text: 'test',
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
    isReportModalOpen.value = true
  }
}
</script>

<script>
export default {
  components: { AvailableAllIcon, SubscribesOnlyIcon, SubscriptionsOnlyIcon }
}
</script>

<style lang="scss" scoped>
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
    background: var(--color-seashell);
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: var(--color-mine-shaft);
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

<template>
  <div class="call_message" :class="{ owner: isOwner }">
    <div
      class="call_message--icon"
      :class="{ initiated: callData?.status === 'initiated', ended: callData?.status === 'ended' }"
    >
      <PhoneIcon v-if="callData?.type === 'audioCall'" />
      <CameraOnIcon v-else />
    </div>
    <div class="call_message--wrapper">
      <template v-if="isOwner">
        <div class="call_message--text" v-if="callData?.status === 'ended'">
          <span v-if="callData?.type === 'videoCall'">Пропущенный видеозвонок</span>
          <span v-else>Пропущенный аудиоозвонок</span>
        </div>
        <div class="call_message--text" v-else>
          <span v-if="callData?.type === 'videoCall'">Видеозвонок</span>
          <span v-else>Аудиозвонок</span>
        </div>
      </template>
      <template v-else>
        <div class="call_message--text" v-if="callData?.status === 'ended'">Не отвечено</div>
        <div class="call_message--text" v-else-if="callData?.status === 'initiated'">
          <span v-if="callData?.type === 'videoCall'">Видеозвонок</span>
          <span v-else>Аудиозвонок</span>
        </div>
      </template>
      <div class="call_message--duration" v-if="isDuration">
        {{ formatTime(callData?.duration) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import PhoneIcon from '@/components/icons/RTCCall/PhoneIcon.vue'
import CameraOnIcon from '@/components/icons/RTCCall/CameraOnIcon.vue'

const props = defineProps({
  callData: Object,
  isOwner: Boolean
})

const isDuration = ref(true)

function formatTime(inputString) {
  const match = inputString.match(/(\d{2}):(\d{2}):(\d{2})/)
  if (!match) {
    return 'Invalid input format'
  }

  const hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const seconds = parseInt(match[3], 10)

  const formattedHours = hours > 0 ? hours + ':' : ''
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  if (seconds > 0 || minutes > 0 || hours > 0) {
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`
  } else {
    isDuration.value = false
  }
}
</script>

<style lang="scss" scoped>
.call_message {
  display: flex;
  align-items: center;
  gap: 8px;
  &.owner {
    .call_message--duration,
    .call_message--text {
      color: var(--color-stable-white);
    }
  }
  &--icon {
    min-width: 32px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.initiated {
      color: var(--color-hippie-blue);
    }
    &.ended {
      color: var(--color-valencia);
    }
    svg {
      display: block;
      width: 16px;
      height: 16px;
    }
  }
  &--wrapper {
    display: flex;
    flex-direction: column;
  }

  &--text {
    font-size: 16px;
    color: var(--color-mine-shaft);
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  &--duration {
    font-size: 14px;
    color: var(--color-mine-shaft);
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
}
</style>

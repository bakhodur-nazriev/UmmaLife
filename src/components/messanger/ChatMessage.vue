<template>
  <div class="message" :class="message?.messageOwner ? 'send' : 'recieve'">
    <div class="message__inner">
      <!-- <template v-if="video">
        :class="`${state} ${typeof message === 'object' ? 'forward' : ''}`"
        :class="{ 'video-message': (video || image) && !message }"
        <video-message :src="video.src" :poster="video.poster" />
      </template>
      <template v-if="image">
        <image-message :image="image" />
      </template> -->
      <div class="message__text" v-if="message?.messageType === 'text'">
        {{ message?.message }}
      </div>
      <!-- <div class="message__text" v-if="typeof message === 'object'">
        <div class="message__text--top">
          <span>{{ message.user_name }}</span>
          {{ message.user_message }}
        </div>
        {{ message.text }}
      </div> -->
      <div class="message__bottom">
        <span>{{ formatTime(message?.messageDate) }}</span>
        <preloader-icon v-if="message?.messageOwner && isLoading && isLastMessage" />
        <template v-else>
          <double-check-icon v-if="message?.messageOwner && message?.messageSeen" />
          <single-check-icon v-if="message?.messageOwner && !message?.messageSeen" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { timeFormat } from '@/mixins/timeFormat'
import DoubleCheckIcon from '@/components/icons/DoubleCheckIcon.vue'
import SingleCheckIcon from '@/components/icons/SingleCheckIcon.vue'
import PreloaderIcon from '@/components/icons/PreloaderIcon.vue'

import VideoMessage from '@/components/messanger/VideoMessage.vue'
import ImageMessage from '@/components/messanger/ImageMessage.vue'

export default {
  components: { DoubleCheckIcon, SingleCheckIcon, PreloaderIcon, VideoMessage, ImageMessage },
  props: {
    message: Object,
    isLoading: Boolean,
    isLastMessage: Boolean
  },
  mixins: [timeFormat]
}
</script>

<style lang="scss" scoped>
.message {
  margin-bottom: 8px;
  width: 100%;
  &__inner {
    padding: 14px 14px 26px;
    border-radius: 20px;
    max-width: 440px;
    width: fit-content;
    position: relative;
    min-width: 110px;
    overflow-wrap: break-word;
    overflow: hidden;
    &.video-message {
      padding: 0;
      border-radius: 10px;
      .message__bottom {
        background: rgba(31, 31, 31, 0.5);
        backdrop-filter: blur(10px);
        padding: 4px;
        border-radius: 4px;
      }
    }
  }

  &.send {
    .message__inner {
      background-color: var(--color-purple);
      margin-left: auto;
      color: var(--color-stable-white);
    }
  }
  &.recieve {
    .message__inner {
      background-color: var(--color-white);
      color: var(--color-mine-shaft);
    }
  }
  &__text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: 0.4px;
    white-space: pre-wrap;
    &--top {
      border-left: 2px solid var(--color-white);
      padding-left: 8px;
      margin-bottom: 10px;
      span {
        display: block;
        font-size: 14px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        margin-bottom: 2px;
      }
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
      white-space: nowrap;
    }
  }
  &__bottom {
    position: absolute;
    bottom: 5px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
      letter-spacing: 0.35px;
    }
    svg {
      width: 19px;
      height: 16px;
      display: block;
    }
  }
}
</style>

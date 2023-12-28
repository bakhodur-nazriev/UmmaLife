<template>
  <div
    class="message"
    :class="message?.messageOwner ? 'send' : 'recieve'"
    :data-messageId="message?.messageId"
  >
    <div
      class="message__inner"
      :class="{
        no__message: !message?.message && !message?.messageType.includes('file'),
        'video-message': message?.messageType.includes('video')
      }"
    >
      <ProgressSpinner
        v-if="isLastMessage && isFileLoading"
        class="progress--spinner"
        strokeWidth="6"
      />
      <template v-if="message?.messageType.includes('video')">
        <div class="video-temp" v-if="isLastMessage && isFileLoading">
          <video :src="message?.mediaData[0].src" />
        </div>
        <video-message :src="message?.mediaData[0].src" v-else />
      </template>
      <template v-if="message?.messageType.includes('image')">
        <image-message :image="message?.mediaData[0]" />
      </template>

      <a
        :href="message?.mediaData[0].src"
        download
        class="message__file"
        target="_blank"
        v-if="message?.messageType.includes('file')"
      >
        <div class="message__file--icon">
          <FileIcon />
        </div>
        <div class="message__file--text">
          <p>{{ message?.mediaData[0]?.title || 'File' }}</p>
        </div>
      </a>
      <div
        class="message__text"
        :class="{ 'video-text': message?.messageType.includes('video') }"
        v-if="message?.message && Object.keys(message?.replyMessage || {}).length === 0"
      >
        {{ message?.message }}
      </div>
      <div class="message__text" v-else-if="Object.keys(message?.replyMessage || {}).length > 0">
        <div class="message__text--top">
          <div class="message__text--reply">
            <div
              class="message__text--media"
              v-if="
                message?.replyMessage?.messageType &&
                !message?.replyMessage?.messageType?.includes('text')
              "
            >
              <img
                :src="message?.replyMessage?.mediaData[0]?.src"
                :alt="message?.replyMessage?.mediaData[0]?.title"
                v-if="message?.replyMessage?.messageType?.includes('image')"
              />
              <template v-else-if="message?.replyMessage?.messageType?.includes('video')">
                <VideoPlayIcon class="play" />
                <video :src="message?.replyMessage?.mediaData[0]?.src"></video>
              </template>
              <template v-else-if="message?.replyMessage?.messageType?.includes('file')">
                <FileIcon class="file" />
              </template>
            </div>
            <div class="message__text--content">
              <span>{{ message?.replyMessage?.messageAuthor }}</span>
              {{ message?.replyMessage?.message }}
            </div>
          </div>
        </div>
        {{ message.message }}
      </div>
      <div
        class="message__bottom"
        :class="{
          'message__bottom--video': message?.messageType.includes('video') && !message?.message
        }"
      >
        <span>{{ formatTime(message?.messageDate) }}</span>
        <preloader-icon
          v-if="message?.messageOwner && isLastMessage && (isLoading || isFileLoading)"
        />
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
import ProgressSpinner from 'primevue/progressspinner'
import FileIcon from '@/components/icons/FileIcon.vue'
import VideoPlayIcon from '../icons/VideoPlayIcon.vue'

export default {
  components: {
    DoubleCheckIcon,
    SingleCheckIcon,
    PreloaderIcon,
    VideoMessage,
    ImageMessage,
    ProgressSpinner,
    FileIcon,
    VideoPlayIcon
  },
  props: {
    message: Object,
    isLoading: Boolean,
    isLastMessage: Boolean,
    isFileLoading: Boolean
  },
  mixins: [timeFormat]
}
</script>

<style lang="scss" scoped>
.message {
  margin-bottom: 8px !important;
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
    @media (max-width: 767px) {
      padding: 8px 12px 15px 12px;
    }

    &.no__message {
      padding: 0;
      .image-component {
        top: 0;
      }
    }
    &.video-message {
      padding: 0;
      border-radius: 10px;
      max-height: 440px;
      video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
      .message__bottom {
        background: rgba(31, 31, 31, 0.5);
        backdrop-filter: blur(10px);
        padding: 4px;
        border-radius: 4px;
        &--video {
          bottom: 35px;
        }
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
    &.video-text {
      padding: 8px 14px;
    }
    &--top {
      border-left: 2px solid var(--color-hippie-blue);
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
    &--reply {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &--media {
      width: 37px;
      height: 37px;
      position: relative;
      & * {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      .play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 11px;
        height: 11px;
      }
      .file {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &--content {
      display: flex;
      flex-direction: column;
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

    @media (max-width: 767px) {
      gap: 2px;
      span {
        font-size: 12px;
      }
      svg {
        width: 12px;
        height: 10px;
      }
    }
  }
}
.progress--spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  width: 50px;
  height: 50px;
}
.video-temp {
  max-width: 440px;
  width: 100%;
  max-height: 600px;
}
.message__file {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-mine-shaft);
  min-width: 200px;
  gap: 14px;
}
</style>

<template>
  <div class="upload__audio">
    <div class="upload__audio--inner">
      <div class="muvi__mobile--nav white" v-if="width < 767">
        <div class="library__actions--btn" @click="emit('closeHandler')">
          <CloseFormIcon />
        </div>
        <div class="muvi__mobile--nav-title">{{ $t('audio.upload_video') }}</div>
        <div class="left"></div>
      </div>
      <div class="upload__audio--content">
        <AddAudioDrag />
        <AudioDownloadStatus @addAlbumHandler="emit('addAlbumHandler')" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useWindowSize } from '@vueuse/core'
import AddAudioDrag from '@/components/audio/download/AddAudioDrag.vue'
import AudioDownloadStatus from '@/components/audio/download/AudioDownloadStatus.vue'
import CloseFormIcon from '@/components/icons/comment/CloseFormIcon.vue'

const { width } = useWindowSize()
const emit = defineEmits(['closeHandler', 'addAlbumHandler'])
</script>

<style lang="scss" scoped>
.upload__audio {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100dvh;
  background-color: var(--color-white);
  z-index: 150;
  &--inner {
    height: 100%;
    overflow-y: scroll;
  }
  &--content {
    padding: 20px 16px;
    min-height: calc(100dvh - 64px);
    padding-bottom: 74px;
  }
}
</style>

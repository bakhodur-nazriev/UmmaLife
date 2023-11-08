<template>
  <div class="download__audio--box full">
    <div class="download__audio--title">
      {{ $t('audio.all_audios_for_download') }}
      <span>3 {{ $t('audio.files') }}</span>
    </div>
    <div class="download__state">
      <div class="download__state--name">Название аудиофайла56kbpr_....mp3</div>
      <div class="download__state--status success">{{ $t('audio.status_success') }}</div>
      <CloseCircle class="download__state--close" />
    </div>
    <div class="download__state">
      <div class="download__state--name">Название аудиофайла56kbpr_....mp3</div>
      <div class="download__state--status waiting">
        <WaitingYellowIcon />
        {{ $t('audio.status_pending') }}
      </div>
      <CloseCircle class="download__state--close" />
    </div>
    <div class="download__state">
      <div class="download__state--name">Название аудиофайла56kbpr_....mp3</div>
      <div class="download__state--status alert">{{ $t('audio.status_fail') }}</div>
      <CloseCircle class="download__state--close" />
    </div>
  </div>
  <div class="download__audio--actions">
    <button type="submit" class="download__audio--btn primary">
      {{ $t('audio.download_to_playlist') }}
    </button>
    <button type="button" class="download__audio--btn secondary" @click="emit('addAlbumHandler')">
      {{ $t('audio.create_as_album') }}
    </button>
    <button type="button" class="download__audio--btn default">
      {{ $t('audio.cancel') }}
    </button>
  </div>
</template>

<script setup>
/* eslint-disable */
import CloseCircle from '@/components/icons/CloseCircle.vue'
import WaitingYellowIcon from '@/components/icons/WaitingYellowIcon.vue'

const emit = defineEmits(['addAlbumHandler'])
</script>

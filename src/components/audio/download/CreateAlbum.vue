<template>
  <div class="download__audio--box">
    <div class="download__audio--title secondary">{{ $t('audio.create_album') }}</div>
    <div class="download__audio--subtitle">
      {{ $t('audio.album_subtitle') }}
    </div>

    <div class="album__form--wrapper">
      <div class="album__form--file">
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          multiple
          @change="inputHandler"
        />
        <CameraIcon />
      </div>
      <input class="album__form--input" type="text" :placeholder="$t('audio.album_input')" />
    </div>
    <textarea
      class="album__form--input album__form--textarea"
      type="text"
      :placeholder="$t('audio.album_textarea')"
    />
  </div>
</template>

<script setup>
import CameraIcon from '@/components/icons/CameraIcon.vue'
const inputHandler = (event) => {
  // TODO
}
</script>

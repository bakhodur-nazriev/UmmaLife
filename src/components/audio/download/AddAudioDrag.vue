<template>
  <div class="download__audio--box">
    <div class="download__audio--title">{{ $t('audio.add_audio') }}</div>
    <div
      class="create__group--drop add__audio"
      @dragover.prevent
      @dragleave.prevent
      @drop.prevent="drop"
    >
      <input type="file" accept="audio/mp3" multiple />
      <div class="add__audio--svg">
        <AudioDropdownIcon />
      </div>
      <div class="add__audio--content">
        <p>{{ $t('audio.drop_title') }}</p>
        <span>{{ $t('audio.drop_subtitle') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import AudioDropdownIcon from '@/components/icons/audio/AudioDropdownIcon.vue'
const drop = (event) => {
  // TODO
}
</script>

<style lang="scss" scoped>
.add__audio {
  @media (max-width: 767px) {
    justify-content: center;
    flex-direction: row;
    border: 1px solid var(--color-gallery-first);
    height: auto;
    padding: 12px 10px;
    border-radius: 10px;
    gap: 10px;
    &--svg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background-color: var(--color-seashell);
    }
    svg {
      width: 20px;
      height: 20px;
      margin-bottom: 0;
    }
    &--content {
      text-align: left;
      display: flex;
      flex-direction: column;
      p {
        margin: 0;
        font-size: 14px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>

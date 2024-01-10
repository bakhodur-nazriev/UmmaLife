<template>
  <div class="audio__page--container">
    <form class="download__audio">
      <div class="download__audio--left">
        <AddAudioDrag />
        <CreateAlbum />
      </div>
      <div class="download__audio--right">
        <AudioDownloadStatus />
      </div>
    </form>
  </div>
</template>

<script setup>
import AddAudioDrag from '@/components/audio/download/AddAudioDrag.vue'
import CreateAlbum from '@/components/audio/download/CreateAlbum.vue'
import AudioDownloadStatus from '@/components/audio/download/AudioDownloadStatus.vue'
</script>

<style lang="scss">
.download__audio {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 25px;

  &--box {
    background-color: var(--color-white);
    border-radius: 15px;
    padding: 24px;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    &.full {
      height: calc(100% - 72px);
    }
    @media (max-width: 767px) {
      padding: 0;
      &.full {
        height: auto;
      }
    }
  }
  &--title {
    font-size: 20px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 20px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-silver-chalice);
    }
    @media (max-width: 767px) {
      font-size: 14px;
      margin-bottom: 12px;
      span {
        font-size: 14px;
        font-weight: 400;
      }
    }
    &.secondary {
      margin-bottom: 4px;
    }
  }
  &--subtitle {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-silver-chalice);
    margin-bottom: 16px;
  }
  .album__form--wrapper {
    margin-bottom: 16px;
  }
  .album__form--textarea {
    height: 180px;
    width: 100%;
    resize: none;
  }
  &--actions {
    display: flex;
    gap: 10px;
    @media (max-width: 767px) {
      position: fixed;
      bottom: 0;
      left: 0;
      border-top: 1px solid var(--color-gallery-first);
      width: 100%;
      padding: 12px 16px;
      background-color: var(--color-white);
    }
  }
  &--btn {
    flex-grow: 1;
    padding: 15px;
    border-radius: 10px;
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    border: 1px solid transparent;
    cursor: pointer;
    &.primary {
      background-color: var(--color-green);
      color: var(--color-white);
    }
    &.secondary {
      color: var(--color-green);
      border-color: var(--color-green);
    }
    &.default {
      background-color: var(--color-alto-second);
      color: var(--color-silver-chalice);
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
}
.download__state {
  display: flex;
  align-items: center;
  padding: 11px 24px;
  border-radius: 15px;
  margin-bottom: 8px;
  border: 1px solid var(--color-silver-chalice);
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: calc(100% - 32px) 20px;
    gap: 12px;
    padding: 16px;
    border: 1px solid var(--color-gallery-first);
  }
  &--name {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    width: 340px;
    margin-right: 50px;
    color: var(--color-mine-shaft);
    @media (max-width: 767px) {
      margin-right: 0;
      width: 100%;
      word-break: break-all;
    }
  }
  &--status {
    width: 211px;
    border-radius: 12px;
    text-align: center;
    border: none;
    outline: none;
    padding: 14px 12px 12px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    margin-right: 24px;
    @media (max-width: 767px) {
      order: 1;
      margin-right: 0;
    }
    &.success {
      background: #edf7ed;
      color: #53af50;
    }
    &.waiting {
      background: #ffefc1;
      color: #d8a000;
    }
    &.alert {
      background: #ffe7e7;
      color: var(--color-valencia);
    }
  }
  &--close {
    max-width: 32px;
    width: 100%;
    height: 32px;
    display: block;
  }
}
</style>

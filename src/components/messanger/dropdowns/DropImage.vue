<template>
  <div class="drop__window">
    <GalleryAddIcon />
    <p>Перетащите сюда файл для загрузки</p>
  </div>
</template>

<script setup>
import GalleryAddIcon from '@/components/icons/GalleryAddIcon.vue'
</script>

<style lang="scss">
.drop__window {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background-color: var(--color-seashell);
  opacity: 0.95;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    margin: 16px 0;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-silver-chalice);
    padding: 0;
  }
}
</style>

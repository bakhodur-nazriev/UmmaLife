<template>
  <div class="albums__carousel">
    <div class="albums__carousel--wrapper" :class="{ active: showMore }">
      <div class="albums__carousel--card" v-for="file in files" :key="file.id">
        <img :src="file.src" :alt="file.src" />
        <div class="remove-file" @click="$emit('removeFile', file.id)">
          <remove-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
export default {
  components: { RemoveIcon },
  props: { files: Array, showMore: Boolean },
  emits: ['removeFile']
}
</script>

<style lang="scss">
.albums__carousel {
  width: 100%;
  &--wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 4px;
    max-height: 108px;
    overflow: hidden;
    &.active {
      max-height: fit-content;
      overflow: visible;
    }
  }
  &--card {
    width: 100%;
    height: 108px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    &:hover > .remove-file {
      opacity: 1;
    }

    .remove-file {
      position: absolute;
      top: 8px;
      right: 7px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      z-index: 10;
      background: rgba(31, 31, 31, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: all 0.3s;
      cursor: pointer;
    }
  }
}
</style>

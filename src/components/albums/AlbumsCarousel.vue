<template>
  <div class="albums__carousel">
    <swiper :modules="[Navigation]" :slides-per-view="6" :space-between="8" navigation>
      <swiper-slide v-for="file in files" :key="file.id">
        <img :src="file.src" :alt="file.src" />
        <div class="remove-file" @click="emit('removeFile', file.id)">
          <remove-icon />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
/* eslint-disable */
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
defineProps({
  files: Array
})

const emit = defineEmits(['removeFile'])
</script>

<style lang="scss">
.albums__carousel {
  width: 100%;
  .swiper-slide {
    width: 104px;
    height: 104px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    &:hover > .remove-file {
      opacity: 1;
    }
    .remove-file {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(31, 31, 31, 0.5);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s;
      svg {
        width: 10px;
        height: 10px;
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba($color: #49a399, $alpha: 0.8);
    top: 56%;
    background-image: url('@/assets/images/arrow-right.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 20px 20px;
    user-select: none;
    &.swiper-button-disabled {
      opacity: 0;
    }
    &::after {
      display: none;
    }
  }
  .swiper-button-prev {
    rotate: 180deg;
  }
}
</style>

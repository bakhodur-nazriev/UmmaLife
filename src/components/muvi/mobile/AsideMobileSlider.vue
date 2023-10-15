<template>
  <div class="muvi__feeds--aside" :class="{ active: isSwipedLeft }">
    <div class="muvi__feeds--aside-top" ref="asideTop">
      <p>Другие MUVI</p>
      <span>48</span>
    </div>
    <swiper
      ref="side_slider"
      class="muvi__feeds--aside-slider"
      :slides-per-view="'auto'"
      :direction="'vertical'"
      :space-between="4"
      :slide-to-clicked-slide="true"
      :loop="true"
    >
      <swiper-slide v-for="muvi in muvies" :key="muvi.id" class="muvi__feeds--aside-card">
        <img :src="muvi.img" :alt="muvi.title" />
        <ShortsPlay />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
/* eslint-disable */
import { Swiper, SwiperSlide } from 'swiper/vue'
import { muvies } from '@/dummy.js'

import ShortsPlay from '@/components/icons/shorts/ShortsPlay.vue'

const props = defineProps({
  isSwipedLeft: Boolean
})
</script>

<style lang="scss">
.muvi__feeds {
  &--aside {
    width: 56px;
    position: fixed;
    top: 40px;
    right: -100%;
    height: calc(100dvh - 138px);
    z-index: 10;
    transition: all 0.3s ease-in-out;
    &.active {
      right: 4px;
    }
    &-top {
      padding: 5px;
      text-align: center;
      width: 100%;
      border-radius: 4px;
      background: var(--gray-rgba);
      backdrop-filter: blur(5px);
      color: var(--color-white);

      display: flex;
      flex-direction: column;
      gap: 4px;
      p {
        padding: 0;
        margin: 0;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
      }
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
      }
    }
    &-slider {
      max-height: calc(100% - 52px);
    }
    &-card {
      max-height: 100px;
      border-radius: 4px;
      border: 1px solid var(--color-silver-chalice);
      overflow: hidden;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.2);
        position: absolute;
        transition: all 0.3s;
        opacity: 0;
      }
      &.swiper-slide-active {
        border-color: var(--color-hippie-blue);
        &::after,
        svg {
          opacity: 1;
        }
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }
    }
  }
}
</style>

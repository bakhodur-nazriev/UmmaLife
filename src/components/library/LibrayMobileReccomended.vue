<template>
  <div class="book__recomended-mobile">
    <div class="book__recomended--title">{{ $t(title) }}:</div>
    <swiper class="book__swiper" :slides-per-view="'auto'" :space-between="9">
      <swiper-slide v-for="book in books" :key="book.id" class="book__swiper--slide">
        <router-link :to="`/${$i18n.locale}/library/${book.id}`" v-if="isBook">
          <div class="book__swiper--img">
            <img :src="book.img" :alt="book.name" />
          </div>
          <div class="book__swiper--name">{{ book.name }}</div>
        </router-link>
        <div v-else>
          <div class="book__swiper--img">
            <img :src="book.img" :alt="book.name" />
          </div>
          <div class="book__swiper--name">{{ book.name }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
/* eslint-disable */
import { Swiper, SwiperSlide } from 'swiper/vue'
import { books } from '@/dummy.js'
const props = defineProps(['title', 'isBook'])
</script>

<style lang="scss">
.book__recomended-mobile {
  display: flex;
  flex-direction: column;
  width: 100%;
  .swiper {
    width: 100%;
    @media (max-width: 767px) {
      width: calc(100vw - 32px);
    }
  }
  .book__recomended--title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 12px;
  }
  .book__swiper--slide {
    width: 150px;
    a {
      text-decoration: none;
      width: 100%;
      display: block;
    }
  }
  .book__swiper--img {
    width: 100%;
    height: 214px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 8px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .book__swiper--name {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;

    color: var(--color-mine-shaft);
  }
}
</style>

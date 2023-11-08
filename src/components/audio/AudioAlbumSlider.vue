<template>
  <swiper
    :slides-per-view="'auto'"
    :space-between="10"
    class="albums__swiper"
    navigation
    :modules="[Navigation]"
  >
    <swiper-slide v-for="i in 10" :key="i">
      <AudioAlbumCard />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import AudioAlbumCard from '@/components/audio/AudioAlbumCard.vue'

export default {
  components: { AudioAlbumCard, Swiper, SwiperSlide },
  data() {
    return {
      Navigation
    }
  }
}
</script>

<style lang="scss">
.albums__swiper {
  overflow: visible !important;
  position: relative;
  margin-bottom: 16px;
  @media (max-width: 767px) {
    border-bottom: 1px solid var(--color-silver-chalice);
    padding-bottom: 24px !important;
    margin-bottom: 24px;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    background: var(--color-seashell);
    display: block;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: -90%;
    background-image: var(--audio-gradient);
    display: block;
    width: 100%;
    height: 100%;
    z-index: 10;
    @media (max-width: 767px) {
      background-image: none;
    }
  }
  .swiper-slide {
    width: 350px;
    @media (max-width: 767px) {
      width: 140px;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 60px;
    height: 60px;
    z-index: 20;
    border-radius: 50%;
    background: var(--color-hippie-blue);
    @media (max-width: 767px) {
      display: none;
    }
    &:after {
      content: '';
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M8.125 5.78711L12.2629 9.92505L8.125 14.063' stroke='white' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 40px 40px;
    }
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  .swiper-button-prev {
    rotate: 180deg;
  }
}
</style>

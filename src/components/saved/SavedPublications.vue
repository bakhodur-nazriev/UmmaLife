<template>
  <div class="posts__wrapper">
    <div class="posts">
      <div class="publications">
        <swiper-slide class="publications__tabs">
          <swiper class="saved__swiper--wrapper" :space-between="8" :slides-per-view="5">
            <swiper-slide
              class="saved__swiper--slide"
              v-for="(tab, index) in tabs"
              :key="`tab_${index + 1}`"
              :class="{ active: activeIndex === index }"
              @click="clickHandler(index)"
            >
              {{ $t(tab) }}
            </swiper-slide>
          </swiper>
          <div class="publications__tabs--content">
            <PublishedNews v-if="activeIndex === 0" />
            <PublishedArticles v-else-if="activeIndex === 1" />
            <PublishedPhotos v-else-if="activeIndex === 2" />
            <PublishedVideos v-else-if="activeIndex === 3" />
            <PublishedAudios v-else-if="activeIndex === 4" />
            <ProfileUmmaShorts v-else-if="activeIndex === 5" />
            <ProfileUmmaVideo v-else-if="activeIndex === 6" />
          </div>
        </swiper-slide>
      </div>
    </div>
  </div>
</template>

<script>
import PublishedNews from '@/components/profile/publications/PublishedNews.vue'
import PublishedArticles from '@/components/profile/publications/PublishedArticles.vue'
import PublishedPhotos from '@/components/profile/publications/PublishedPhotos.vue'
import PublishedVideos from '@/components/profile/publications/PublishedVideos.vue'
import PublishedAudios from '@/components/profile/publications/PublishedAudios.vue'
import ProfileUmmaShorts from '@/components/profile/tabs/ProfileUmmaShorts.vue'
import ProfileUmmaVideo from '@/components/profile/tabs/ProfileUmmaVideo.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

export default {
  components: {
    PublishedNews,
    PublishedArticles,
    PublishedPhotos,
    PublishedVideos,
    PublishedAudios,
    ProfileUmmaShorts,
    ProfileUmmaVideo,
    Swiper,
    SwiperSlide
  },
  data: () => ({
    activeIndex: 0,
    isDown: false,
    scrollX: null,
    startX: null
  }),
  computed: {
    tabs: () => [
      'tabs.profile_tabs.news',
      'tabs.profile_tabs.articles',
      'tabs.profile_tabs.photo',
      'tabs.profile_tabs.video',
      'tabs.profile_tabs.audio',
      'tabs.profile_tabs.muvi',
      'tabs.profile_tabs.umma_video'
    ]
  },
  methods: {
    clickHandler(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.saved__swiper {
  &--wrapper {
    // display: flex;
    padding: 24px;
    background: var(--color-white);
    border-radius: 15px;
  }
  &--slide {
    width: fit-content !important;
    min-width: 124px;
    cursor: pointer;
    padding: 16px;
    border-radius: 12px;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-silver-chalice);
    border: 1px solid var(--color-seashell);
    &.active {
      background: var(--color-seashell);
      color: var(--color-mine-shaft);
    }
  }
}
</style>

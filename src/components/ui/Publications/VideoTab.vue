<template>
  <div class="video-block">
    <article class="video-block__article" v-for="i in 10" :key="i">
      <VideoHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <VideoContent />

      <SampleDivider />

      <VideoFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import SampleDivider from '@/components/ui/SampleDivider.vue'
import VideoHeader from '@/components/ui/Publications/Video/VideoHeader.vue'
import VideoContent from '@/components/ui/Publications/Video/VideoContent.vue'
import VideoFooter from '@/components/ui/Publications/Video/VideoFooter.vue'

export default {
  components: {
    VideoFooter,
    VideoContent,
    VideoHeader,
    SampleDivider
  },
  data () {
    return {
      isMenuOpen: false,
      isReactionWindowOpen: false,
      isShareWindowOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped lang="scss">
.video-author__section {
  display: flex;
  flex-direction: column;
}

.video-block {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__article {
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-radius: 15px;
    row-gap: 8px;
    background-color: var(--color-white);
  }
}

.description__video--section {
  display: flex;
  flex-direction: column;
  row-gap: 6px;

  .video__title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.2;
  }
}

.video__main--section {
  position: relative;
  display: flex;

  .video__image {
    width: 100%;
  }
  .menu__detail--button {
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    padding: 2px;
    border: none;
    background-color: rgba(0, 0, 0, 0.2)
  }

  .video__time {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: var(--color-white);
    padding: 4px 6px;
    background-color: var(--color-mine-shaft);
    backdrop-filter: blur(20px);
    border-radius: 5px;
    font-size: 12px;
  }
}

.video__date--section {
  color: var(--color-gray);
}

.author__video--section {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--color-gray);
}

@media (max-width: 576px) {
  .video-block__article {
    border-radius: 0;
  }
}
</style>
<template>
  <section class="article-content__section">
    <div class="article-content__section-item">
      <div class="custom-video__container">
        <div class="play-icon__button">
          <VideoPlayIcon class="play-icon__button-icon"/>
        </div>
        <video
          controls
          class="custom-video-player"
          poster="@/assets/images/Post_1.png"
        >
          <source
            src="path/to/video.mp4"
            type="video/mp4"
          >
        </video>
      </div>
      <div class="article-content__detail__block">
        <span class="article-content__detail__block-views">20.08.2022 - 1 тыс.{{ $t('video.views') }}</span>
      </div>
    </div>

    <div class="article-content__reactions">
      <div class="article-content__reactions-block">
        <div
          v-for="(reaction, index) in reactions"
          :key="index"
          class="reaction"
        >
          <component :is="reaction.icon"/>
          <span>{{ reaction.count }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
export default {
  components: {
    VideoPlayIcon
  },
  data () {
    return {
      reactions: [
        { icon: LikeIcon, count: 1550 },
        { icon: DislikeIcon, count: 2351 },
        { icon: LoveIcon, count: 1987 },
        { icon: FireIcon, count: 2358 },
        { icon: AngryIcon, count: 7462 },
        { icon: ScaredIcon, count: 7894 },
        { icon: LaughIcon, count: 5671 },
        { icon: ThinkIcon, count: 9874 },
        { icon: SadIcon, count: 9876 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.custom-video__container {
  position: relative;
}

.custom-video-player {
  width: 100%;
}

.play-icon__button {
  cursor: pointer;
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-hippie-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

video::-webkit-media-controls {
  display: none !important;
}

video::-webkit-media-controls-enclosure {
  display: none !important;
}

.article-content__detail__block {
  line-height: 1;

  &-views {
    color: var(--color-silver-chalice);
    font-size: 20px;
  }
}

.article-content__section {
  display: flex;
  flex-direction: column;
  gap: 14px;

  &-item {
    display: flex;
    flex-direction: column;
    row-gap: 14px;
  }
}

.article__content--image {
  width: 100%;
  border-radius: 15px;
  height: 80%;
}

.article-content__reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

.article-content__reactions-block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  .reaction {
    height: 32px;
    border-radius: 50px;
    padding: 8px 12px;
    width: auto;
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 14px;
    color: var(--color-silver-chalice);
    background-color: var(--color-gallery-second);
  }
}
</style>

<template>
  <section class="article-content__section">
    <div class="article-content__section-item">
      <div class="custom-video__container">
        <div class="play-icon__button">
          <VideoPlayIcon class="play-icon__button-icon"/>
          <SmallVideoPlayIcon class="play-icon__button-icon-small"/>
        </div>
        <video
          controls
          class="custom-video-player"
          poster="@/assets/images/video_example.png"
        >
          <source
            src="path/to/video.mp4"
            type="video/mp4"
          >
        </video>
      </div>
      <div class="article-content__details-block">
        <h3 class="article-content__details-block-title">Как я принял ислам. Все от А до Я</h3>
        <span class="article-content__details-block-views">20.08.2022 - 1 тыс.{{ $t('video.views') }}</span>
      </div>
    </div>

    <div class="article-content__reactions">
      <PostReactions />
    </div>
  </section>
</template>

<script>
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import PostReactions from '@/components/ui/Post/PostReactions.vue'
export default {
  components: {
    PostReactions,
    SmallVideoPlayIcon,
    VideoPlayIcon
  }
}
</script>

<style scoped lang="scss">
.custom-video__container {
  display: flex;
  position: relative;
}

.custom-video-player {
  width: 100%;
  border-radius: 12px;
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

  &-icon-small {
    display: none;
  }
}

video::-webkit-media-controls {
  display: none !important;
}

video::-webkit-media-controls-enclosure {
  display: none !important;
}

.article-content {
  &__details-block {
    line-height: 1;

    &-title {
      font-size: 20px;
    }

    &-views {
      color: var(--color-silver-chalice);
      font-size: 20px;
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 14px;

    &-item {
      display: flex;
      flex-direction: column;
      row-gap: 14px;
    }
  }

  &__reactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }
}

@media (max-width: 576px) {
  .article-content {
    &__reactions {
      padding: 0 16px;
    }

    &__details-block {
      padding: 0 16px;
      line-height: 1;

      &-title {
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 4px;
      }

      &-views {
        font-size: 12px;
      }
    }
  }

  .custom-video-player {
    border-radius: 0;
  }

  .play-icon__button {
    width: 40px;
    height: 40px;

    &-icon {
      display: none;
    }

    &-icon-small {
      display: block;
    }
  }
}
</style>

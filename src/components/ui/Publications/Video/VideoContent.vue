<template>
  <section class="article-content__section">
    <div class="article-content__section-item">
      <div class="custom-video__container">
        <VideoPlayer
            src="/video/video.mp4"
            poster="/images/message/video-poster.jpg"
            controls
            :volume="1"
        >
          <template v-slot="{ player, state }">
            <div class="custom-player-controls">
              <div
                  v-if="!state.playing"
                  @click="state.playing ? player.pause() : player.play()"
                  class="play-button"
              >
                <VideoPlayIcon class="play-icon__button-icon-big"/>
                <SmallVideoPlayIcon class="play-icon__button-icon-small"/>
              </div>
            </div>
          </template>
        </VideoPlayer>
      </div>
      <div class="article-content__details-block">
        <h3 class="article-content__details-block-title">Как я принял ислам. Все от А до Я</h3>
        <span class="article-content__details-block-views">20.08.2022 - 1 тыс.{{ $t('video.views') }}</span>
      </div>
    </div>

    <div class="article-content__reactions">
      <PostReactions/>
    </div>
  </section>
</template>

<script>
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import PostReactions from '@/components/ui/Post/PostReactions.vue'
import {VideoPlayer} from '@videojs-player/vue'

export default {
  components: {
    PostReactions,
    SmallVideoPlayIcon,
    VideoPlayIcon,
    VideoPlayer
  },
  props: ['videoContent'],
  mounted() {
    console.log(this.videoContent)
  }
}
</script>

<style lang="scss">
.custom-video__container {
  display: flex;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  height: 400px;

  .video-js {
    width: 100% !important;
    height: 100% !important;
    display: block;
    background: transparent;

    .vjs-poster img {
      object-fit: cover;
    }

    .vjs-tech {
      object-fit: cover !important;
      object-position: center !important;
      overflow: hidden;
    }

    .vjs-big-play-button {
      display: none !important;
    }
  }
}

.custom-player-controls {
  .remaining-time {
    position: absolute;
    top: 16px;
    left: 18px;
    z-index: 10;
    padding: 4px 6px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: var(--color-white);
    border-radius: 6px;
    background: rgba(31, 31, 31, 0.5);
    backdrop-filter: blur(10px);
    min-width: 50px;
    text-align: center;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    // background-color: rgba($color: var(--color-hippie-blue), $alpha: 0.6);
    background: rgba(73, 163, 153, 0.6);
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    cursor: pointer;
  }
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

.article-content {
  &__details-block {
    line-height: 1;

    &-title {
      font-size: 20px;
      margin-top: 0;
      margin-bottom: 10px;
      color: var(--color-mine-shaft);
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
  .custom-video__container {
    height: 200px;
  }

  .custom-player-controls {
    height: 200px;

    .play-button {
      width: 40px;
      height: 40px;
    }
  }

  .play-icon__button-icon-big {
    display: none;
  }

  .article-content {
    &__reactions {
      padding: 0;
    }

    &__details-block {
      padding: 0;
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

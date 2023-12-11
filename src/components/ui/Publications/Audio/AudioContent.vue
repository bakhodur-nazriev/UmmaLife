<template>
  <section class="audio-content__section">
    <div class="audio-content__section-item">
      <div class="audio-content__left-side">
        <div class="play-button">
          <SmallVideoPlayIcon/>
          <!--          <audio controls>-->
          <!--            <source src="" type="">-->
          <!--            <source src="" type="">-->
          <!--          </audio>-->
        </div>
        <div class="audio-content__right-side">
          <p class="audio-title">اينما تكونوا يدرككم الماينما تكونوا يدرككم الموت ❤️ تلاوة نديه م ...</p>
          <h3 class="author-name">Авраам Тарик Мухаммад</h3>
        </div>
      </div>

      <div class="audio-content__audio-time">
        <span>{{ audioFormattedDuration }}</span>
      </div>
    </div>

    <div class="audio-content__reactions">
      <PostReactions/>
    </div>
  </section>
</template>
<script>
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import PostReactions from '@/components/ui/Post/PostReactions.vue'

export default {
  components: {
    PostReactions,
    SmallVideoPlayIcon
  },
  props: ['audioContent'],
  computed: {
    audioFormattedDuration() {
      return this.audioContent.postFileArray[0].duration.split('T')[1]
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.audio-content {
  &__reactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;

      .play-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: var(--color-hippie-blue);
        min-width: 40px;
        height: 40px;
      }
    }
  }

  &__audio-time {
    color: var(--color-silver-chalice);
  }

  &__left-side {
    display: flex;
    align-items: center;
    gap: 12px;

    .audio-title,
    .author-name {
      margin: 0;
    }
  }

  &__right-side {
    .audio-title {
      font-size: 16px;
      color: var(--color-mine-shaft);
    }

    .author-name {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-mine-shaft);
    }
  }
}

@media (max-width: 576px) {
  .audio-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .audio-content__audio-time {
    span {
      font-size: 14px;
    }
  }

  .audio-content__right-side {
    .author-name {
      font-size: 14px;
    }
  }
}
</style>

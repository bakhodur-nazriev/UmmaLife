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

      <div class="audio-content__audio-time"><span>04:25</span></div>
    </div>

    <div class="audio-content__reactions">
      <div class="audio-content__reactions-block">
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
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'

export default {
  components: {
    SmallVideoPlayIcon
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
.audio-content {
  &__reactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;

    &-block {
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
</style>

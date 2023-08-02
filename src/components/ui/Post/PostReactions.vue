<template>
  <div class="reactions__block">
    <div
      v-for="(reaction, index) in reactions"
      :key="index"
      class="reaction"
    >
      <component :is="reaction.icon"/>
      <span>{{ reaction.count }}</span>
    </div>
  </div>
</template>

<script>
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'

export default {
  components: {
    LoveIcon,
    LikeIcon,
    FireIcon,
    AngryIcon,
    ScaredIcon,
    LaughIcon,
    ThinkIcon,
    SadIcon,
    DislikeIcon
  },
  data() {
    return {
      reactions: [
        { icon: LikeIcon, count: 4321 },
        { icon: DislikeIcon, count: 5467 },
        { icon: LoveIcon, count: 1234 },
        { icon: FireIcon, count: 3214 },
        { icon: AngryIcon, count: 5463 },
        { icon: ScaredIcon, count: 6412 },
        { icon: LaughIcon, count: 8521 },
        { icon: ThinkIcon, count: 1472 },
        { icon: SadIcon, count: 3698 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.reactions__block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  .reaction {
    height: 32px;
    background: var(--color-seashell);
    border-radius: 8px;
    padding: 8px 12px;
    color: var(--color-silver-chalice);
    width: auto;
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .reactions__block {
    .reaction {
      height: 28px;
      padding: 8px;
      gap: 4px;
      font-size: 12px;
    }
  }
}

@media (min-width: 1280px) {
  .reactions__block {
    max-width: 560px;
  }
}

@media (min-width: 1920px) {
  .reactions__block {
    max-width: 100%;
  }
}
</style>

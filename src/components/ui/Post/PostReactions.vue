<template>
  <div class="reactions__block">
    <div v-for="(reaction, index) in reactions" :key="index" class="reaction">
      <component :is="reaction.icon" />
      <span>{{ reaction.count }}</span>
    </div>
  </div>
</template>

<script>
import LikeIcon from '@/components/icons/reactions/men/small/SmallLikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/SmallDislikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/SmallLoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/SmallFireIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/SmallAngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/SmallScaredIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/SmallLaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/SmallThinkIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SmallSadIcon.vue'

export default {
  data() {
    return {
      reactions: [
        { id: 1, icon: 'LikeIcon', count: 4321 },
        { id: 2, icon: 'DislikeIcon', count: 5467 },
        { id: 3, icon: 'LoveIcon', count: 1234 },
        { id: 4, icon: 'FireIcon', count: 3214 },
        { id: 5, icon: 'AngryIcon', count: 5463 },
        { id: 6, icon: 'ScaredIcon', count: 6412 },
        { id: 7, icon: 'LaughIcon', count: 8521 },
        { id: 8, icon: 'ThinkIcon', count: 1472 },
        { id: 9, icon: 'SadIcon', count: 3698 }
      ]
    }
  },
  components: {
    LikeIcon,
    DislikeIcon,
    LoveIcon,
    FireIcon,
    AngryIcon,
    ScaredIcon,
    LaughIcon,
    ThinkIcon,
    SadIcon
  }
}
</script>

<style scoped lang="scss">
.reactions__block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  cursor: pointer;

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

    svg {
    }
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
}

@media (min-width: 1920px) {
  .reactions__block {
    max-width: 100%;
  }
}
</style>

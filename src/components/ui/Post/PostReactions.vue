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
/* Male */
import LikeIconMale from '@/components/icons/reactions/men/small/SmallLikeIcon.vue'
import DislikeIconMale from '@/components/icons/reactions/men/small/SmallDislikeIcon.vue'
import LoveIconMale from '@/components/icons/reactions/men/small/SmallLoveIcon.vue'
import FireIconMale from '@/components/icons/reactions/men/small/SmallFireIcon.vue'
import AngryIconMale from '@/components/icons/reactions/men/small/SmallAngryIcon.vue'
import ScaredIconMale from '@/components/icons/reactions/men/small/SmallScaredIcon.vue'
import LaughIconMale from '@/components/icons/reactions/men/small/SmallLaughIcon.vue'
import ThinkIconMale from '@/components/icons/reactions/men/small/SmallThinkIcon.vue'
import SadIconMale from '@/components/icons/reactions/men/small/SmallSadIcon.vue'

/* Female */
import LikeIconFemale from '@/components/icons/reactions/women/small/LikeIcon.vue'
import DislikeIconFemale from '@/components/icons/reactions/women/small/DislikeIcon.vue'
import LoveIconFemale from '@/components/icons/reactions/women/small/LoveIcon.vue'
import FireIconFemale from '@/components/icons/reactions/women/small/FireIcon.vue'
import AngryIconFemale from '@/components/icons/reactions/women/small/AngryIcon.vue'
import ScaredIconFemale from '@/components/icons/reactions/women/small/ScaredIcon.vue'
import LaughIconFemale from '@/components/icons/reactions/women/small/LaughIcon.vue'
import ThinkIconFemale from '@/components/icons/reactions/women/small/ThinkIcon.vue'
import SadIconFemale from '@/components/icons/reactions/women/small/SadIcon.vue'

export default {
  components: {
    LikeIconMale,
    DislikeIconMale,
    LoveIconMale,
    FireIconMale,
    AngryIconMale,
    ScaredIconMale,
    LaughIconMale,
    ThinkIconMale,
    SadIconMale,
    LikeIconFemale,
    DislikeIconFemale,
    LoveIconFemale,
    FireIconFemale,
    AngryIconFemale,
    ScaredIconFemale,
    LaughIconFemale,
    ThinkIconFemale,
    SadIconFemale
  },
  props: ['reaction'],
  data() {
    return {
      reactions: [
        {id: 1, icon: 'LikeIconMale', count: 4321},
        {id: 2, icon: 'DislikeIconMale', count: 5467},
        {id: 3, icon: 'LoveIconMale', count: 1234},
        {id: 4, icon: 'FireIconMale', count: 3214},
        {id: 5, icon: 'AngryIconMale', count: 5463},
        {id: 6, icon: 'ScaredIconMale', count: 6412},
        {id: 7, icon: 'LaughIconMale', count: 8521},
        {id: 8, icon: 'ThinkIconMale', count: 1472},
        {id: 9, icon: 'SadIconMale', count: 3698}
      ]
    }
  },
  methods: {},
  mounted() {
    console.log(this.reaction)
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

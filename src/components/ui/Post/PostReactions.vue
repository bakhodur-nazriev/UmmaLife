<template>
  <div class="reactions__block" v-if="extractNumericKeys(reactions).length > 0">
    <div
      class="reaction"
      v-for="reaction in extractNumericKeys(reactions)"
      :key="reaction.icon_id"
      :class="{ active: reactions.type === reaction.icon_id }"
    >
      <component :is="getReaction(reaction.icon_id).icon"/>
      <span>{{ shortNum(reaction.reaction_count) }}</span>
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
import {extractNumericKeys} from '@/utils'
import shortNum from 'number-shortener'

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
  props: {
    reactions: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    shortNum,
    extractNumericKeys,
    getReaction(icon_id) {
      const reactions = [
        {id: 1, icon: 'LikeIconMale', code: '1'},
        {id: 2, icon: 'DislikeIconMale', code: '13'},
        {id: 3, icon: 'LoveIconMale', code: '2'},
        {id: 4, icon: 'FireIconMale', code: '14'},
        {id: 5, icon: 'AngryIconMale', code: '6'},
        {id: 6, icon: 'ScaredIconMale', code: '12'},
        {id: 7, icon: 'LaughIconMale', code: '3'},
        {id: 8, icon: 'ThinkIconMale', code: '4'},
        {id: 8, icon: 'SadIconMale', code: '5'},

        {id: 9, icon: 'LikeIconFemale', code: '7'},
        {id: 10, icon: 'DislikeIconFemale', code: '17'},
        {id: 11, icon: 'LoveIconFemale', code: '8'},
        {id: 12, icon: 'FireIconFemale', code: '18'},
        {id: 13, icon: 'AngryIconFemale', code: '11'},
        {id: 14, icon: 'ScaredIconFemale', code: '16'},
        {id: 15, icon: 'LaughIconFemale', code: '9'},
        {id: 16, icon: 'ThinkIconFemale', code: '10'},
        {id: 17, icon: 'SadIconFemale', code: '19'}
      ]
      return reactions.find((reaction) => reaction.code === icon_id)
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.reactions {
  &__block {
    margin-bottom: 10px;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;

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

      &.active {
        background: var(--color-green);

        span {
          color: var(--color-stable-white);
        }
      }

      svg {
        width: 16px;
        height: 16px;
        display: block;
      }

      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
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

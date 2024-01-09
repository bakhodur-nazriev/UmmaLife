<template>
  <div class="comments__reactions" v-if="extractNumericKeys(comment?.reaction).length > 0">
    <div
      class="reaction"
      v-for="reaction in extractNumericKeys(comment?.reaction)"
      :key="reaction.icon_id"
      :class="{ active: comment?.reaction?.type === reaction.icon_id }"
      @click="unlikeHandler(reaction.icon_id)"
    >
      <component :is="getReaction(reaction.icon_id).icon" />
      <span>{{ shortNum(reaction.reaction_count) }}</span>
    </div>
  </div>
</template>

<script setup>
import shortNum from 'number-shortener'
import { extractNumericKeys } from '@/utils.js'
import LikeIcon from '@/components/icons/reactions/men/reply-reactions/LikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/reply-reactions/LoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/reply-reactions/FireIcon.vue'
import SadIcon from '@/components/icons/reactions/men/reply-reactions/SadIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/reply-reactions/DislikeIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/reply-reactions/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/reply-reactions/ThinkIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/reply-reactions/AngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/reply-reactions/ScaredIcon.vue'
import FemaleLikeIcon from '@/components/icons/reactions/women/small/LikeIcon.vue'
import FemaleDislikeIcon from '@/components/icons/reactions/women/small/DislikeIcon.vue'

const props = defineProps({
  comment: {
    type: Object
  }
})

const emit = defineEmits(['unlikeHandler'])

const getReaction = (icon_id) => {
  const reactions = [
    { id: 1, icon: 'LikeIcon', code: '1' },
    { id: 2, icon: 'DislikeIcon', code: '13' },
    { id: 3, icon: 'LoveIcon', code: '2' },
    { id: 4, icon: 'FireIcon', code: '14' },
    { id: 5, icon: 'AngryIcon', code: '6' },
    { id: 6, icon: 'ScaredIcon', code: '12' },
    { id: 7, icon: 'LaughIcon', code: '3' },
    { id: 8, icon: 'ThinkIcon', code: '4' },
    { id: 8, icon: 'SadIcon', code: '5' },
    { id: 9, icon: 'FemaleLikeIcon', code: '7' },
    { id: 10, icon: 'FemaleDislikeIcon', code: '17' },
    { id: 11, icon: 'LoveIcon', code: '8' },
    { id: 12, icon: 'FireIcon', code: '18' },
    { id: 13, icon: 'AngryIcon', code: '11' },
    { id: 14, icon: 'ScaredIcon', code: '16' },
    { id: 15, icon: 'LaughIcon', code: '9' },
    { id: 16, icon: 'ThinkIcon', code: '10' },
    { id: 17, icon: 'SadIcon', code: '19' }
  ]

  return reactions.find((reaction) => reaction.code === icon_id)
}

const unlikeHandler = (icon_id) => {
  if (props.comment?.reaction?.type !== icon_id) return

  emit('unlikeHandler', props.comment)
}
</script>

<script>
export default {
  components: {
    LikeIcon,
    LoveIcon,
    FireIcon,
    SadIcon,
    DislikeIcon,
    LaughIcon,
    ThinkIcon,
    AngryIcon,
    ScaredIcon,
    FemaleLikeIcon,
    FemaleDislikeIcon
  }
}
</script>

<style lang="scss" scoped>
.comments {
  &__reactions {
    margin-bottom: 10px;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    .reaction {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--color-seashell);
      cursor: pointer;
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
</style>

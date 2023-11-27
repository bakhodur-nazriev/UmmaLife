<template>
  <div class="reactions__buttons">
    <div class="reply__reactions" v-if="user?.gender === 'male'">
      <div
        class="reply__icon reaction__item"
        v-for="reaction in maleReactions"
        :key="reaction.id"
        @click="$emit('clickReaction', reaction.code)"
      >
        <component :is="reaction.icon" />
      </div>
    </div>
    <div class="reply__reactions" v-else-if="user?.gender === 'female'">
      <div
        class="reply__icon reaction__item"
        v-for="reaction in femaleReactions"
        :key="reaction.id"
        @click="$emit('clickReaction', reaction.code)"
      >
        <component :is="reaction.icon" />
      </div>
    </div>
  </div>
</template>

<script>
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

export default {
  props: {
    user: Object
  },
  emits: ['clickReaction'],
  data() {
    return {
      maleReactions: [
        { id: 1, icon: 'LikeIcon', code: 1 },
        { id: 2, icon: 'DislikeIcon', code: 13 },
        { id: 3, icon: 'LoveIcon', code: 2 },
        { id: 4, icon: 'FireIcon', code: 14 },
        { id: 5, icon: 'AngryIcon', code: 6 },
        { id: 6, icon: 'ScaredIcon', code: 12 },
        { id: 7, icon: 'LaughIcon', code: 3 },
        { id: 8, icon: 'ThinkIcon', code: 4 },
        { id: 8, icon: 'SadIcon', code: 5 }
      ],
      femaleReactions: [
        { id: 1, icon: 'FemaleLikeIcon', code: 7 },
        { id: 2, icon: 'FemaleDislikeIcon', code: 17 },
        { id: 3, icon: 'LoveIcon', code: 8 },
        { id: 4, icon: 'FireIcon', code: 18 },
        { id: 5, icon: 'AngryIcon', code: 11 },
        { id: 6, icon: 'ScaredIcon', code: 16 },
        { id: 7, icon: 'LaughIcon', code: 9 },
        { id: 8, icon: 'ThinkIcon', code: 10 },
        { id: 8, icon: 'SadIcon', code: 19 }
      ]
    }
  },
  components: {
    FemaleLikeIcon,
    FemaleDislikeIcon,
    LikeIcon,
    LoveIcon,
    FireIcon,
    SadIcon,
    DislikeIcon,
    LaughIcon,
    ThinkIcon,
    AngryIcon,
    ScaredIcon
  }
}
</script>

<style lang="scss">
.reply__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    scale: 1.3;
    svg {
      transform: unset !important;
    }
    .reaction__item--tooltip {
      scale: 0.8;
      bottom: 25px;
    }
  }
}
.reactions__buttons {
  bottom: 25px;
  left: 5px;
}
</style>

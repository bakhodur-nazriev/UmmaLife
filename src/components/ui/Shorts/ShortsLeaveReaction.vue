<template>
  <div class="reactions__buttons">
    <div class="reaction__window">
      <div class="reaction__menu" v-if="user?.gender === 'male'">
        <div
          class="reaction__item"
          v-for="reaction in maleReactions"
          :key="reaction.id"
          @click="$emit('clickReaction', reaction.code)"
        >
          <span class="reaction__item--tooltip">{{ reaction.tooltip }}</span>
          <component :is="reaction.icon" />
        </div>
      </div>
      <div class="reaction__menu" v-else-if="user?.gender === 'female'">
        <div
          class="reaction__item"
          v-for="reaction in femaleReactions"
          :key="reaction.id"
          @click="$emit('clickReaction', reaction.code)"
        >
          <span class="reaction__item--tooltip">{{ reaction.tooltip }}</span>
          <component :is="reaction.icon" />
        </div>
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

// { id: 1, icon: BigLikeIcon, tooltip: this.$t('reaction_tooltip.like') },
// { id: 2, icon: BigDislikeIcon, tooltip: this.$t('reaction_tooltip.dislike') },
// { id: 3, icon: BigLoveIcon, tooltip: this.$t('reaction_tooltip.love') },
// { id: 4, icon: BigFireIcon, tooltip: this.$t('reaction_tooltip.fire') },
// { id: 5, icon: BigAngryIcon, tooltip: this.$t('reaction_tooltip.angry') },
// { id: 6, icon: BigScaredIcon, tooltip: this.$t('reaction_tooltip.scared') },
// { id: 7, icon: BigLaughIcon, tooltip: this.$t('reaction_tooltip.laugh') },
// { id: 8, icon: BigThinkIcon, tooltip: this.$t('reaction_tooltip.think') },
// { id: 9, icon: BigSadIcon, tooltip: this.$t('reaction_tooltip.sad') }

export default {
  props: {
    user: Object
  },
  emits: ['clickReaction'],
  data() {
    return {
      maleReactions: [
        { id: 1, icon: 'LikeIcon', code: 1, tooltip: this.$t('reaction_tooltip.like') },
        { id: 2, icon: 'DislikeIcon', code: 13, tooltip: this.$t('reaction_tooltip.dislike') },
        { id: 3, icon: 'LoveIcon', code: 2, tooltip: this.$t('reaction_tooltip.love') },
        { id: 4, icon: 'FireIcon', code: 14, tooltip: this.$t('reaction_tooltip.fire') },
        { id: 5, icon: 'AngryIcon', code: 6, tooltip: this.$t('reaction_tooltip.angry') },
        { id: 6, icon: 'ScaredIcon', code: 12, tooltip: this.$t('reaction_tooltip.scared') },
        { id: 7, icon: 'LaughIcon', code: 3, tooltip: this.$t('reaction_tooltip.laugh') },
        { id: 8, icon: 'ThinkIcon', code: 4, tooltip: this.$t('reaction_tooltip.think') },
        { id: 8, icon: 'SadIcon', code: 5, tooltip: this.$t('reaction_tooltip.sad') }
      ],
      femaleReactions: [
        { id: 1, icon: 'FemaleLikeIcon', code: 7, tooltip: this.$t('reaction_tooltip.like') },
        {
          id: 2,
          icon: 'FemaleDislikeIcon',
          code: 17,
          tooltip: this.$t('reaction_tooltip.dislike')
        },
        { id: 3, icon: 'LoveIcon', code: 8, tooltip: this.$t('reaction_tooltip.love') },
        { id: 4, icon: 'FireIcon', code: 18, tooltip: this.$t('reaction_tooltip.fire') },
        { id: 5, icon: 'AngryIcon', code: 11, tooltip: this.$t('reaction_tooltip.angry') },
        { id: 6, icon: 'ScaredIcon', code: 16, tooltip: this.$t('reaction_tooltip.scared') },
        { id: 7, icon: 'LaughIcon', code: 9, tooltip: this.$t('reaction_tooltip.laugh') },
        { id: 8, icon: 'ThinkIcon', code: 10, tooltip: this.$t('reaction_tooltip.think') },
        { id: 8, icon: 'SadIcon', code: 19, tooltip: this.$t('reaction_tooltip.sad') }
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

<style lang="scss" scoped>
.reaction__item {
  svg {
    scale: 1.5;
  }
}
.reaction__window {
  padding: 12px 17px;
}
.reaction__menu {
  gap: 20px;
}
.reactions__buttons {
  bottom: 25px;
  left: 28px;
  @media (max-width: 767px) {
    left: 5px;
  }
}
</style>

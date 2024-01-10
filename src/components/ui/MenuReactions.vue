<template>
  <div class="reaction__buttons--block" v-on-click-outside="() => (isReactionWindowOpen = false)">
    <div class="reactions__buttons" v-if="isReactionWindowOpen">
      <div class="reaction__window">
        <ul class="reaction__menu">
          <li v-for="(reaction, index) in reactionsIcon" :key="index" class="reaction__item">
            <component :is="reaction.icon" />
          </li>
        </ul>
      </div>
    </div>
    <div class="like__button open-reaction-button" @click="openReactionWindow">
      <HeartIcon />
      <span>{{ $t('buttons.like') }}</span>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

import HeartIcon from '@/components/icons/shorts/HeartIcon.vue'
import BigLikeIcon from '@/components/icons/reactions/men/big/BigLikeIcon.vue'
import BigDislikeIcon from '@/components/icons/reactions/men/big/BigDislikeIcon.vue'
import BigLoveIcon from '@/components/icons/reactions/men/big/BigLoveIcon.vue'
import BigLaughIcon from '@/components/icons/reactions/men/big/BigLaughIcon.vue'
import BigFireIcon from '@/components/icons/reactions/men/big/BigFireIcon.vue'
import BigThinkIcon from '@/components/icons/reactions/men/big/BigThinkIcon.vue'
import BigAngryIcon from '@/components/icons/reactions/men/big/BigAngryIcon.vue'
import BigSadIcon from '@/components/icons/reactions/men/big/BigSadIcon.vue'
import BigScaredIcon from '@/components/icons/reactions/men/big/BigScaredIcon.vue'

const reactionsIcon = ref([
  { icon: 'BigLikeIcon' },
  { icon: 'BigDislikeIcon' },
  { icon: 'BigLoveIcon' },
  { icon: 'BigFireIcon' },
  { icon: 'BigAngryIcon' },
  { icon: 'BigScaredIcon' },
  { icon: 'BigLaughIcon' },
  { icon: 'BigThinkIcon' },
  { icon: 'BigSadIcon' }
])

const isReactionWindowOpen = ref(false)
const openReactionWindow = () => {
  isReactionWindowOpen.value = !isReactionWindowOpen.value
}
</script>

<script>
export default {
  components: {
    BigLikeIcon,
    BigDislikeIcon,
    BigLoveIcon,
    BigLaughIcon,
    BigFireIcon,
    BigThinkIcon,
    BigAngryIcon,
    BigSadIcon,
    BigScaredIcon
  }
}
</script>

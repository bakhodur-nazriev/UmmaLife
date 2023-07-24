<template>
  <div class="post__content--reactions">
    <div class="reactions__block">
      <div class="reaction">
        <like-icon></like-icon>
        <span>1550</span>
      </div>
      <div class="reaction">
        <dislike-icon></dislike-icon>
        <span>1550</span>
      </div>
      <div class="reaction">
        <love-icon></love-icon>
        <span>1935</span>
      </div>
      <div class="reaction">
        <laugh-icon></laugh-icon>
        <span>4336</span>
      </div>
      <div class="reaction">
        <fire-icon></fire-icon>
        <span>9685</span>
      </div>
      <div class="reaction">
        <think-icon></think-icon>
        <span>9685</span>
      </div>
      <div class="reaction">
        <angry-icon></angry-icon>
        <span>9685</span>
      </div>
      <div class="reaction">
        <sad-icon></sad-icon>
        <span>9685</span>
      </div>
      <div class="reaction">
        <scared-icon></scared-icon>
        <span>9685</span>
      </div>
    </div>

    <div class="stats__reposts">
      <span>155 {{ $t('labels.comments.plural') }}</span>
      <span class="stats__separator"> / </span>
      <span>35 {{ $t('labels.reposts.plural') }}</span>
    </div>
  </div>
</template>

<script>
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'

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
  }
}
</script>

<style scoped>
.post__content--reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 14px 0;
}

.profile-reactions .reaction {
  background: var(--color-gallery-second);
}

.reaction {
  height: 32px;
  background: var(--color-seashell);
  border-radius: 50px;
  padding: 8px 12px;
  color: var(--color-silver-chalice);
  width: auto;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}
.stats__separator {
  margin: 0 8px;
}
.stats__reposts {
  color: var(--color-silver-chalice);
  display: flex;
  font-size: 14px;
}
.reactions__block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
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

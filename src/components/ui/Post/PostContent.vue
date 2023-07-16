<script setup>
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'

const reactions = [
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
</script>

<template>
  <div class="post__content">
    <p class="post__content--paragraph">The 29-year-old took more than a tenth of a second off a record that had stood
      for 16 years, clocking 52.20 seconds to beat Russian Yuliya<br>
      Pechonkina's previous mark of 52.34.<br>
      "I'm just shocked," said Muhammad.<br>
      "I've been kind of hitting that time in practice and my coach was like 'there's no way you can't do it'."
    </p>
    <div class="post__content--reactions">
      <div class="reactions__block">
        <div
          v-for="(reaction, index) in reactions"
          :key="index"
          class="reaction"
        >
          <component :is="reaction.icon" />
          <span>{{ reaction.count }}</span>
        </div>
      </div>

      <div class="stats__reposts">
        <span>155 {{ $t('labels.comments.plural') }}</span>
        <span class="stats__separator"> / </span>
        <span>35 {{ $t('labels.reposts.plural') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}

.reactions__block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.stats__separator {
  margin: 0 8px;
}

.post__content--reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 14px 0;
}

.stats__reposts {
  color: var(--color-silver-chalice);
  display: flex;
  font-size: 14px;
}

.post__content--paragraph {
  margin: 0;
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

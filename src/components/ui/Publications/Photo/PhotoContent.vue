<template>
  <section
    class="photo-block__article"
    v-for="photo in items"
    :key="photo.id"
  >
    <img
      class="image__item"
      :src="photo.image"
      :alt="photo.desc"
    />
  </section>
  <section class="article-content__reactions">
    <div class="article-content__reactions-block">
      <div
        v-for="(reaction, index) in reactions"
        :key="index"
        class="reaction"
      >
        <component :is="reaction.icon"/>
        <span>{{ reaction.count }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'

export default {
  props: {
    items: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      reactions: [
        { icon: LikeIcon, count: 1550 },
        { icon: DislikeIcon, count: 2351 },
        { icon: LoveIcon, count: 1987 },
        { icon: FireIcon, count: 2358 },
        { icon: AngryIcon, count: 7462 },
        { icon: ScaredIcon, count: 7894 },
        { icon: LaughIcon, count: 5671 },
        { icon: ThinkIcon, count: 9874 },
        { icon: SadIcon, count: 9876 }
      ]
    }
  },
  mounted () {
    console.log(this.items)
  }
}
</script>

<style scoped lang="scss">
.photo-block {
  display: flex;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 24px;
  grid-gap: 10px;
  grid-auto-flow: dense;

  &__article {
    display: flex;
  }
}

.article-content__reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 0 0;
}

.article-content__reactions-block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  .reaction {
    height: 32px;
    border-radius: 50px;
    padding: 8px 12px;
    width: auto;
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 14px;
    color: var(--color-silver-chalice);
    background-color: var(--color-gallery-second);
  }
}
</style>

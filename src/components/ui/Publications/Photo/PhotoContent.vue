<template>
  <section class="photo-block__article" v-for="photo in items" :key="photo.id">
    <a :href="photo.image" data-fancybox class="image__item">
      <img :src="photo.image" :alt="photo.desc" />
    </a>
  </section>
  <section class="article-content__reactions">
    <PostReactions />
  </section>
</template>

<script>
import PostReactions from '@/components/ui/Post/PostReactions.vue'
import { Fancybox } from '@fancyapps/ui'

export default {
  components: {
    PostReactions
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  mounted() {
    Fancybox.bind('[data-fancybox]', {
      wheel: 'zoom'
    })
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

@media (max-width: 576px) {
}
</style>

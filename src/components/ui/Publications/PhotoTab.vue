<template>
  <div class="photo-block">
    <article class="photo-block__article" v-for="i in 5" :key="i">
      <PostHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <PhotoContent :items="photos"/>

      <SampleDivider class="divider"/>

      <PostFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import PhotoContent from '@/components/ui/Publications/Photo/PhotoContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'

export default {
  components: {
    PostHeader,
    PostFooter,
    SampleDivider,
    PhotoContent
  },
  data () {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false,
      photos: [
        { id: 1, image: require('@/assets/images/Post_1.png'), desc: 'photo 1' }
      ]
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped lang="scss">
.photo-block {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__article {
    display: flex;
    flex-direction: column;
    padding: 24px 24px 10px;
    border-radius: 15px;
    row-gap: 8px;
    background-color: var(--color-white);
  }
}

.divider {
  margin: 2px;
}

@media (max-width: 576px) {
  .photo-block__article {
    border-radius: 0;
  }
}
</style>

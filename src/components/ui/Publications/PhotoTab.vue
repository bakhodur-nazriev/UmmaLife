<template>
  <div class="photo-block">
    <article class="photo-block__article" v-for="i in 5" :key="i">
      <PhotoHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <PhotoContent :items="photos"/>

      <SampleDivider class="divider"/>

      <PhotoFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import PhotoHeader from '@/components/ui/Publications/Photo/PhotoHeader.vue'
import PhotoContent from '@/components/ui/Publications/Photo/PhotoContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PhotoFooter from '@/components/ui/Publications/Photo/PhotoFooter.vue'

export default {
  components: {
    PhotoFooter,
    SampleDivider,
    PhotoContent,
    PhotoHeader
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

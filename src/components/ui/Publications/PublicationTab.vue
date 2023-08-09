<template>
  <article class="post__block">
    <PostHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />

    <PublicationContent />

    <SampleDivider class="divider"/>

    <PostFooter
      :is-reaction-window-open="isReactionWindowOpen"
      :is-share-window-open="isShareWindowOpen"
    />
  </article>
</template>

<script>
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PublicationContent from '@/components/ui/Publications/Publication/PublicationContent.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'

export default {
  components: {
    PostFooter,
    PostHeader,
    PublicationContent,
    SampleDivider
  },
  data () {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false
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
.profile__news.post__block{
  border: 1px solid var(--color-seashell);
}
.post__block {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 10px;
  border-radius: 15px;
  row-gap: 8px;
  background-color: var(--color-white);
}

.divider {
  margin: 2px;
}
</style>

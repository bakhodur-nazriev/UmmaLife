<template>
  <article class="post__block">
    <post-header
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />

    <post-content />

    <sample-divider />

    <post-footer
      :is-reaction-window-open="isReactionWindowOpen"
      :is-share-window-open="isShareWindowOpen"
    />
  </article>
</template>

<script>
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostContent from '@/components/ui/Post/PostContent.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'

export default {
  components: {
    SampleDivider,
    PostFooter,
    PostContent,
    PostHeader
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

<style scoped>
.profile__news.post__block{
  border: 1px solid var(--color-seashell);
}
.post__block {
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 20px 24px 8px 24px;
}
</style>

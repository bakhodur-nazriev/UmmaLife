<template>
  <article class="post__block">
    <PostHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />

    <PostContent />

    <SampleDivider />

    <PostFooter
      :is-reaction-window-open="isReactionWindowOpen"
      :is-share-window-open="isShareWindowOpen"
    />
  </article>
</template>

<script>
import PostHeader from '@/components/ui/Publications/Post/PostHeader.vue'
import PostContent from '@/components/ui/Publications/Post/PostContent.vue'
import PostFooter from '@/components/ui/Publications/Post/PostFooter.vue'
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
.post__block {
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 20px 24px 8px 24px;
}
</style>

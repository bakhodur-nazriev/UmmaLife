<template>
  <div>
    <PostHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />

    <ArticleContent/>

    <PostFooter
      :is-reaction-window-open="isReactionWindowOpen"
      :is-share-window-open="isShareWindowOpen"
    />
  </div>
</template>

<script>
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostFooter from '@/components/ui/Publications/Post/PostFooter.vue'
import ArticleContent from '@/components/ui/Publications/Article/ArticleContent.vue'

export default {
  components: {
    PostFooter,
    PostHeader,
    ArticleContent
  },
  data() {
    return {
      isMenuOpen: false,
      isReactionWindowOpen: false,
      isShareWindowOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped lang="scss"></style>

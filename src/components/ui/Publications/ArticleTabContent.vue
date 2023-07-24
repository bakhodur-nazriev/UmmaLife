<template>
  <article class="article-block">
    <PostHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />

<!--    <ArticleHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />-->

    <ArticleContent />

    <SampleDivider />

    <PostFooter
      :is-reaction-window-open="isReactionWindowOpen"
      :is-share-window-open="isShareWindowOpen"
    />

<!--    <ArticleFooter />-->
  </article>
</template>

<script>
import SampleDivider from '@/components/ui/SampleDivider.vue'
// import ArticleHeader from '@/components/ui/Article/ArticleHeader.vue'
import ArticleContent from '@/components/ui/Article/ArticleContent.vue'
// import ArticleFooter from '@/components/ui/Article/ArticleFooter.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'

export default {
  components: {
    PostHeader,
    PostFooter,
    // ArticleFooter,
    ArticleContent,
    // ArticleHeader,
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
.article-block {
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 20px 24px 8px 24px;
}
</style>

<template>
  <div class="article-block">
    <article v-for="i in 5" :key="i" class="article-block__article">
      <ArticleHeader :is-menu-open="isMenuOpen" @toggle-menu="toggleMenu" />

      <ArticleContent :is-menu-open="isMenuOpen" @toggle-menu="toggleMenu" />

      <SampleDivider />

      <ArticleFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import SampleDivider from '@/components/ui/SampleDivider.vue'
import ArticleHeader from '@/components/ui/Publications/Article/ArticleHeader.vue'
import ArticleContent from '@/components/ui/Publications/Article/ArticleContent.vue'
import ArticleFooter from '@/components/ui/Publications/Article/ArticleFooter.vue'

export default {
  components: {
    ArticleFooter,
    ArticleContent,
    ArticleHeader,
    SampleDivider
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped lang="scss">
.article-block {
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
</style>

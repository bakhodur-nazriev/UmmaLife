<template>
  <div class="main__article--block">
    <article class="article__block" v-for="i in 4" :key="i">
      <ArticleHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <ArticleContent />

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
import ArticleFooter from '@/components/ui/Article/ArticleFooter.vue'
import ArticleContent from '@/components/ui/Article/ArticleContent.vue'
import ArticleHeader from '@/components/ui/Article/ArticleHeader.vue'
export default {
  components: {
    ArticleHeader,
    ArticleContent,
    ArticleFooter,
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
.main__article--block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.article__block {
  max-width: 100%;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 24px;
}

@media (max-width: 767px) {}

@media (min-width: 1200px) {
  .article__block {
    max-width: 560px;
  }
}

@media (max-width: 1920px) {}
</style>

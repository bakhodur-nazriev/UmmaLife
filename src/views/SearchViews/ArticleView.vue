<template>
    <SearchMainLayout>
      <div class="article-block">
        <article v-for="i in 5" :key="i" class="article-block__article">
          <PostHeader
            :is-menu-open="isMenuOpen"
            @toggle-menu="toggleMenu"
          />

          <ArticleContent/>

          <SampleDivider class="divider"/>

          <PostFooter
            :is-reaction-window-open="isReactionWindowOpen"
            :is-share-window-open="isShareWindowOpen"
          />
        </article>
      </div>
    </SearchMainLayout>
</template>

<script>
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import ArticleContent from '@/components/ui/Publications/Article/ArticleContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import SearchMainLayout from '@/components/layouts/SearchMainLayout.vue'

export default {
  components: {
    SearchMainLayout,
    PostHeader,
    SampleDivider,
    ArticleContent,
    PostFooter
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
  width: 600px;

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
  .article-block__article {
    border-radius: 0;
    padding: 10px 16px;
  }
}

@media (min-width: 1920px) {
  .article-block {
    width: 700px;
  }
}
</style>

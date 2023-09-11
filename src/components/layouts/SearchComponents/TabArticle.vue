<template>
  <div class="article-block">
    <article v-for="i in 5" :key="i" class="article-block__article">
      <PostHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <ArticleContent />

      <SampleDivider class="divider"/>

      <PostFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />

      <SampleDivider class="small-divider" />
    </article>
  </div>
</template>

<script>
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import ArticleContent from '@/components/ui/Publications/Article/ArticleContent.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'

export default {
  components: {
    PostHeader,
    ArticleContent,
    SampleDivider,
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
    toggleMenu () {
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
    padding: 10px 0;
    border-radius: 15px;
    row-gap: 8px;
    background-color: var(--color-white);
  }
}

.divider {
  margin: 2px;
}

.small-divider {
  display: none;
}

@media (max-width: 576px) {
  .article-block {
    padding: 24px 0;

    &__article {
      padding: 0;
    }
  }

  .divider {
    display: none;
  }

  .small-divider {
    display: flex;
  }
}
</style>

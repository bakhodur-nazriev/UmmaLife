<template>
  <div class="profile__article">
    <article-content :isMenuOpen="isMenuOpen" @toggleMenu="isMenuOpen = !isMenuOpen" />
      <div class="profile__article--bottom">
        <post-reactions class="profile-reactions" />
        <sample-divider class="profile-divider"   />
        <post-footer
          :is-reaction-window-open="isReactionWindowOpen"
          :is-share-window-open="isShareWindowOpen"
        />
      </div>
  </div>
</template>

<script>
import ArticleContent from '@/components/ui/Publications/ArticleContent.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import PostReactions from '@/components/ui/Post/PostReactions.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'

export default {
  components: {
    ArticleContent,
    PostFooter,
    SampleDivider,
    PostReactions
  },
  data () {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
.profile__article{
  background-color: var(--color-seashell);
  border-radius: 20px;
  .article__block{
    background-color: transparent;
  }
  &--bottom{
    padding: 0 16px 8px;
  }
}
</style>

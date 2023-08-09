<template>
  <div class="profile__article">
    <ArticleTab :isMenuOpen="isMenuOpen" @toggleMenu="isMenuOpen = !isMenuOpen" />
  </div>
</template>

<script>
import ArticleTab from '@/components/ui/Publications/ArticleTab.vue'

export default {
  components: {
    ArticleTab
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
.profile__article {
  background-color: var(--color-seashell);
  border-radius: 20px;
}
</style>

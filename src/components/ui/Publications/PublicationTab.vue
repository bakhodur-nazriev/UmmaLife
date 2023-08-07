<template>
  <article class="post__block">
    <PublicationHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
    />

    <PublicationContent />

    <SampleDivider class="divider"/>

    <PublicationFooter
      :is-reaction-window-open="isReactionWindowOpen"
      :is-share-window-open="isShareWindowOpen"
    />
  </article>
</template>

<script>
import PublicationContent from '@/components/ui/Publications/Publication/PublicationContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PublicationHeader from '@/components/ui/Publications/Publication/PublicationHeader.vue'
import PublicationFooter from '@/components/ui/Publications/Publication/PublicationFooter.vue'

export default {
  components: {
    PublicationContent,
    PublicationFooter,
    PublicationHeader,
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
.profile__news.post__block{
  border: 1px solid var(--color-seashell);
}
.post__block {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 10px;
  border-radius: 15px;
  row-gap: 8px;
  background-color: var(--color-white);
}

.divider {
  margin: 2px;
}
</style>

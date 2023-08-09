<template>
  <div class="audio-block">
    <article class="audio-block__article" v-for="i in 5" :key="i">
      <PostHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <AudioContent />

      <SampleDivider class="divider" />

      <PostFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import AudioContent from '@/components/ui/Publications/Audio/AudioContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'

export default {
  components: {
    PostFooter,
    PostHeader,
    SampleDivider,
    AudioContent
  },
  data () {
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

<style scoped lang="scss">
.audio-block {
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

.divider {
  margin: 2px;
}

@media (max-width: 576px) {
  .audio-block__article {
    border-radius: 0;
  }
}
</style>

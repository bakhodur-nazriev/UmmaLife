<template>
  <div class="audio-block">
    <article class="audio-block__article" v-for="i in 5" :key="i">
      <PostHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <AudioContent />

      <PostFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />

      <SampleDivider class="divider" />
    </article>
  </div>
</template>

<script>
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import AudioContent from '@/components/ui/Publications/Audio/AudioContent.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'

export default {
  components: {
    PostHeader,
    AudioContent,
    SampleDivider,
    PostFooter
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
    padding: 10px 0;
    border-radius: 15px;
    row-gap: 8px;
    background-color: var(--color-white);
  }
}

.divider {
  margin: 2px;
}

@media (max-width: 576px) {
  .audio-block {
    padding: 24px 0;

    &__article {
      padding: 0;
    }
  }

  .audio-block__article {
    border-radius: 0;
  }

  .divider {
    margin-top: 10px;
  }
}
</style>

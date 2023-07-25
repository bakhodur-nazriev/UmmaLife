<template>
  <div class="audio-block">
    <article class="audio-block__article" v-for="i in 5" :key="i">
      <AudioHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />

      <AudioContent />

      <SampleDivider />

      <AudioFooter
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import AudioHeader from '@/components/ui/Publications/Audio/AudioHeader.vue'
import AudioContent from '@/components/ui/Publications/Audio/AudioContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import AudioFooter from '@/components/ui/Publications/Audio/AudioFooter.vue'

export default {
  components: {
    AudioFooter,
    SampleDivider,
    AudioContent,
    AudioHeader
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
    padding: 24px;
    border-radius: 15px;
    row-gap: 8px;
    background-color: var(--color-white);
  }
}
</style>

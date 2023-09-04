<template>
  <div class="tabs" :style="isPlayerOpen ? `margin-bottom: ${playerHeight + 24}px` : ''">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <div class="tabs__wrapper">
      <AudioAlbumCard v-for="i in 12" :key="i" />
    </div>
  </div>
  <teleport to="body">
    <AudioPlayerComponent
      :audios="chosenAudios"
      v-if="isPlayerOpen"
      @playerHeight="setPlayerHeight"
    />
  </teleport>
</template>

<script>
import AudioAlbumCard from '@/components/audio/AudioAlbumCard.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import AudioPlayerComponent from '@/components/audio/AudioPlayerComponent.vue'

import { mapState, mapMutations } from 'vuex'
export default {
  components: { AudioAlbumCard, GroupsSearch, AudioPlayerComponent },
  data() {
    return {
      playerHeight: 0
    }
  },
  computed: {
    ...mapState('audio', ['chosenAudios', 'isPlayerOpen'])
  },
  methods: {
    ...mapMutations('audio', ['playSingleAudio', 'setPlayerClose']),
    setPlayerHeight(height) {
      this.playerHeight = height
    }
  },
  beforeUnmount() {
    this.setPlayerClose()
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  &__search {
    max-width: 716px;
    width: 100%;
  }
  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin: 24px 0 16px;
  }
  &__wrapper {
    margin: 32px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
</style>

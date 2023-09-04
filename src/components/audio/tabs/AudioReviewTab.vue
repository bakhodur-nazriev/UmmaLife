<template>
  <div class="tabs" :style="isPlayerOpen ? `margin-bottom: ${playerHeight + 24}px` : ''">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <h2 class="tabs__title">Плейлисты</h2>
    <AudioAlbumSlider />
    <h2 class="tabs__title">Аудио</h2>
    <AudioList
      v-for="audio in audios"
      :key="audio.id"
      :audio="audio"
      @playAudio="playSingleAudio"
    />
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
import AudioAlbumSlider from '@/components/audio/AudioAlbumSlider.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import AudioList from '@/components/audio/AudioList.vue'
import AudioPlayerComponent from '@/components/audio/AudioPlayerComponent.vue'

import { mapState, mapMutations } from 'vuex'
export default {
  components: { AudioAlbumSlider, GroupsSearch, AudioList, AudioPlayerComponent },
  data() {
    return {
      playerHeight: 0
    }
  },
  computed: {
    ...mapState('audio', ['chosenAudios', 'isPlayerOpen', 'audios'])
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
}
</style>

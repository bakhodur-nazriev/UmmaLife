<template>
  <div class="tabs" :style="isPlayerOpen ? `margin-bottom: ${playerHeight + 24}px` : ''">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <div class="tabs__lists">
      <AudioList
        v-for="audio in audios"
        :key="audio.id"
        :audio="audio"
        @playAudio="playSingleAudio"
        @handleLike="(like) => (audio.isLiked = like)"
      />
      <AudioList
        v-for="audio in audios"
        :key="audio.id"
        :audio="audio"
        @playAudio="playSingleAudio"
        @handleLike="(like) => (audio.isLiked = like)"
      />
    </div>
  </div>
  <teleport to="body">
    <AudioPlayList v-if="isListOpen" />
    <AudioPlayerComponent v-if="isPlayerOpen" />
  </teleport>
</template>

<script>
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import AudioList from '@/components/audio/AudioList.vue'
import AudioPlayerComponent from '@/components/audio/AudioPlayerComponent.vue'

import { mapState, mapMutations } from 'vuex'
import AudioPlayList from '../AudioPlayList.vue'
export default {
  components: { GroupsSearch, AudioList, AudioPlayerComponent, AudioPlayList },
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
  &__lists {
    margin: 24px 0;
  }
}
</style>

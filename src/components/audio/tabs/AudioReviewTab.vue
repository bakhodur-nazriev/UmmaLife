<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <h2 class="tabs__title">Плейлисты</h2>
    <AudioAlbumSlider />
    <h2 class="tabs__title">Аудио</h2>
    <AudioList
      v-for="audio in audios"
      :key="audio.id"
      :audioSource="audio.source"
      :audioTitle="audio.title"
      :audioArtist="audio.artist"
    />
  </div>
  <AudioPlayerComponent :audios="audios" />
</template>

<script>
import AudioAlbumSlider from '@/components/audio/AudioAlbumSlider.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import AudioList from '@/components/audio/AudioList.vue'
import AudioPlayerComponent from '@/components/audio/AudioPlayerComponent.vue'

import { audios } from '@/dummy.js'
export default {
  components: { AudioAlbumSlider, GroupsSearch, AudioList, AudioPlayerComponent },
  data() {
    return {
      audios
    }
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

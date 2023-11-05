<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" :placeholder="$t('audio.search_audio')" />
    <h2 class="tabs__title">{{ $t('audio.tabs.playlists') }}</h2>
    <AudioAlbumSlider />
    <h2 class="tabs__title">{{ $t('audio.audio') }}</h2>
    <AudioMainList />
    <AudioMainList />
    <AudioMainList />
  </div>
</template>

<script>
import AudioAlbumSlider from '@/components/audio/AudioAlbumSlider.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'

import AudioMainList from '@/components/audio/AudioMainList.vue'
export default {
  components: { AudioAlbumSlider, GroupsSearch, AudioMainList },
  data() {
    return {
      playerHeight: 0
    }
  },
  methods: {
    setPlayerHeight(height) {
      this.playerHeight = height
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  &__search {
    max-width: 716px;
    width: 100%;
    @media (max-width: 767px) {
      display: none;
    }
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

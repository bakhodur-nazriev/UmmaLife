<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <h2 class="tabs__title">Мои плейлисты</h2>
    <AudioAlbumSlider />
    <h2 class="tabs__title">Все аудио</h2>
    <AudioMainList />
  </div>
</template>

<script>
import AudioAlbumSlider from '@/components/audio/AudioAlbumSlider.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'

import AudioMainList from '../AudioMainList.vue'
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

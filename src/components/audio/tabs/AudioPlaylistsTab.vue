<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" :placeholder="$t('audio.search_audio')" />
    <div class="tabs__wrapper">
      <AudioAlbumCard v-for="i in 12" :key="i" :className="'tabs__playlist'" />
    </div>
  </div>
</template>

<script>
import AudioAlbumCard from '@/components/audio/AudioAlbumCard.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'

export default {
  components: { AudioAlbumCard, GroupsSearch }
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
  &__wrapper {
    margin: 32px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }
    .tabs__playlist {
      max-width: 100% !important;
    }
  }
}
</style>

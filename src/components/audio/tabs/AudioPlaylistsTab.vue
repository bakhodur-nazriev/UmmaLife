<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <div class="tabs__wrapper">
      <AudioAlbumCard v-for="i in 12" :key="i" />
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

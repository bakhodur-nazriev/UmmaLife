<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <h2 class="tabs__title">Плейлисты</h2>
    <AudioPlayListSlider />
    <h2 class="tabs__title">Аудио</h2>
  </div>
</template>

<script>
import AudioPlayListSlider from '@/components/audio/AudioPlayListSlider.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
export default {
  components: { AudioPlayListSlider, GroupsSearch }
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

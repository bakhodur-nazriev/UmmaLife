<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <div class="tabs__lists">
      <AudioList v-for="audio in likedAudios" :audio="audio" :index="index" :key="audio.id" />
    </div>
  </div>
</template>

<script>
import AudioList from '@/components/audio/AudioList.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'

import { mapState } from 'vuex'
import { useWindowSize } from '@vueuse/core'

export default {
  components: {
    GroupsSearch,
    AudioList
  },
  computed: {
    ...mapState('audio', ['audios']),
    likedAudios() {
      return this.audios.filter((a) => a.isLiked)
    }
  },

  setup() {
    const { width } = useWindowSize()
    return {
      screenWidth: width.value
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
  &__lists {
    margin: 24px 0;
  }
}
</style>

<template>
  <main-layout>
    <div class="audio__page">
      <GroupsNav :links="links" className="full" @clickNavHandler="clickNavHandler" />
      <div class="audio__page--container">
        <AudioReviewTab v-if="links[0].isActive" />
        <!-- <AudioMyAudioTab v-else-if="links[1].isActive" />
        <AudioPlaylistsTab v-else-if="links[2].isActive" />
        <AudioLikedTab v-else-if="links[3].isActive" />
        <AudioUploadTab v-else-if="links[4].isActive" /> -->
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import AudioReviewTab from '@/components/audio/tabs/AudioReviewTab.vue'
// import AudioMyAudioTab from '@/components/audio/tabs/AudioMyAudioTab.vue'
// import AudioPlaylistsTab from '@/components/audio/tabs/AudioPlaylistsTab.vue'
// import AudioLikedTab from '@/components/audio/tabs/AudioLikedTab.vue'
// import AudioUploadTab from '@/components/audio/tabs/AudioUploadTab.vue'

export default {
  components: {
    MainLayout,
    GroupsNav,
    AudioReviewTab
    // AudioMyAudioTab,
    // AudioPlaylistsTab,
    // AudioLikedTab,
    // AudioUploadTab
  },
  data() {
    return {
      links: [
        {
          name: 'Обзор',
          isActive: true
        },
        {
          name: 'Мои аудио',
          isActive: false
        },
        {
          name: 'Плейлисты',
          isActive: false
        },
        {
          name: 'Нравится',
          isActive: false
        },
        {
          name: '+ Загрузить новые аудио',
          isActive: false
        }
      ]
    }
  },
  methods: {
    clickNavHandler(index) {
      this.links.forEach((link) => (link.isActive = false))
      this.links[index].isActive = true
    }
  }
}
</script>

<style lang="scss" scoped>
.audio__page {
  &--container {
    max-width: 1587px;
    width: 100%;
    padding: 0 16px;
    margin: 24px auto;
  }
}
</style>

<template>
  <div class="audio__page">
    <div class="muvi__mobile--nav white" v-if="width < 767">
      <div class="library__actions--btn" @click="$router.go(-1)">
        <ArrowLeftIcon />
      </div>
      <div class="muvi__mobile--nav-title">{{ $t('audio.audio') }}</div>
      <div class="library__actions">
        <div class="library__actions--btn" @click="isUploadOpen = !isUploadOpen">
          <AudioAddIcon />
        </div>
        <div class="library__actions--btn" @click="handleSearchOpen">
          <SearchIcon />
        </div>
      </div>
      <transition name="slide">
        <div
          v-if="isSearchOpen"
          class="settings__header--input"
          v-on-click-outside="handleCloseSearch"
        >
          <SearchInput :full="true" :placeholder="$t('placeholders.search_input')" />
        </div>
      </transition>
    </div>
    <GroupsNav :links="links" className="full" @clickNavHandler="clickNavHandler" />
    <div class="audio__page--container">
      <AudioReviewTab v-if="links[0].isActive" />
      <AudioMyAudioTab v-else-if="links[1].isActive" />
      <AudioPlaylistsTab v-else-if="links[2].isActive" />
      <AudioLikedTab v-else-if="links[3].isActive" />
      <AudioUploadTab v-else-if="links[4].isActive" />
    </div>
  </div>
  <teleport to="body">
    <ShareComponent v-if="isShareOpen" />
    <UploadAudio
      v-if="isUploadOpen"
      @closeHandler="isUploadOpen = false"
      @addAlbumHandler="isAddAlbumOpen = true"
    />
    <CreateAlbumModal @closeHandler="isAddAlbumOpen = false" v-if="isAddAlbumOpen" />
  </teleport>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { mapState } from 'vuex'
import { vOnClickOutside } from '@vueuse/components'
import { useWindowSize } from '@vueuse/core'

import GroupsNav from '@/components/groups/GroupsNav.vue'
import AudioReviewTab from '@/components/audio/tabs/AudioReviewTab.vue'
import AudioMyAudioTab from '@/components/audio/tabs/AudioMyAudioTab.vue'
import AudioPlaylistsTab from '@/components/audio/tabs/AudioPlaylistsTab.vue'
import AudioLikedTab from '@/components/audio/tabs/AudioLikedTab.vue'
import AudioUploadTab from '@/components/audio/tabs/AudioUploadTab.vue'
import ShareComponent from '@/components/share/ShareComponent.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import SearchIcon from '@/components/icons/profile/SearchIcon.vue'
import AudioAddIcon from '@/components/icons/audio/AudioAddIcon.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import UploadAudio from '@/components/audio/mobile/UploadAudio.vue'
import CreateAlbumModal from '@/components/audio/mobile/CreateAlbumModal.vue'

export default {
  components: {
    GroupsNav,
    AudioReviewTab,
    AudioMyAudioTab,
    AudioPlaylistsTab,
    AudioLikedTab,
    AudioUploadTab,
    ShareComponent,
    AudioAddIcon
  },

  computed: {
    ...mapState(['isShareOpen'])
  }
}
</script>

<script setup>
const { width } = useWindowSize()
const isSearchOpen = ref(false)

const links = ref([
  {
    name: 'audio.tabs.review',
    isActive: true
  },
  {
    name: 'audio.tabs.my_audio',
    isActive: false
  },
  {
    name: 'audio.tabs.playlists',
    isActive: false
  },
  {
    name: 'audio.tabs.liked',
    isActive: false
  },
  {
    name: 'audio.tabs.download_audio',
    isActive: false
  }
])
const tempLinks = links.value
const isUploadOpen = ref(false)
const isAddAlbumOpen = ref(false)

watch(
  () => width.value,
  (val) => checkLinks(val)
)

const checkLinks = (width) => {
  if (width < 767) {
    links.value = links.value.slice(0, 4)
    clickNavHandler(0)
  } else {
    links.value = tempLinks
    clickNavHandler(0)
  }
}
const clickNavHandler = (index) => {
  links.value.forEach((link) => (link.isActive = false))
  links.value[index].isActive = true
}
const handleSearchOpen = () => {
  isSearchOpen.value = true
}
const handleCloseSearch = () => {
  isSearchOpen.value = false
}

onMounted(() => {
  checkLinks(width.value)
})
</script>

<style lang="scss" scoped>
.audio__page {
  @media (max-width: 767px) {
    padding-bottom: 64px;
  }
  &--container {
    max-width: 1587px;
    width: 100%;
    padding: 0 16px;
    margin: 24px auto;
  }
}
</style>

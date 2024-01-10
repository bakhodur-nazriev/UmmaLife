<template>
  <div class="video__page">
    <div class="muvi__mobile--nav white" v-if="width < 767">
      <div class="library__actions--btn" @click="$router.go(-1)">
        <ArrowLeftIcon />
      </div>
      <div class="muvi__mobile--nav-title">{{ $t('links.video') }}</div>
      <div class="library__actions">
        <div class="library__actions--btn" @click="handleSearchOpen">
          <SearchIcon />
        </div>
        <div class="library__actions--btn" @click="isFilterOpen = !isFilterOpen">
          <FilterCommentsIcon />
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
    <groups-nav :links="links" className="muvi__nav" @clickNavHandler="clickNavHandler" />
    <div class="library__detail__container">
      <div class="library__detail__wrapper">
        <div class="library__detail__block--wrapper">
          <div class="library__detail__block">
            <div class="video__page--search">
              <GroupsSearch :placeholder="$t('video.search_video')" />
            </div>
            <AllMuvies v-if="links[0].isActive" />
            <NewMuvies v-else-if="links[1].isActive" />
            <ReccomendedMuvies v-else-if="links[2].isActive" />
            <SavedMuvies v-else-if="links[3].isActive" />
            <WatchedMuvies v-else-if="links[4].isActive" />
          </div>
        </div>
        <VideoPageFilter
          :class="{ 'mobile-active': isFilterOpen }"
          @closeHandler="isFilterOpen = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import AllMuvies from '@/components/video/tabs/AllMuvies.vue'
import NewMuvies from '@/components/video/tabs/NewMuvies.vue'
import ReccomendedMuvies from '@/components/video/tabs/ReccomendedMuvies.vue'
import SavedMuvies from '@/components/video/tabs/SavedMuvies.vue'
import WatchedMuvies from '@/components/video/tabs/WatchedMuvies.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import VideoPageFilter from '@/components/video/VideoPageFilter.vue'
import SearchIcon from '@/components/icons/settings/SearchIcon.vue'
import FilterCommentsIcon from '@/components/icons/comment/FilterCommentsIcon.vue'
import SearchInput from '@/components/ui/SearchInput.vue'

const isSearchOpen = ref(false)
const isFilterOpen = ref(false)

const { width } = useWindowSize()

const links = ref([
  {
    name: 'video.tabs.all_films',
    isActive: true
  },
  {
    name: 'video.tabs.new_films',
    isActive: false
  },
  {
    name: 'video.tabs.recommended_films',
    isActive: false
  },
  {
    name: 'video.tabs.saved_films',
    isActive: false
  },
  {
    name: 'video.tabs.viewed',
    isActive: false
  }
])

const handleSearchOpen = () => {
  isSearchOpen.value = true
}
const handleCloseSearch = () => {
  isSearchOpen.value = false
}

const clickNavHandler = (index) => {
  links.value.forEach((link) => (link.isActive = false))
  links.value[index].isActive = true
}
</script>

<style lang="scss" scoped>
.video__page {
  &--search {
    margin-bottom: 13px;
    width: 100%;
    @media (max-width: 767px) {
      display: none;
    }
  }
  .library__detail__wrapper {
    @media (max-width: 1310px) {
      grid-template-columns: 1fr 255px;
    }
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

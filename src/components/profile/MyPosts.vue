<template>
  <div class="posts__wrapper">
    <div class="posts">
      <PublicationForm v-if="screenWidth > 575" />
      <ProfileTabs :tabs="tabLabels" @changeTab="(index) => (selectedIndex = index)" id="tabs">
        <ProfilePublications v-if="selectedIndex === 0" />
        <ProfileUmmaShorts v-if="selectedIndex === 1" />
        <ProfileUmmaVideo v-else-if="selectedIndex === 2" />
        <ProfileAlboms v-else-if="selectedIndex === 3" />
        <ProfileSavings v-else-if="selectedIndex === 4" />
      </ProfileTabs>
    </div>
  </div>
</template>

<script setup>
import PublicationForm from '@/components/forms/PublicationForm.vue'
import ProfileTabs from '@/components/profile/ProfileTabs.vue'
// Tabs Components
import ProfilePublications from '@/components/profile/tabs/ProfilePublications.vue'
import ProfileAlboms from '@/components/profile/tabs/ProfileAlboms.vue'
import ProfileSavings from '@/components/profile/tabs/ProfileSavings.vue'
import ProfileUmmaShorts from '@/components/profile/tabs/ProfileUmmaShorts.vue'
import ProfileUmmaVideo from '@/components/profile/tabs/ProfileUmmaVideo.vue'
import { useWindowSize } from '@vueuse/core'
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const selectedIndex = ref(0)

const screenWidth = computed(() => {
  const { width } = useWindowSize()
  return width.value
})

const tabLabels = computed(() => {
  return [
    'tabs.my_page.publications',
    'tabs.my_page.umma_shorts',
    'tabs.my_page.umma_video',
    'tabs.my_page.alboms',
    'tabs.my_page.saved'
  ]
})

const changeState = () => {
  if (screenWidth.value > 575) {
    store.commit('setIsProfileTabsOpen', true)
    store.commit('setIsSavedTabsOpen', true)
  } else {
    store.commit('setIsProfileTabsOpen', false)
    store.commit('setIsSavedTabsOpen', false)
  }
}

watch(() => screenWidth.value, changeState)
onMounted(changeState)
</script>

<style scoped lang="scss">
.posts {
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-width: 700px;
  width: 100%;
  margin-left: 145px;
  @media (max-width: 1635px) {
    margin-left: 50px;
  }
  @media (max-width: 1535px) {
    margin-left: 0;
  }
  @media (max-width: 1377px) {
    max-width: 100%;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

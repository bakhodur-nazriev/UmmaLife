<template>
  <FeedsTab
      v-if="links[0].isSelected"
      @categoryHandler="categoryHandler"
      @audioHandler="audioHandler"
  />
  <SearchTab v-else-if="links[1].isSelected" @backToMain="backToMain(0)" />
  <AddMuvi v-else-if="links[2].isSelected" @backToMain="fileBackHandler" :file="file" />
  <ActivityMuvi v-else-if="links[3].isSelected" @backToMain="backToMain(0)" />
  <ProfileTab v-else-if="links[4].isSelected" @backToMain="backToMain(0)" />
  <CategoryTab v-else-if="isCategoryOpen" @backToMain="backToMain(0)" />
  <AudioTab v-else-if="isAudioOpen" @backToMain="backToMain(0)" />
  <MuviMobileNav :links="links" @linkHandler="linkHandler" @fileClicked="fileClickedHandler" />
  <input
      type="file"
      accept="video/mp4"
      ref="filesInput"
      @change="changeHandler"
      style="display: none"
  />
</template>

<script setup>
/* eslint-disable */
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'

import MuviMobileNav from '@/components/muvi/mobile/MuviMobileNav.vue'
import FeedsTab from '@/components/muvi/mobile/tabs/FeedsTab.vue'
import SearchTab from '@/components/muvi/mobile/tabs/SearchTab.vue'
import AddMuvi from '@/components/muvi/mobile/tabs/AddMuvi.vue'
import ActivityMuvi from '@/components/muvi/mobile/tabs/ActivityMuvi.vue'
import ProfileTab from '@/components/muvi/mobile/tabs/ProfileTab.vue'
import CategoryTab from '@/components/muvi/mobile/tabs/CategoryTab.vue'
import AudioTab from '@/components/muvi/mobile/tabs/AudioTab.vue'

const router = useRouter()
const { width } = useWindowSize()

watch(
    () => width.value,
    (val) => checkRouter(val)
)

const checkRouter = (width) => {
  if (width > 767) {
    router.push('/muvi')
  }
}

const isCategoryOpen = ref(false)
const isAudioOpen = ref(false)
const file = ref(null)
const filesInput = ref()

const links = ref([
  { icon: 'home', isSelected: true },
  { icon: 'search', isSelected: false },
  { icon: 'add-circle', isSelected: false },
  { icon: 'comment', isSelected: false },
  { icon: 'profile', isSelected: false }
])

const linkHandler = (index) => {
  links.value.forEach((l) => (l.isSelected = false))
  links.value[index].isSelected = true
}

const categoryHandler = () => {
  links.value.forEach((l) => (l.isSelected = false))
  isCategoryOpen.value = true
  isAudioOpen.value = false
}
const audioHandler = () => {
  links.value.forEach((l) => (l.isSelected = false))
  isAudioOpen.value = true
  isCategoryOpen.value = false
}

const backToMain = (index) => {
  isAudioOpen.value = false
  isCategoryOpen.value = false
  linkHandler(index)
}

const changeHandler = (event) => {
  file.value = event.target.files[0]
  if (file.value) {
    linkHandler(2)
  }
}

const fileClickedHandler = () => {
  file.value = null
  filesInput.value.click()
}

const fileBackHandler = () => {
  backToMain(0)
  file.value = null
}
onMounted(() => {
  checkRouter(width.value)
})
</script>

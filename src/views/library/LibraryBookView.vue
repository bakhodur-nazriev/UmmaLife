<template>
  <div class="book__view" :class="{ onePage: !isTwoPage, [menuOptions.theme]: menuOptions.theme }">
    <div class="overlay" v-if="isMenuOpen"></div>
    <header class="book__header">
      <div class="book__header--container">
        <div class="book__header--wrapper">
          <div class="book__header--actions">
            <button @click="$router.go(-1)" class="book__header--back">
              <ArrowLeftIcon />
            </button>
            <div class="book__header--logo">
              <img src="@/assets/images/logo/main-logo.svg" alt="main-logo" />
            </div>
          </div>
          <div class="book__header--name">{{ bookObj.name }}</div>
          <div class="book__header--switch">
            <span>1 страница </span>
            <BaseToggle :checked="isTwoPage" @update:isChecked="toggleHandler" />
            <span>2 страница </span>
          </div>
          <div class="book__header--settings">
            <div
              class="book__header--menu"
              @click="isMenuOpen = !isMenuOpen"
              :class="{ active: isMenuOpen }"
            >
              <SettingsIcon />
            </div>
            <div class="book__header--menu" @click="saveAdd" :class="{ marked: isSavedMarked }">
              <SaveAddIcon />
            </div>
            <div class="book__header--menu" @click="isSavedOpen = !isSavedOpen">
              <BookSavedIcon />
            </div>
            <LibraryReaderOptionsMenu
              :menuOptions="menuOptions"
              @handleEmit="handleEmit"
              v-on-click-outside="() => (isMenuOpen = false)"
              v-if="isMenuOpen"
            />
          </div>
        </div>
      </div>
    </header>
    <vue-reader
      :url="bookObj.epubSrc"
      :getRendition="getRendition"
      :tocChanged="tocChanged"
      @update:location="locationChange"
      :epubOptions="{
        allowPopups: true,
        allowScriptedContent: true,
        resizeOnOrientationChange: true
      }"
    >
    </vue-reader>

    <div class="book__page">
      {{ page }}
    </div>
    <div class="progress">
      <Slider
        :min="0"
        :max="100"
        style="width: 100%"
        v-model="current"
        @change="onChangeFunction"
        :step="1"
      />
    </div>
    <LibrarySavedModal
      v-if="isSavedOpen"
      :savedPages="savedPages"
      @closeHandler="isSavedOpen = false"
      @passBookData="handlePassData"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
import Slider from 'primevue/slider'
import { ref, watch, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { VueReader } from 'vue-reader'
import { useRoute } from 'vue-router'
import { vOnClickOutside } from '@vueuse/components'
import { books } from '@/dummy.js'

import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import SaveAddIcon from '@/components/icons/SaveAddIcon.vue'
import BookSavedIcon from '@/components/icons/BookSavedIcon.vue'
import LibraryReaderOptionsMenu from '@/components/library/LibraryReaderOptionsMenu.vue'
import LibrarySavedModal from '@/components/library/LibrarySavedModal.vue'

let rendition = null
let toc = []
let book
let displayed

const route = useRoute()

const bookObj = ref(books[route.params.id - 1])
const page = ref('')
const current = ref(0)
const isTwoPage = ref(true)
const isMenuOpen = ref(false)
const ecf = ref({
  epubcifi: '',
  label: ''
})
const label = ref('')
const savedPages = ref([])
const isSavedOpen = ref(false)

const menuOptions = ref({
  fontSize: 16,
  lineHeight: 120,
  fontFamily: 'inherit',
  theme: 'white'
})

const isSavedMarked = ref(false)

const handleEmit = (options) => {
  menuOptions.value = options
}

const saveAdd = () => {
  const isIndexFound = savedPages.value.findIndex((el) => el.epubcifi === ecf.value.epubcifi)

  if (isIndexFound === -1 && isSavedMarked) {
    savedPages.value.push(ecf.value)
  } else {
    savedPages.value = savedPages.value.filter((el) => el.epubcifi !== ecf.value.epubcifi)
  }
  localStorage.setItem('savedPages', JSON.stringify(savedPages.value))
  savedPages.value = JSON.parse(localStorage.getItem('savedPages') || '[]')
  checkIfMarked()
}

const toggleHandler = (val) => {
  isTwoPage.value = val
  rendition.spread(val ? 'auto' : 'none')
}
watch(
  () => menuOptions,
  () => {
    changeRenditionTheme(rendition)
  },
  { deep: true }
)

const changeRenditionTheme = useDebounceFn((rendition) => {
  rendition?.themes?.register('custom', {
    '*, p , span': {
      'line-height': menuOptions.value.lineHeight + '% !important',
      'font-size': menuOptions.value.fontSize + 'px !important',
      'font-family': menuOptions.value.fontFamily + ', sans-serif !important',
      'background-color': `${
        menuOptions.value.theme === 'white'
          ? '#ffffff'
          : menuOptions.value.theme === 'yellow'
          ? '#fff4e6'
          : '#191919'
      }`,
      color: menuOptions.value.theme === 'black' ? '#f1f1f1 !important' : '#1f1f1f !important'
    }
  })
  rendition?.themes?.select('custom')
}, 200)

const getRendition = (val) => {
  rendition = val
  changeRenditionTheme(rendition)

  book = rendition.book
  displayed = rendition.display()
  book.ready
    .then(() => {
      return book.locations.generate(1600)
    })
    .then((locations) => {
      // Wait for book to be rendered to get current page
      displayed.then(function () {
        // Get the current CFI
        const currentLocation = rendition.currentLocation()
        // Get the Percentage (or location) from that CFI
        const currentPage = book.locations.percentageFromCfi(currentLocation.start.cfi)
        current.value = currentPage
      })
      rendition.on('relocated', (location) => {
        const percent = book.locations.percentageFromCfi(location.start.cfi)
        const percentage = Math.floor(percent * 100)
        current.value = percentage
      })
    })
}
const tocChanged = (val) => (toc = val)

const getLabel = (toc, href) => {
  let label = 'n/a'
  toc.some((item) => {
    if (item.subitems.length > 0) {
      const subChapter = getLabel(item.subitems, href)
      if (subChapter !== 'n/a') {
        label = subChapter
        return true
      }
    } else if (item.href.includes(href)) {
      label = item.label
      return true
    }
  })
  return label
}
const locationChange = (epubcifi) => {
  if (epubcifi) {
    const { displayed, href } = rendition.location.start

    if (href !== 'titlepage.xhtml') {
      label.value = getLabel(toc, href)
      page.value = `${displayed.page}/${displayed.total} ${label.value}`
      ecf.value = { epubcifi, page: displayed.page, label: label.value }
      checkIfMarked()
    }
  }
}

const checkIfMarked = () => {
  const isIndexFound = savedPages.value.findIndex((el) => el.epubcifi === ecf.value.epubcifi)
  isSavedMarked.value = isIndexFound !== -1
}

const handlePassData = (savedData) => {
  rendition.display(savedData.epubcifi)
}

const onChangeFunction = useDebounceFn((value) => {
  const cfi = book.locations.cfiFromPercentage(value / 100)
  rendition.display(cfi)
}, 200)

onMounted(() => {
  savedPages.value = JSON.parse(localStorage.getItem('savedPages') || '[]')
})
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.book {
  &__view {
    min-height: 100dvh;
    .container {
      max-width: 100%;
      width: 100%;
      height: auto;
    }
  }

  &__header {
    width: 100%;
    padding: 40px;
    background-color: var(--color-white);
    box-shadow: 10px 0px 40px 0px rgba(108, 108, 108, 0.15);
    z-index: 10;
    position: relative;
    @media (max-width: 767px) {
      padding: 20px 16px;
      box-shadow: none;
    }

    &--container {
      max-width: 1680px;
      width: 100%;
      margin: 0 auto;
    }
    &--wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &--actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    &--back {
      border: none;
      background: transparent;
      outline: none;
      display: block;
      color: var(--color-hippie-blue);
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &--logo {
      width: 150px;
      img {
        width: 100%;
        display: block;
      }
      @media (max-width: 969px) {
        display: none;
      }
    }
    &--name {
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      @media (max-width: 900px) {
        display: none;
      }
    }
    &--switch {
      display: flex;
      align-items: center;
      gap: 12px;
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      @media (max-width: 900px) {
        display: none;
      }
    }
    &--settings {
      display: flex;
      gap: 40px;
      align-items: center;
      position: relative;
      @media (max-width: 767px) {
        gap: 20px;
      }
    }
    &--menu {
      color: var(--color-secondary);
      width: 32px;
      height: 32px;
      cursor: pointer;

      transition: all 0.3s ease-in-out;
      &.marked {
        color: var(--color-valencia);
      }
      &.active,
      &:hover {
        color: var(--color-mine-shaft);
      }
      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      @media (max-width: 767px) {
        width: 24px;
        height: 24px;
      }
    }
  }
  &__page {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    margin-bottom: 13px;
    color: var(--color-secondary);
  }
}
</style>

<style lang="scss">
.book__view {
  &.white {
    &,
    .readerArea,
    .book__header,
    .library__options {
      background-color: var(--color-white) !important;
      transition: all 0.3s ease-in-out;
    }
  }
  &.yellow {
    &,
    .readerArea,
    .book__header,
    .library__options {
      background-color: #fff4e6 !important;
      transition: all 0.3s ease-in-out;
    }
  }
  &.black {
    &,
    .readerArea,
    .book__header,
    .library__options {
      background-color: var(--color-light-black) !important;
      color: var(--color-white) !important;
      transition: all 0.3s ease-in-out;
    }
    .book__header--name,
    .book__header--switch span {
      color: var(--color-white);
    }
    .book__header--menu {
      &.active,
      &:hover {
        color: var(--color-white);
      }
    }
  }
}
.readerArea {
  min-height: 75dvh;
  @media (max-width: 767px) {
    min-height: 83dvh;
  }
  .titleArea {
    display: none !important;
  }

  .arrow {
    font-size: 0;
    background-repeat: no-repeat;
    width: 60px;
    height: 60px;
    background-position: center;
    &.pre {
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='29.5' stroke='%2349A399'/%3E%3Cpath d='M33 36.7414L26.3793 30.1207L33 23.5' stroke='%2349A399' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

      left: 20px;
    }
    &.next {
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='29.5' stroke='%2349A399'/%3E%3Cpath d='M27 23.2578L33.6207 29.8785L27 36.4992' stroke='%2349A399' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

      right: 20px;
    }
    @media (max-width: 767px) {
      display: none;
    }
  }
}

.tocArea {
  height: 80dvh;
  .active {
    color: var(--color-hippie-blue);
    border-bottom: 2px solid var(--color-hippie-blue);
  }
}
.progress {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  input[type='range'] {
    width: 100%;
  }
  .p-slider-range {
    background-color: var(--color-hippie-blue);
    border-radius: 3px;
  }
  .p-slider.p-slider-horizontal {
    height: 6px;
    border-radius: 3px;
  }
  .p-slider-handle {
    background-color: var(--color-hippie-blue);
    border-color: var(--color-hippie-blue);
  }
}
</style>

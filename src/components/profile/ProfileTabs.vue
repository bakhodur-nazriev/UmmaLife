<template>
  <div class="tabs">
    <div class="tabs__header" v-on-click-outside="handleClose">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'tabs__header-item',
          {
            active: activeTab === index,
            dropdown__tab: (index === 0 || index === 4) && screenWidth < 575
          }
        ]"
        @click="changeTab(index)"
      >
        {{ $t(tab) }}
      </div>
    </div>

    <div class="tabs__content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="tabs__content--inside--section"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  tabs: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['changeTab'])

const activeTab = ref(0)

const { width: screenWidth } = useWindowSize()

const changeTab = (index) => {
  activeTab.value = index
  emit('changeTab', activeTab.value)

  if (index === 0 && screenWidth.value < 575) {
    store.commit('setIsProfileTabsOpen', !store.state.isProfileTabsOpen)
  }
  if (index === 4 && screenWidth.value < 575) {
    store.commit('setIsSavedTabsOpen', !store.state.isSavedTabsOpen)
  }
}

const handleClose = () => {
  if (screenWidth.value < 575) {
    store.commit('setIsProfileTabsOpen', false)
    store.commit('setIsSavedTabsOpen', false)
  }
}
</script>

<style scoped lang="scss">
.tabs__content--inside--section {
  display: flex;
  row-gap: 10px;
  flex-direction: column;
  width: 100%;
}

.tabs {
  display: flex;
  flex-direction: column;
  position: relative;
}

.tabs__header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--color-white);
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  border-bottom: 1px solid var(--color-seashell);
  padding: 0 40px;
  gap: 40px;
  @media (max-width: 991px) {
    justify-content: flex-start;
    padding: 0 25px;
  }
  @media (max-width: 575px) {
    overflow-x: scroll;
    gap: 10px;
    padding: 0 16px;
    border-radius: 0;
    padding-top: 30px;
    margin-top: -20px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.tabs__header-item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 16px 0;
  color: var(--color-silver-chalice);
  font-weight: 500;
  font-size: 16px;
  @media (max-width: 575px) {
    padding: 16px 10px;
  }
  &.dropdown__tab {
    @media (max-width: 575px) {
      gap: 4px;

      &::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M9.94936 5.6875L7.05281 8.58406L4.15625 5.6875' stroke='%239D9D9D' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        display: block;
        width: 14px;
        order: 1;
        position: relative;
        top: 2px;
      }
      &.active::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M9.94936 5.6875L7.05281 8.58406L4.15625 5.6875' stroke='%231F1F1F' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
  }
}

.tabs__header-item.active {
  position: relative;
  color: var(--color-mine-shaft);
  padding-bottom: 16px;
  font-weight: 600;
  z-index: 5;
}

.tabs__header-item.active::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--color-deep-cerulean);
  border-radius: 1px 1px 0 0;
  @media (max-width: 575px) {
    width: 100%;
  }
}
</style>

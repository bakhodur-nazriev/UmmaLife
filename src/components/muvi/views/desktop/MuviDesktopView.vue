<template>
  <div class="muvi__page">
    <GroupsNav :links="muvieLinks" className="muvi__nav" :routes="true" />
    <div class="muvi__container">
      <MuviTabSwitch
        :tabs="[$t('muvi_mobile.subscriptions'), $t('muvi_mobile.recommendations')]"
        :activeIndex="activeIndex"
        @handleTabClick="handleTabClick"
      />
      <TabMuviFeeds filter="subscription" v-if="activeIndex === 0" />
      <TabMuviFeeds filter="recomendation" v-else />
    </div>
  </div>
  <teleport to="body">
    <router-view />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { muvieLinks } from '@/constants.js'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import TabMuviFeeds from '@/components/muvi/tabs/TabMuviFeeds.vue'
import MuviTabSwitch from '@/components/muvi/MuviTabSwitch.vue'

const activeIndex = ref(1)

const handleTabClick = async (index) => {
  activeIndex.value = index
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
.muvi {
  &__container {
    max-width: 1510px;
    width: 100%;
    margin: 0 auto;
    padding: 24px 16px;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(6, calc(15% + 8px));
    gap: 68px 16px;
    padding-bottom: 20px;
    transition: all 0.3s;

    @media (max-width: 1580px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 1380px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1127px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 910px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>

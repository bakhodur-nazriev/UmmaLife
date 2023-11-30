<template>
  <div class="muvi__page">
    <GroupsNav :links="muvieLinks" className="muvi__nav" :routes="true" />
    <div class="muvi__container">
      <TabMuviFeeds />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { muvieLinks } from '@/constants.js'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import TabMuviFeeds from '@/components/muvi/tabs/TabMuviFeeds.vue'
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

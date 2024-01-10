<template>
  <MainLayout v-if="width > 767">
    <MuviDesktopView />
  </MainLayout>
  <MuviMobileLayout v-else>
    <MuviMobileView />
  </MuviMobileLayout>
</template>

<script setup>
/* eslint-disable */

import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import MuviDesktopView from '@/components/muvi/views/desktop/MuviDesktopView.vue'
import MuviMobileView from '@/components/muvi/views/mobile/MuviMobileView.vue'
const { width } = useWindowSize()
</script>

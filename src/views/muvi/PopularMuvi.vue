<template>
  <MainLayout v-if="width > 767">
    <DesktopPopoularMuvi />
  </MainLayout>
  <MuviMobileLayout v-else>
    <MobilePopularMuvi />
  </MuviMobileLayout>
</template>

<script setup>
/* eslint-disable */

import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import DesktopPopoularMuvi from '@/components/muvi/views/desktop/DesktopPopoularMuvi.vue'
import MobilePopularMuvi from '@/components/muvi/views/mobile/MobilePopularMuvi.vue'
const { width } = useWindowSize()
</script>

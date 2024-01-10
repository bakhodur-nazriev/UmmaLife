<template>
  <MainLayout v-if="width > 767">
    <DesktopActivityMuvi />
  </MainLayout>
  <MuviMobileLayout v-else>
    <MobileActivityMuvi />
  </MuviMobileLayout>
</template>

<script setup>
/* eslint-disable */

import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import DesktopActivityMuvi from '@/components/muvi/views/desktop/DesktopActivityMuvi.vue'
import MobileActivityMuvi from '@/components/muvi/views/mobile/MobileActivityMuvi.vue'
const { width } = useWindowSize()
</script>

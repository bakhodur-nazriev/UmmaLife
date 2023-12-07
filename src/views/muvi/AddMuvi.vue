<template>
  <MainLayout v-if="width > 767">
    <DesktopAddMuvi />
  </MainLayout>
  <MuviMobileLayout v-else>
    <MobileAddMuvi />
  </MuviMobileLayout>
</template>

<script setup>
/* eslint-disable */

import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import DesktopAddMuvi from '@/components/muvi/views/desktop/DesktopAddMuvi.vue'
import MobileAddMuvi from '@/components/muvi/views/mobile/MobileAddMuvi.vue'
const { width } = useWindowSize()
</script>

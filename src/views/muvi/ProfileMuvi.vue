<template>
  <MainLayout v-if="width > 767">
    <DesktopProfileMuvi />
  </MainLayout>
  <MuviMobileLayout v-else>
    <MobileProfileMuvi />
  </MuviMobileLayout>
</template>

<script setup>
/* eslint-disable */

import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import DesktopProfileMuvi from '@/components/muvi/views/desktop/DesktopProfileMuvi.vue'
import MobileProfileMuvi from '@/components/muvi/views/mobile/MobileProfileMuvi.vue'
const { width } = useWindowSize()
</script>

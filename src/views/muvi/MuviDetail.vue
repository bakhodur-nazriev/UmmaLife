<template>
  <DesktopMuviDetail v-if="width > 767" />
  <MuviMobileLayout v-else>
    <MobileMuviDetail />
  </MuviMobileLayout>
</template>

<script setup>
/* eslint-disable */

import { useWindowSize } from '@vueuse/core'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import DesktopMuviDetail from '@/components/muvi/views/desktop/DesktopMuviDetail.vue'
import MobileMuviDetail from '@/components/muvi/views/mobile/MobileMuviDetail.vue'
const { width } = useWindowSize()
</script>

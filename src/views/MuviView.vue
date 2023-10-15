<template>
  <div class="muvi__page">
    <main-layout v-if="width > 767">
      <MuviDesktopLayout />
    </main-layout>
    <MuviMobileLayout v-else />
  </div>
</template>

<script setup>
/* eslint-disable */
import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviDesktopLayout from '@/components/muvi/MuviDesktopLayout.vue'
import MuviMobileLayout from '@/components/muvi/mobile/MuviMobileLayout.vue'

const { width } = useWindowSize()
</script>

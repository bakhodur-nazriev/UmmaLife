<template>
  <component :is="layout" v-if="this.$route.meta.layout !== 'muvi'">
    <router-view></router-view>
  </component>
  <router-view v-else />
  <div class="player" v-on-click-outside="closeHandler">
    <AudioPlayList v-if="isListOpen" :playerHeight="playerMargin" />
    <AudioPlayerComponent @playerHeight="setPlayerMargin" v-if="isPlayerOpen" />
  </div>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import AuthLayout from '@/components/layouts/LayoutAuth.vue'
import AudioPlayerComponent from '@/components/audio/AudioPlayerComponent.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import AudioPlayList from '@/components/audio/AudioPlayList.vue'
import { mapMutations, mapState, useStore } from 'vuex'

export default {
  components: {
    AudioPlayerComponent,
    AuthLayout,
    MainLayout,
    AudioPlayList,
    MuviMobileLayout
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'auth'}-layout`
    },
    isAuthPage() {
      const authRoutes = ['login', 'register', 'forgot-password']
      return authRoutes.includes(this.$route.name)
    },
    authLayout() {
      return this.isAuthPage ? 'AuthLayout' : 'MainLayout'
    },
    mainLayout() {
      return 'MainLayout'
    },
    ...mapState('audio', ['isPlayerOpen', 'isListOpen']),
    ...mapState(['playerMargin'])
  },
  methods: {
    ...mapMutations(['setPlayerMargin'])
  }
}
</script>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
const store = useStore()
const closeHandler = () => {
  store.commit('audio/setListOpen', false)
}
</script>

<style>
@import 'assets/styles.scss';
</style>

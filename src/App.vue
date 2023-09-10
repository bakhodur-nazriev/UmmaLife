<template>
  <!--  <layout-auth v-if="true"></layout-auth>-->
  <!--  <main-layout v-if="false"></main-layout>-->
  <router-view></router-view>
  <div class="player" v-on-click-outside="closeHandler">
    <AudioPlayList v-if="isListOpen" :playerHeight="playerMargin" />
    <AudioPlayerComponent @playerHeight="setPlayerMargin" v-if="isPlayerOpen" />
  </div>
</template>

<script>
// import MainLayout from '@/components/layouts/MainLayout.vue'
// import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import AudioPlayerComponent from '@/components/audio/AudioPlayerComponent.vue'
import AudioPlayList from '@/components/audio/AudioPlayList.vue'
import { mapMutations, mapState, useStore } from 'vuex'

export default {
  components: {
    AudioPlayerComponent,
    // LayoutAuth,
    // MainLayout
    AudioPlayList
  },
  computed: {
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

<style scoped>
@import 'assets/styles.scss';
</style>

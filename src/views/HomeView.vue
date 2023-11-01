<template>
  <main-layout>
    <vue-tel-input v-model="phone" mode="international"></vue-tel-input>
  </main-layout>
</template>

<script>
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import MainLayout from '@/components/layouts/MainLayout.vue'

export default {
  name: 'HomeView',
  components: {
    MainLayout,
    VueTelInput
  },
  data () {
    return {
      phone: ''
    }
  }
}
</script>

<style scoped>

</style>

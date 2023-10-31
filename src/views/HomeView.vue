<template>
  <vue-tel-input v-model="phone" mode="international"></vue-tel-input>
</template>

<script>
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

export default {
  name: 'HomeView',
  components: {
    VueTelInput
  },
  data() {
    return {
      phone: ''
    }
  }
}
</script>

<style scoped></style>

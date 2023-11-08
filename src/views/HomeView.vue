<template>
  <vue-tel-input v-model="phone" mode="international"></vue-tel-input>
</template>

<script setup>
/* eslint-disable */
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { ref } from 'vue'

const phone = ref('')
</script>

<style scoped></style>

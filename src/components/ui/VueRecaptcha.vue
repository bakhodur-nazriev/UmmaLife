<template>
  <vue-recaptcha-plugin @verify="onRecaptchaVerify"></vue-recaptcha-plugin>
</template>

<script>
import { VueRecaptchaPlugin } from 'vue-recaptcha'
export default {
  components: { VueRecaptchaPlugin },
  data () {},
  methods: {
    onRecaptchaVerify (token) {
      // Handle the reCAPTCHA token verification
      console.log('Recaptcha token:', token)
    }
  }
}
</script>

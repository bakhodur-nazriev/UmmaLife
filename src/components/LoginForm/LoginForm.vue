<template>
  <login-with-email></login-with-email>

  <login-with-phone></login-with-phone>
</template>

<script>
import LoginWithEmail from "@/components/LoginForm/LoginWithEmail.vue";
import LoginWithPhone from "@/components/LoginForm/LoginWithPhone.vue";

export default {
  components: { LoginWithPhone, LoginWithEmail }
}
</script>

<style scoped></style>

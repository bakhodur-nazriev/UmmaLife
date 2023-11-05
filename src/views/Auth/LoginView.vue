<template>
  <login-with-email v-if="selectedForm === 'email'"></login-with-email>

  <login-with-phone v-if="selectedForm === 'phone'"></login-with-phone>

  <div class="login-with-phone-section">
    <SampleButton
      color="none"
      class="link-with-phone-number"
      @click="toggleForm"
      :title="`${
        selectedForm === 'email' ? $t('login.with_phone_number') : $t('login.with_email')
      }`"
    />
  </div>
</template>

<script>
import LoginWithPhone from '@/components/LoginForm/LoginWithPhone.vue'
import LoginWithEmail from '@/components/LoginForm/LoginWithEmail.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: {
    SampleButton,
    LoginWithEmail,
    LoginWithPhone
  },
  data() {
    return {
      selectedForm: ''
    }
  },
  methods: {
    toggleForm() {
      this.selectedForm = this.selectedForm === 'phone' ? 'email' : 'phone'
      sessionStorage.setItem('selectedForm', this.selectedForm)
    },
    handleLoginSuccess() {
      // Логика успешного входа пользователя

      const redirectTo = this.$route.query.redirect || { name: 'home' }
      this.$router.push(redirectTo)
    }
  },
  created() {
    this.selectedForm = sessionStorage.getItem('selectedForm') || 'email'
  }
}
</script>

<style scoped>
.link-with-phone-number {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-mine-shaft);
  cursor: pointer;
  border: none;
}

.login-with-phone-section {
  margin-top: 32px;
}
</style>

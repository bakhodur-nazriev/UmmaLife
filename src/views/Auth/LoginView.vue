<template>
  <LayoutAuth>
    <login-with-email v-if="selectedForm === 'email'"></login-with-email>

    <login-with-phone v-if="selectedForm === 'phone'"></login-with-phone>

    <div class="login-with-phone-section">
      <button class="link-with-phone-number" @click="toggleForm">
        {{ selectedForm === 'email' ? $t('login.with_phone_number') : $t('login.with_email') }}
      </button>
    </div>

  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import LoginWithPhone from '@/components/LoginForm/LoginWithPhone.vue'
import LoginWithEmail from '@/components/LoginForm/LoginWithEmail.vue'

export default {
  components: {
    LoginWithEmail,
    LayoutAuth,
    LoginWithPhone
  },
  data () {
    return {
      selectedForm: ''
    }
  },
  methods: {
    toggleForm () {
      this.selectedForm = this.selectedForm === 'phone' ? 'email' : 'phone'
      sessionStorage.setItem('selectedForm', this.selectedForm)
    }
  },
  created () {
    this.selectedForm = sessionStorage.getItem('selectedForm') || 'email'
  }
}
</script>

<style scoped>
.link-with-phone-number {
  font-size: 16px;
  font-weight: 550;
  color: #1F1F1F;
  cursor: pointer;
  border: none;
}

.login-with-phone-section {
  margin-top: 32px;
}
</style>

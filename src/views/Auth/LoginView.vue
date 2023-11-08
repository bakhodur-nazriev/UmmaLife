<script setup>
/* eslint-disable */
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import LoginWithPhone from '@/components/LoginForm/LoginWithPhone.vue'
import LoginWithEmail from '@/components/LoginForm/LoginWithEmail.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

const selectedForm = ref('')
const router = useRouter()
const toggleForm = () => {
  selectedForm.value = selectedForm.value === 'phone' ? 'email' : 'phone'
  sessionStorage.setItem('selectedForm', selectedForm.value)
}
const handleLoginSuccess = () => {
  const redirectTo = router.currentRoute.value.query.redirect || {name: 'home'}
  router.push(redirectTo)
}

onMounted(() => {
  selectedForm.value = sessionStorage.getItem('selectedForm') || 'email'
})
</script>

<template>
  <LayoutAuth>
    <LoginWithEmail v-if="selectedForm === 'email'"/>

    <LoginWithPhone v-if="selectedForm === 'phone'"/>

    <div class="login-with-phone-section">
      <SampleButton
          color="none"
          class="link-with-phone-number"
          @click="toggleForm"
          :title="`${ selectedForm === 'email' ? $t('login.with_phone_number') : $t('login.with_email') }`"
      />
    </div>
  </LayoutAuth>
</template>

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

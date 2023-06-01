<template>
  <LayoutAuth>
    <register-form v-if="currentStep === 'registerForm'"></register-form>
    <verify-with-email v-if="currentStep === 'verifyWithEmail'"></verify-with-email>
    <create-new-password v-if="currentStep === 'createNewPassword'"></create-new-password>
    <base-user-info v-if="currentStep === 'baseUserInfo'"></base-user-info>
    <add-phone-and-login v-if="currentStep === 'addPhoneAndLogin'"></add-phone-and-login>
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import VerifyWithEmail from '@/components/RegisterForm/VerifyWithEmail.vue'
import CreateNewPassword from '@/components/RegisterForm/CreateNewPassword.vue'
import BaseUserInfo from '@/components/RegisterForm/BaseUserInfo.vue'
import AddPhoneAndLogin from '@/components/RegisterForm/AddPhoneAndLogin.vue'
import RegisterForm from '@/components/RegisterForm/RegisterForm.vue'

export default {
  components: {
    RegisterForm,
    AddPhoneAndLogin,
    BaseUserInfo,
    CreateNewPassword,
    VerifyWithEmail,
    LayoutAuth
  },
  data () {
    return {
      currentStep: 'verifyWithEmail'
    }
  },
  methods: {
    nextStep () {
      if (this.currentStep === 'registerForm') {
        this.currentStep = 'registerForm'
      }
      if (this.currentStep === 'verifyWithEmail') {
        this.currentStep = 'createNewPassword'
      } else if (this.currentStep === 'createNewPassword') {
        this.currentStep = 'baseUserInfo'
      } else if (this.currentStep === 'baseUserInfo') {
        this.currentStep = 'addPhoneAndLogin'
      }
      // ...и так далее
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <LayoutAuth>
    <register-form v-if="false"></register-form>

    <verify-with-email v-if="false"></verify-with-email>

    <create-new-password v-if="false"></create-new-password>

    <base-user-info v-if="false"></base-user-info>

    <add-phone-and-login v-if="true"></add-phone-and-login>
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
  }
}
</script>

<style scoped>

</style>

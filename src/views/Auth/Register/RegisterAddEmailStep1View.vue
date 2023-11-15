<script setup>
/* eslint-disable */
import {ref} from 'vue'
// import VerifyWithEmail from '@/components/RegisterForm/VerifyWithEmail.vue'
// import CreateNewPassword from '@/components/RegisterForm/CreateNewPassword.vue'
// import BaseUserInfo from '@/components/RegisterForm/BaseUserInfo.vue'
// import AddPhoneAndLogin from '@/components/RegisterForm/AddPhoneAndLogin.vue'
// import RegisterForm from '@/components/RegisterForm/RegisterForm.vue'
// import CategorySelection from '@/components/RegisterForm/CategorySelection.vue'

const currentStep = ref('registerForm')

const handleNextStep = () => {
  switch (currentStep.value) {
    case 'registerForm':
      currentStep.value = 'verifyWithEmail'
      break
    case 'verifyWithEmail':
      currentStep.value = 'createNewPassword'
      break
    case 'createNewPassword':
      currentStep.value = 'baseUserInfo'
      break
    case 'baseUserInfo':
      currentStep.value = 'addPhoneAndLogin'
      break
    case 'addPhoneAndLogin':
      currentStep.value = 'categoryInterests'
      break
  }
}
</script>

<template>
<!--  <RegisterForm v-if="currentStep === 'registerForm'" @nextStep="handleNextStep"/>-->
<!--  <VerifyWithEmail v-if="currentStep === 'verifyWithEmail'" @`  nextStep="handleNextStep"/>-->
<!--  <CreateNewPassword v-if="currentStep === 'createNewPassword'" @nextStep="handleNextStep"/>-->
<!--  <BaseUserInfo v-if="currentStep === 'baseUserInfo'" @nextStep="handleNextStep"/>-->
<!--  <AddPhoneAndLogin v-if="currentStep === 'addPhoneAndLogin'" @nextStep="handleNextStep"/>-->
<!--  <CategorySelection v-if="currentStep === 'categoryInterests'" @nextStep="handleNextStep"/>-->
</template>

<style scoped></style>

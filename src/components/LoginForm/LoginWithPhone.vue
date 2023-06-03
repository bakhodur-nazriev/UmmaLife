<template>
  <enter-phone-form
    v-if="currentStep === 'enterPhoneForm'"
    @nextStep="handleNextStep"
  ></enter-phone-form>

  <verify-phone-form
    v-if="currentStep === 'verifyPhoneForm'"
    @nextStep="handleNextStep"
  ></verify-phone-form>
</template>

<script>
import VerifyPhoneForm from '@/components/LoginForm/VerifyPhoneForm.vue'
import EnterPhoneForm from '@/components/LoginForm/EnterPhoneForm.vue'

export default {
  components: {
    EnterPhoneForm,
    VerifyPhoneForm
  },
  data () {
    return {
      currentStep: 'enterPhoneForm'
    }
  },
  methods: {
    handleNextStep () {
      if (this.currentStep === 'enterPhoneForm') {
        this.currentStep = 'verifyPhoneForm'
      }
    }
  }
}
</script>

<style scoped>

</style>

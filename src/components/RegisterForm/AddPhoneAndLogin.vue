<template>
  <form-auth>
    <title-sample>{{ $t('register.title') }}</title-sample>

<!--    <div class="subtitles__text-fields">-->
      <h5 class="subhead medium">{{ $t('register.messages.enter_your_phone') }}</h5>
      <label class="login__with-phone-label">{{ $t('register.messages.can_login_with_phone_number') }}</label>
<!--    </div>-->

    <sample-phone-input></sample-phone-input>

    <div class="login__button-section">
      <sample-button @click="handleSubmit">{{ $t('buttons.login') }}</sample-button>
    </div>

    <div class="skip__link-section">
      <router-link :to="`/${$i18n.locale}/login`">{{ $t('links.skip') }}</router-link>
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SamplePhoneInput from '@/components/ui/SamplePhoneInput.vue'
export default {
  components: { SamplePhoneInput, TitleSample, FormAuth, SampleButton },
  data () {},
  methods: {
    handleSubmit () {
      // Выполните обработку данных формы

      // Переключитесь на следующий шаг
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>
.skip__link-section {
  display: flex;
  justify-content: center;
}

.skip__link-section a {
  color: #1F1F1F;
  text-decoration: none;
  font-weight: 500;
}

.login__button-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.login__button-section button {
  width: 100%;
  margin-top: 64px;
}

.login__with-phone-label {
  font-size: 16px;
  font-weight: 400;
  margin-top: 32px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .login__button-section button {
    max-width: 320px;
  }
}
</style>

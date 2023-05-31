<template>
  <form-auth>
    <title-sample>{{ $t('login.title') }}</title-sample>

    <h5 class="subhead roman reminder-message">{{ $t('login.messages.verify_with_phone') }}</h5>

    <h5 class="text-1 bold reply__phone-number">+380664561212</h5>

    <div class="verify__number-section">
      <sample-input></sample-input>
      <sample-input></sample-input>
      <sample-input></sample-input>
      <sample-input></sample-input>
      <sample-input></sample-input>
      <sample-input></sample-input>
    </div>

    <div class="login__button-section">
      <sample-button>{{ $t('buttons.login') }}</sample-button>
    </div>

    <div class="resend__code">
      <label>{{ $t('login.messages.didnt_receive_code') }}</label>
      <router-link
        class="active-link"
        :to="`/${$i18n.locale}/login`"
      >
        {{ $t('links.resend') }} 00:32
      </router-link>
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleInput from '@/components/ui/SampleInput.vue'

export default {
  components: {
    SampleInput,
    FormAuth,
    TitleSample,
    SampleButton
  },
  data () {
  }
}
</script>

<style scoped>
.active-link {
  text-decoration: none;
}

.resend__code {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.resend__code > label, a {
  margin: 0 4px;
}

.resend__code > label {
  color: #B0B0B0;
}

.reply__phone-number {
  margin-bottom: 32px;
}

.reminder-message {
  margin-top: 0;
  margin-bottom: 24px;
}

.verify__number-section {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 48px;
}

.verify__number-section input {
  width: 45px;
  height: 45px;
  font-size: 20px;
  text-align: center;
}

.login__button-section {
  display: flex;
  justify-content: center;
}

.login__button-section button {
  width: 100%;
}

@media (min-width: 768px) {
  .login__button-section button {
    max-width: 320px;
  }

  .resend__code {
    flex-direction: row;
  }

  .verify__number-section {
    gap: 17px;
  }

  .verify__number-section input {
    width: 66px;
    height: 66px;
    font-size: 24px;
  }
}
</style>

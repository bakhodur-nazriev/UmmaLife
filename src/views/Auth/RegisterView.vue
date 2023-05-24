<template>
  <LayoutAuth>
    <form-auth>
      <title-sample>{{ $t('register.title') }}</title-sample>

      <sample-input
        typeof="email"
        :placeholder="$t('register.placeholders.email')"
      ></sample-input>

      <sample-button>{{ $t('buttons.get_code_by_email') }}</sample-button>
    </form-auth>
    <!--    <form action="" class="register-form">
          <input
            type="text"
            class="input-primary email-input"
            :placeholder="$t('register.placeholders.email')"
          >

          <div class="checkbox-section">
            <input type="checkbox" class="terms-and-policy-checkbox">
            <label>
              {{ $t('register.agreement_to_creating_account') }}<br>
              <a href="" class="active-link">{{ $t('links.terms') }}</a> &
              <a href="" class="active-link">{{ $t('links.privacy_policy') }}</a>
            </label>
          </div>

          <button class="btn btn-primary submit-button">{{ $t('buttons.get_code_by_email') }}</button>
        </form>-->
    <!--    <div class="bottom-section">-->
    <!--      <label>{{ $t('register.label') }}</label>-->
    <!--      <router-link :to="{name: 'login'}">{{ $t('buttons.login') }}</router-link>-->
    <!--    </div>-->
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleInput from '@/components/ui/SampleInput.vue'

export default {
  components: {
    SampleInput,
    SampleButton,
    TitleSample,
    LayoutAuth,
    FormAuth
  }
}
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.submit-button {
  border-radius: 10px;
  width: 320px;
}

.email-input {
  margin-bottom: 24px;
}

.email-input {
  border-radius: 10px;
  height: 48px;
  padding: 14px;
}

.bottom-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.terms-and-policy-checkbox {
  appearance: none;
  background-color: #f1f1f1;
  height: 32px;
  width: 32px;
  border: none;
  outline: none;
  border-radius: 2px;
}

.terms-and-policy-checkbox:checked {
  background: #49A399;
}

.checkbox-section {
  display: flex;
  align-items: ;
}
</style>

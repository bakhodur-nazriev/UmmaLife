<template>
  <form-auth>
    <title-sample>{{ $t('register.title') }}</title-sample>

    <div class="subtitles__text-fields">
      <h5 class="text-1 medium">{{ $t('register.messages.fill_your_information') }}</h5>
      <label class="required-fields-label">{{ $t('register.messages.required_fields') }}</label>
    </div>

    <div class="sample__inputs-section">
    <sample-input :placeholder="$t('register.placeholders.name')"></sample-input>
    <sample-input :placeholder="$t('register.placeholders.last_name')"></sample-input>
    <sample-input :placeholder="$t('register.placeholders.gender')"></sample-input>
    </div>

    <div class="login__button-section">
      <sample-button>{{ $t('buttons.next') }}</sample-button>
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleInput from '@/components/ui/SampleInput.vue'

export default {
  components: { SampleInput, TitleSample, FormAuth, SampleButton }
}
</script>

<style scoped>
.sample__inputs-section {
  display: flex;
  flex-direction: column;
  gap: 24px 0;
}

.subtitles__text-fields {
  margin-bottom: 24px;
}

.required-fields-label {
  color: #B0B0B0;
  font-size: 14px;
}

.login__button-section {
  display: flex;
  justify-content: center;
}

.login__button-section button {
  width: 100%;
  margin-top: 64px;
}

@media (min-width: 768px) {
  .login__button-section button {
    max-width: 320px;
  }
}
</style>

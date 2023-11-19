<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('register.title') }}</TitleSample>

    <div :class="['input-wrapper', { error: hasError || isInvalidEmail }]">
      <input
          type="email"
          v-model="email"
          class="base-input"
          :placeholder="$t('register.placeholders.email')"
      />
      <small v-if="hasError || isInvalidEmail" class="error-message">
        {{ $t(isInvalidEmail ? 'register.validation.incorrect_email' : 'register.validation.empty_email') }}
      </small>
    </div>

    <CheckBox
        class="register-checkbox"
        name="agreement"
        color="secondary"
        text-size="small"
    >
      {{ $t('register.messages.agreement_to_creating_account') }} <br>
      <router-link
          class="link register-checkbox__link"
          :to="`/${$i18n.locale}/terms`"
      >
        {{ $t('links.terms') }}
      </router-link>
      <span class="symbol__ampersand">&</span>
      <router-link
          class="link register-checkbox__link"
          :to="`/${$i18n.locale}/privacy-policy`"
      >
        {{ $t('links.privacy_policy') }}
      </router-link>
    </CheckBox>

    <div class="login-button-section">
      <SampleButton
          :title="$t('buttons.get_code_by_email')"
          :type="submitting ? 'button' : 'submit'"
          :disabled="submitting"
      >
      </SampleButton>
    </div>

    <div class="login-section">
      <label class="login-section__label">{{ $t('register.label') }}</label>
      <router-link
          class="login-section__link"
          :to="`/${$i18n.locale}/login-by-email`"
      >
        {{ $t('login.title') }}
      </router-link>
    </div>
  </FormAuth>
</template>

<script>
/* eslint-disable */
import SampleButton from '@/components/ui/SampleButton.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import axios from 'axios'
import albumsAdd from "@/components/albums/AlbumsAdd.vue";

export default {
  components: {
    TitleSample,
    CheckBox,
    FormAuth,
    SampleButton
  },
  data() {
    return {
      email: '',
      hasError: false,
      loading: false,
      submitting: false
    }
  },
  computed: {
    isInvalidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return this.email.trim() !== '' && !emailRegex.test(this.email)
    }
  },
  watch: {
    email(newEmail) {
      this.$store.commit('setEmail', newEmail)
      if (newEmail.trim() !== '') {
        this.hasError = false
      }
    }
  },
  methods: {
    async sendRequest() {
      const formData = new FormData()
      formData.append('server_key', process.env.VUE_APP_SERVER_KEY)
      formData.append('email', this.email)

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }

      try {
        return await axios.post('https://ummalife.com/api/check-email', formData, {headers})
      } catch (error) {
        throw error
      }
    },

    async handleSubmit() {
      this.$store.commit('setEmail', this.email)
      // Здесь можете выполнить дополнительную "логику отправки формы" или другие действия
      this.$emit('next-step')
    }
  }
}
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;

  &.error {
    .base-input {
      border: 1.4px solid red;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 4px;
    }
  }
}

.base-input {
  background-color: var(--color-seashell);
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 16px;
  color: var(--color-mine-shaft);
  width: 100%;

  &::placeholder {
    color: var(--color-silver-chalice);
  }
}

.symbol__ampersand {
  margin: 0 4px;
}

.login-section {
  margin-top: 40px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;

  &__label {
    color: var(--color-silver-chalice);
  }

  &__link {
    margin-left: 4px;
    color: var(--color-mine-shaft);
  }
}

.register-checkbox {
  margin-top: 24px;
  margin-bottom: 64px;
  text-decoration: none;

  &__link {
    text-decoration: underline;
  }
}

.login-button-section {
  display: flex;
  justify-content: center;
}

.login-button-section button {
  width: 100%;
}

@media (min-width: 768px) {
  .login-button-section button {
    max-width: 320px;
  }
}
</style>

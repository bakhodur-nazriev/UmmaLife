<template>
  <FormAuth>
    <TitleSample>{{ $t('login.title') }}</TitleSample>
    <div class="sample__phone-input">

      <vue-tel-input
          v-model="phoneNumber"
          v-bind="bindProps"
          @country-changed="countryChanged"
      >
      </vue-tel-input>

      {{ responseErrorText }}
      <!--      <div :class="['input-wrapper', { error: hasError }]">
              <div class="phone__field-section">
                <input
                    type="tel"
                    class="base-input"
                    name="phone"
                    v-model="phoneNumber"
                    :placeholder="$t('login.placeholders.phone')"
                />
              </div>
              <small v-if="hasError" class="error-message">
                {{ $t('register.validation.incorrect_phone_number') }}
              </small>
            </div>-->

    </div>
    <div class="login-button__section">
      <SampleButton
          class="login-button__section-button"
          @click="handleSubmit"
          :title="`${ $t('buttons.login') }`"
      />
    </div>
    <router-link
        class="link create-account-link"
        :to="`/${$i18n.locale}/register`"
    >
      {{ $t('login.create_account') }}
    </router-link>
  </FormAuth>

  <div class="login-with-phone-section">
    <router-link
        :to="`/${$i18n.locale}/login-by-email`"
        class="link-with-phone-number"
    >
      {{ $t('login.with_email') }}
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import SampleButton from '@/components/ui/SampleButton.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import axios from 'axios'
import {VueTelInput} from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import DropdownIcon from "@/components/icons/DropdownIcon.vue";

export default {
  components: {
    DropdownIcon,
    VueTelInput,
    FormAuth,
    TitleSample,
    SampleButton
  },
  data() {
    return {
      phoneNumber: '',
      selectedCountryCode: '',
      hasError: false,
      bindProps: {
        autoFormat: false,
        mode: 'international',
        inputOptions: {
          placeholder: this.$t('login.placeholders.phone'),
          name: 'phone',
          styleClasses: 'base-input',
        },
        dropdownOptions: {
          showFlags: true,
          showDialCodeInList: true,
          showDialCodeInSelection: true,
        },
        styleClasses: 'input-wrapper'
      },
      country: null,
      responseErrorText: ''
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.phoneNumber || !this.selectedCountryCode) {
        console.error('Phone number or country code is missing');
        return;
      }

      try {
        const response = await this.sendLoginRequest();

        if (response.data.api_status === 200) {
          this.$router.push({name: 'LoginByPhoneStep2View'});
          console.log(response.data)
        } else {
          this.responseErrorText = response.data.errors
          console.error(response.data);
          // Обработка других кодов состояния, если нужно
        }
      } catch (error) {
        console.error('Error sending request:', error);
        // Обработка ошибки, если нужно
      }
    },
    sendLoginRequest() {
      const fullPhoneNumber = this.selectedCountryCode + this.phoneNumber;
      this.$store.commit('setPhoneNumber', fullPhoneNumber)
      const formData = new FormData();
      formData.append('server_key', process.env.VUE_APP_SERVER_KEY);
      formData.append('phone', fullPhoneNumber);

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      };

      return axios.post('https://ummalife.com/api/auth-phone', formData, {headers});
    },
    countryChanged(country) {
      this.selectedCountryCode = '+' + country.dialCode
    },
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar'
    }
  },
  mounted() {
    console.log(this.country)
  }
}
</script>

<style scoped lang="scss">
.link-with-phone-number {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-mine-shaft);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.login-with-phone-section {
  margin-top: 32px;
}

.input-wrapper {
  position: relative;

  &.error .phone__field-section {
    border: 1.4px solid red;
    border-radius: 10px;
  }

  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
}

.create-account-link {
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
}

.sample__phone-input {
  margin-bottom: 64px;
}

.login-button__section {
  display: flex;
  justify-content: center;

  &-button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.phone__field-section {
  display: flex;
  justify-content: center;

  .base-input {
    width: 100%;
    border-radius: 0 10px 10px 0;
    background-color: var(--color-seashell);
    border: none;
    outline: none;
    font-size: 14px;
    padding: 16px;
    color: var(--color-mine-shaft);

    &::placeholder {
      color: var(--color-silver-chalice);
    }
  }
}

.rtl {
  direction: rtl;

  .base-input {
    border-radius: 10px 0 0 10px;
  }
}

@media (min-width: 768px) {
  .login-button__section button {
    max-width: 320px;
    display: flex;
    justify-content: center;
  }
}
</style>

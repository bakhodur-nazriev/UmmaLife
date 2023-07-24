<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('login.title') }}</title-sample>
    <div class="sample__phone-input">

      <div :class="['input-wrapper', { error: hasError }]">
        <div class="phone__field-section">
          <div class="country-select">
            <div class="country-select-button" @click="toggleDropdown">
              <img
                :src="selectedCountry.flag"
                :alt="selectedCountry.name"
                class="country-dropdown__flag-icon"
              />
              <span class="country-code">{{ selectedCountry.code }}</span>
              <dropdown-icon class="locales__icon locales__icon--dropdown"/>
            </div>
            <div v-if="isDropdownOpen" class="country-dropdown">
              <ul class="country-dropdown__list">
                <li
                  v-for="country in countries"
                  :key="country.code"
                  @click="selectCountry(country)"
                  class="country-dropdown__list-item"
                >
                  <img
                    :src="country.flag"
                    :alt="country.name"
                    class="country-dropdown__flag-icon"
                  />
                  <span class="country-code">{{ country.name }}</span>
                  <span class="country-code">{{ country.code }}</span>
                </li>
              </ul>
            </div>
          </div>
          <input
            type="tel"
            class="base-input"
            v-model="phoneNumber"
            :placeholder="$t('login.placeholders.phone')"
          />
        </div>
        <small v-if="hasError" class="error-message">
          {{ $t('register.validation.incorrect_phone_number') }}
        </small>
      </div>

    </div>
    <div class="login-button-section">
      <SampleButton
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
  </form-auth>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import axios from 'axios'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  components: {
    DropdownIcon,
    FormAuth,
    TitleSample,
    SampleButton
  },
  data () {
    return {
      phoneNumber: '',
      countries: [],
      selectedCountry: { name: '', code: '', flag: '' },
      isDropdownOpen: false,
      hasError: false
    }
  },
  watch: {
    phoneNumber (newPhoneNumber) {
      const fullPhoneNumber = this.selectedCountry.code + newPhoneNumber
      this.$store.commit('setPhoneNumber', fullPhoneNumber)
      if (newPhoneNumber.trim() !== '') {
        this.hasError = false
      }
    }
  },
  methods: {
    getCountries () {
      axios
        .get('https://restcountries.com/v2/all')
        .then((response) => {
          this.countries = response.data.map((country) => ({
            name: country.name,
            code: '+' + country.callingCodes[0],
            flag: country.flags.png
          }))
          this.selectedCountry = this.countries[1] // Set the initial selected country
        })
        .catch((error) => {
          console.error('Error fetching countries:', error)
        })
    },
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    selectCountry (country) {
      this.selectedCountry = country
      this.isDropdownOpen = false
    },
    handleSubmit () {
      this.hasError = this.phoneNumber.trim() === ''

      if (this.hasError) {
        return
      }

      this.phoneNumber = this.selectedCountry.code + this.phoneNumber
      this.$emit('next-step')
    },
    submit (event) {
      console.log('submit button called')
      event.preventDefault()
    }
  },
  mounted () {
    this.getCountries()
  },
  computed: {
    isRTL () {
      return this.$i18n.locale === 'ar'
    }
  }
}
</script>

<style scoped lang="scss">
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

.login-button-section {
  display: flex;
  justify-content: center;
}

.login-button-section button {
  width: 100%;
}

.locales__icon {
  display: inline-block;
  min-width: max-content;
  color: var(--color-silver-chalice);

  &--dropdown {
    margin-left: auto;
    transition: 0.3s;
  }
}

.locales--shown .locales__icon--dropdown {
  transform: scaleY(-1);
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

.country {
  &-code {
    font-size: 16px;
    margin: 0 8px;
  }

  &-select {
    position: relative;
    display: inline-block;

    &-button {
      display: flex;
      align-items: center;
      background-color: var(--color-seashell);
      border-radius: 10px 0 0 10px;
      padding: 15px;
      cursor: pointer;
    }
  }

  &-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--color-seashell);
    border-radius: 0 0 10px 10px;
    padding: 10px;
    max-height: 210px;
    overflow-y: auto;
    width: 470px;

    &__list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      &-item {
        display: flex;
        align-items: center;
        padding: 5px;
        cursor: pointer;
      }
      &-item:hover {
        background-color: #ddd;
      }
    }
  }
}

.country-dropdown__flag-icon {
  width: 20px;
  height: 15px;
}

.locales--shown .locales__icon--dropdown {
  transform: scaleY(-1);
}

.rtl {
  direction: rtl;

  .base-input {
    border-radius: 10px 0 0 10px;
  }

  .country-select-button {
    border-radius: 0 10px 10px 0;
  }

  .country-dropdown {
    left: auto;
   right: 0;
  }
}

@media (min-width: 768px) {
  .login-button-section button {
    max-width: 320px;
  }
}
</style>

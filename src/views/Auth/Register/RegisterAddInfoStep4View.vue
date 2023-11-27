<template>
  <form-auth @submit="handleSubmit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <div class="subtitles__text-fields">
      <h5 class="title medium">{{ $t('register.messages.fill_your_information') }}</h5>
      <label class="required-fields-label">{{ $t('register.messages.required_fields') }}</label>
    </div>

    <div class="sample__inputs-section">
      <div :class="['input-wrapper', { error: hasError.firstName }]">
        <input
            v-model="firstName"
            class="base-input"
            :placeholder="$t('register.placeholders.name')"
        />
        <small v-if="hasError.firstName" class="error-message">
          {{ $t('register.validation.empty_name') }}
        </small>
      </div>

      <div :class="['input-wrapper', { error: hasError.lastName }]">
        <input
            v-model="lastName"
            class="base-input"
            :placeholder="$t('register.placeholders.last_name')"
        />
        <small v-if="hasError.lastName" class="error-message">
          {{ $t('register.validation.empty_last_name') }}
        </small>
      </div>

      <div :class="['input-wrapper', { error: hasError.gender }]">
        <div class="genders" ref="container">
          <button
              type="button"
              class="genders__button"
              @click="handleButtonClick"
          >
            <span :class="{'genders-title': !selectedGender, 'selected-gender': selectedGender}">
              {{ selectedGender || $t('register.placeholders.gender.title') }}
            </span>
            <dropdown-icon class="genders__icon genders__icon--dropdown"/>
          </button>

          <ul class="genders__list" :data-genders="$t('languages.title')" ref="list">
            <li class="genders__item" @click="selectGender(`${$t('register.placeholders.gender.male')}`)">
              {{ $t('register.placeholders.gender.male') }}
            </li>
            <li class="genders__item" @click="selectGender(`${$t('register.placeholders.gender.female')}`)">
              {{ $t('register.placeholders.gender.female') }}
            </li>
          </ul>
        </div>
        <small v-if="hasError.gender" class="error-message">
          {{ $t('register.validation.empty_gender') }}
        </small>

        <small v-if="errorText" class="error-message">
          {{ errorText }}
        </small>
      </div>
    </div>

    <div class="login-button__section">
      <SampleButton
          type="submit"
          class="login-button__section-next"
          :title="`${ $t('buttons.next') }`"
      />
    </div>
  </form-auth>
</template>

<script>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import axios from 'axios'
import {getFormData} from '@/utils'

export default {
  components: {
    DropdownIcon,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      hasError: {
        firstName: false,
        lastName: false,
        gender: false
      },
      selectedGender: null,
      errorText: null
    }
  },
  watch: {
    name(newName) {
      if (newName.trim() !== '') {
        this.hasError.firstName = false
      }
    },
    last_name(newLastName) {
      if (newLastName.trim() !== '') {
        this.hasError.lastName = false
      }
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()
      this.hasError.firstName = this.firstName.trim() === ''
      this.hasError.lastName = this.lastName.trim() === ''
      this.hasError.gender = this.selectedGender === null

      if (this.hasError.firstName || this.hasError.lastName || this.hasError.gender) {
        return
      }

      try {
        const response = await this.sendRequest()

        if (response.data.api_status === 200) {
          this.$router.push({name: 'RegisterAddPhoneStep5View'})
        } else {
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    async sendRequest() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        first_name: this.firstName,
        last_name: this.lastName,
        gender: this.selectedGender
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        return await axios.post('https://preview.ummalife.com/api/create-account-more', payload, {params, headers})
      } catch (error) {
        throw error
      }
    },
    handleButtonClick() {
      const list = this.$refs.list
      if (!list) {
        return
      }

      const container = this.$refs.container
      if (!container) {
        return
      }
      !this.$refs.container.classList.contains('genders--shown') ? this.openDropdown() : this.closeDropdown()
    },
    openDropdown() {
      this.$refs.container.classList.add('genders--shown')
      this.$refs.list.style.display = 'flex'
      document.addEventListener('click', this.handleDocumentClick)
      document.addEventListener('keydown', this.handleEscapeKeydown)
    },
    closeDropdown() {
      const container = this.$refs.container
      if (!container) {
        return
      }
      container.classList.remove('genders--shown')
      this.$refs.list.style.display = 'none'
      document.removeEventListener('click', this.handleDocumentClick)
      document.removeEventListener('keydown', this.handleEscapeKeydown)
    },
    handleDocumentClick(evt) {
      return !evt.target.closest('.genders') && this.closeDropdown()
    },
    handleEscapeKeydown(evt) {
      return (evt.keyCode === 27) && this.closeDropdown()
    },
    selectGender(gender) {
      if (gender === this.$t('register.placeholders.gender.male')) {
        this.selectedGender = 'male'
      } else if (gender === this.$t('register.placeholders.gender.female')) {
        this.selectedGender = 'female'
      }
      this.closeDropdown()
    }
  }
}
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;

  &.error {
    .base-input,
    .genders__button {
      border: 1.4px solid red;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 4px;
    }
  }
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
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

.sample__inputs-section {
  display: flex;
  flex-direction: column;
  gap: 24px 0;
}

.subtitles__text-fields {
  margin-bottom: 24px;
}

.required-fields-label {
  color: var(--color-silver-chalice);
  font-size: 14px;
}

.login-button__section {
  display: flex;
  justify-content: center;

  &-next {
    width: 100%;
    margin-top: 64px;
    display: flex;
    justify-content: center;
  }
}

.genders {
  z-index: 1;
  position: relative;

  &__button {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--color-seashell);
    border: 1px solid var(--color-seashell);
    border-radius: 10px;
    min-height: 40px;
    padding: 14px 16px;
    font-size: 14px;
    line-height: 1.34;
    color: var(--color-mine-shaft);
    width: 100%;
    cursor: pointer;
    z-index: 5;

    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  &-title {
    color: var(--color-silver-chalice);
  }

  &__icon {
    display: inline-block;
    min-width: max-content;
    color: var(--color-silver-chalice);

    &--dropdown {
      margin-left: auto;
      transition: 0.3s;
    }
  }

  &__list {
    position: absolute;
    display: none;
    opacity: 0;
    transition: 0.3s;
    flex-direction: column;
    left: 0;
    top: 0;
    background: var(--color-seashell);
    border-radius: 10px;
    width: 100%;
    margin: 0;
    list-style: none;
    padding: 50px 0 0 0;
    z-index: 1;

    &::before {
      content: attr(data-locale);
      font-weight: 500;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    border-radius: 10px;
    background-color: var(--color-seashell);
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-silver-chalice);
      color: var(--color-white);
    }
  }
}

.selected-gender {
  color: var(--color-mine-shaft);
}

.genders--shown .genders__icon--dropdown {
  transform: scaleY(-1);
}

.genders--shown .genders__list {
  visibility: visible;
  opacity: 1;
}

.rtl {
  .genders__icon--dropdown {
    margin-right: auto;
    margin-left: 0;
  }
}

@media (min-width: 768px) {
  .login-button__section button {
    max-width: 320px;
  }
}
</style>

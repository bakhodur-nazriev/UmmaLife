<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <div class="subtitles__text-fields">
      <h5 class="title medium">{{ $t('register.messages.fill_your_information') }}</h5>
      <label class="required-fields-label">{{ $t('register.messages.required_fields') }}</label>
    </div>

    <div class="sample__inputs-section">
      <div :class="['input-wrapper', { error: hasError.name }]">
        <input
          v-model="name"
          class="base-input"
          :placeholder="$t('register.placeholders.name')"
        />
        <small v-if="hasError.name" class="error-message">
          {{ $t('register.validation.empty_name') }}
        </small>
      </div>

      <div :class="['input-wrapper', { error: hasError.lastName }]">
        <input
          v-model="last_name"
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
            <span :class="{'genders-title': !selectedGender, 'selected-gender': selectedGender}">{{ selectedGender || $t('register.placeholders.gender.title') }}</span>
            <dropdown-icon class="genders__icon genders__icon--dropdown"/>
          </button>

          <ul class="genders__list" :data-genders="$t('languages.title')" ref="list">
            <li class="genders__item" @click="selectGender(`${$t('register.placeholders.gender.male')}`)">{{ $t('register.placeholders.gender.male') }}</li>
            <li class="genders__item" @click="selectGender(`${$t('register.placeholders.gender.female')}`)">{{ $t('register.placeholders.gender.female') }}</li>
          </ul>
        </div>
        <small v-if="hasError.gender" class="error-message">
          {{ $t('register.validation.empty_gender') }}
        </small>
      </div>
    </div>

    <div class="login-button__section">
      <SampleButton
        class="login-button__section-next"
        @click="handleSubmit"
        :title="`${ $t('buttons.next') }`"
      />
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  components: {
    DropdownIcon,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data () {
    return {
      name: '',
      last_name: '',
      gender: true,
      hasError: {
        name: false,
        lastName: false,
        gender: false
      },
      selectedGender: null
    }
  },
  watch: {
    name (newName) {
      if (newName.trim() !== '') {
        this.hasError.name = false
      }
    },
    last_name (newLastName) {
      if (newLastName.trim() !== '') {
        this.hasError.lastName = false
      }
    },
    gender (newGender) {
      this.hasError.gender = newGender === null
    }
  },
  methods: {
    handleSubmit () {
      // Проверка на пустые поля
      this.hasError.name = this.name.trim() === ''
      this.hasError.lastName = this.last_name.trim() === ''
      this.hasError.gender = this.selectedGender === null

      // Проверка на наличие ошибок
      if (this.hasError.name || this.hasError.lastName || this.hasError.gender) {
        return // Прекратить отправку формы в случае ошибок
      }
      // Выполнить остальную логику отправки формы
      // ...

      this.$emit('next-step')
    },
    submit (event) {
      event.preventDefault()
      this.handleSubmit()
    },
    handleButtonClick () {
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
    openDropdown () {
      this.$refs.container.classList.add('genders--shown')
      this.$refs.list.style.display = 'flex'
      document.addEventListener('click', this.handleDocumentClick)
      document.addEventListener('keydown', this.handleEscapeKeydown)
    },
    closeDropdown () {
      const container = this.$refs.container
      if (!container) {
        return
      }
      container.classList.remove('genders--shown')
      this.$refs.list.style.display = 'none'
      document.removeEventListener('click', this.handleDocumentClick)
      document.removeEventListener('keydown', this.handleEscapeKeydown)
    },
    handleDocumentClick (evt) {
      return !evt.target.closest('.genders') && this.closeDropdown()
    },
    handleEscapeKeydown (evt) {
      return (evt.keyCode === 27) && this.closeDropdown()
    },
    selectGender (gender) {
      this.selectedGender = gender
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

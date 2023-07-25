<template>
  <div class="genders" ref="container">
    <button
      type="button"
      class="genders__button"
      @click="handleButtonClick"
    >
      <span :class="{'gender-title': !selectedGender, 'selected-gender': selectedGender}">{{ selectedGender || $t('register.placeholders.gender.title') }}</span>
      <DropdownIcon
        :class="{'rtl' : isRTL}"
        class="genders__icon genders__icon--dropdown"
      />
    </button>

    <ul class="genders__list" :data-genders="$t('languages.title')" ref="list">
      <li class="genders__item" @click="selectGender(`${$t('register.placeholders.gender.male')}`)">{{ $t('register.placeholders.gender.male') }}</li>
      <li class="genders__item" @click="selectGender(`${$t('register.placeholders.gender.female')}`)">{{ $t('register.placeholders.gender.female') }}</li>
    </ul>
  </div>
</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  components: { DropdownIcon },
  data () {
    return {
      selectedGender: null
    }
  },
  computed: {
    isRTL () {
      return this.$i18n.locale === 'ar'
    }
  },
  methods: {
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
      margin-right: 20px;
      transition: 0.3s;
    }
  }

  &__list {
    position: absolute;
    display: flex;
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
      color: var(--color-white)
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
</style>

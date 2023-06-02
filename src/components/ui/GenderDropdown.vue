<template>
  <div class="genders" ref="container">
    <button
      type="button"
      class="genders__button"
      @click="handleButtonClick"
    >
      <span class="dropdown__gender-title">{{ selectedGender || $t('register.placeholders.gender.title') }}</span>
      <dropdown-icon class="genders__icon genders__icon--dropdown"/>
    </button>

    <ul class="genders__list" :data-genders="$t('languages.title')">
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
  methods: {
    handleButtonClick () {
      const container = this.$refs.container
      if (!container) {
        return
      }
      !this.$refs.container.classList.contains('genders--shown') ? this.openDropdown() : this.closeDropdown()
    },
    openDropdown () {
      this.$refs.container.classList.add('genders--shown')
      document.addEventListener('click', this.handleDocumentClick)
      document.addEventListener('keydown', this.handleEscapeKeydown)
    },
    closeDropdown () {
      const container = this.$refs.container
      if (!container) {
        return
      }
      container.classList.remove('genders--shown')
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
<style scoped>
.genders {
  z-index: 1;
  position: relative;
}

.genders__button {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #F1F1F1;
  border: 1px solid #F1F1F1;
  border-radius: 10px;
  min-height: 40px;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.34;
  color: #1f1f1f;
  width: 100%;
  cursor: pointer;
  z-index: 5;
}

.genders__button span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  color: #B0B0B0;
}

.genders__icon {
  display: inline-block;
  min-width: max-content;
  color: #b0b0b0
}

.genders__icon--dropdown {
  margin-left: auto;
  transition: 0.3s;
}

.genders--shown .genders__icon--dropdown {
  transform: scaleY(-1);
}

.genders__list {
  position: absolute;
  display: flex;
  opacity: 0;
  transition: 0.3s;
  flex-direction: column;
  left: 0;
  top: 0;
  background: #F1F1F1;
  border-radius: 10px;
  width: 100%;
  margin: 0;
  list-style: none;
  padding: 50px 0 0 0;
  z-index: 1;
}

.genders--shown .genders__list {
  visibility: visible;
  opacity: 1;
}

.genders__list::before {
  content: attr(data-locale);
  font-weight: 500;
}

.genders__item {
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #F1F1F1;
  padding: 8px 16px;
  cursor: pointer;
}

.genders__item:hover {
  background-color: #bdbdbd;
  color: #fff;
}
</style>

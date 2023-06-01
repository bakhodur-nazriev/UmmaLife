<template>
  <div class="genders" ref="container">
    <button
      type="button"
      class="genders__button"
      @click="handleButtonClick"
    >
      <span class="dropdown__gender-title">{{ $t('register.placeholders.gender.title') }}</span>
      <dropdown-icon class="genders__icon genders__icon--dropdown"/>
    </button>

    <ul class="genders__list" :data-genders="$t('languages.title')">
      <li class="genders__item">{{ $t('register.placeholders.gender.male') }}</li>
      <li class="genders__item">{{ $t('register.placeholders.gender.female') }}</li>
    </ul>
  </div>
</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  components: { DropdownIcon },
  methods: {
    handleButtonClick () {
      const container = this.$refs.container
      if (!container) {
        return
      }

      const handleDocumentClick = (evt) => !evt.target.closest('.genders') && closeDropdown()
      const handleEscapeKeydown = (evt) => (evt.keyCode === 27) && closeDropdown()
      const openDropdown = () => {
        this.$refs.container.classList.add('genders--shown')
        document.addEventListener('click', handleDocumentClick)
        document.addEventListener('keydown', handleEscapeKeydown)
      }
      const closeDropdown = () => {
        const container = this.$refs.container
        if (!container) {
          return
        }
        container.classList.remove('genders--shown')
        document.removeEventListener('click', handleDocumentClick)
        document.removeEventListener('keydown', handleEscapeKeydown)
      }
      !this.$refs.container.classList.contains('genders--shown') ? openDropdown() : closeDropdown()
    }
  }
}
</script>
<style scoped>
.genders {
  z-index: 1;
}

.genders::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(31, 31, 31, 0.3);
  backdrop-filter: blur(3px);
  transition: 0.3s;
  opacity: 0;
  pointer-events: none;
}

.genders--shown::before {
  opacity: 1;
  z-index: 2;
}

.genders__button {
  display: flex;
  align-items: center;
  background-color: #F1F1F1;
  border: 1px solid #F1F1F1;
  border-radius: 10px;
  min-height: 40px;
  padding: 16px;
  font-size: 14px;
  line-height: 1;
  color: #1f1f1f;
  width: 100%;
  cursor: pointer;
  z-index: 3;
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
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 100%;
  background: #F1F1F1;
  border-radius: 10px;
  width: 100%;
  margin: 0;
  list-style: none;
  padding: 16px;
  gap: 4px;
  z-index: 3;
}

.genders--shown .genders__list {
  transform: translateY(-100%);
  visibility: visible;
  opacity: 1;
}

.genders__list::before {
  content: attr(data-locale);
  font-weight: 500;
  margin-bottom: 12px;
}

.genders__item {
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #F1F1F1;
  min-height: 48px;
  padding: 8px 16px;
}

@media (min-width: 768px) {
  .genders {
    position: relative;
  }

  .genders::before {
    display: none;
  }

  .genders__button {
    position: relative;
    z-index: 5;
    font-size: 14px;
    line-height: 1;
  }

  .genders__list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    gap: 0;
    background-color: #F1F1F1;
    padding: 50px 0 0 0;
  }

  .genders--shown .genders__list {
    transform: none;
  }

  .genders__list::before  {
    display: none;
  }

  .genders__item {
    background-color: transparent;
    padding: 12px;
    min-height: 0;
    cursor: pointer;
    border-radius: 10px;
  }

  .genders__item:hover {
    background-color: #bdbdbd;
    color: #fff;
  }
}
</style>

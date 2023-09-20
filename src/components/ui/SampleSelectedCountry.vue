<template>
  <div class="country-select">
    <div class="country-select-button" @click="toggleDropdown">
      <img
        :src="selectedCountry.flag"
        :alt="selectedCountry.name"
        class="country-dropdown__flag-icon"
      />
      <span class="country-code">{{ selectedCountry.code }}</span>
      <DropdownIcon class="locales__icon locales__icon--dropdown" />
    </div>
    <div v-if="isDropdownOpen" class="country-dropdown">
      <ul class="country-dropdown__list">
        <li
          v-for="country in countries"
          :key="country.code"
          @click="selectCountry(country)"
          class="country-dropdown__list-item"
        >
          <img :src="country.flag" :alt="country.name" class="country-dropdown__flag-icon" />
          <span class="country-code">{{ country.name }}</span>
          <span class="country-code">{{ country.code }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import axios from 'axios'

export default {
  components: { DropdownIcon },
  data() {
    return {
      countries: [],
      selectedCountry: { name: '', code: '', flag: '' },
      isDropdownOpen: false
    }
  },
  methods: {
    getCountries() {
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
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    selectCountry(country) {
      this.selectedCountry = country
      this.isDropdownOpen = false
      this.$emit('country-selected', country.code)
    }
  },
  mounted() {
    this.getCountries()
  }
}
</script>

<style scoped lang="scss">
.country {
  &-dropdown__flag-icon {
    width: 20px;
    height: 15px;
  }

  &-code {
    font-size: 16px;
    margin: 0 8px;
  }

  &-select {
    position: relative;
    display: inline-block;
    user-select: none;

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
    z-index: 15;

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

.country-select {
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

.locales__icon {
  display: inline-block;
  min-width: max-content;
  color: var(--color-mine-shaft);

  &--dropdown {
    margin-left: auto;
    transition: 0.3s;
  }
}

.locales--shown .locales__icon--dropdown {
  transform: scaleY(-1);
}

.rtl {
  direction: rtl;

  .country-select-button {
    border-radius: 0 10px 10px 0;
  }

  .country-dropdown {
    left: auto;
    right: 0;
  }
}
</style>

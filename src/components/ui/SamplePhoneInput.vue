<template>
  <div class="phone__field-section">
    <sample-selected-country @country-selected="handleCountrySelected"></sample-selected-country>
    <input
      type="text"
      class="base-input"
      v-model="phoneNumber"
      :placeholder="$t('login.placeholders.phone')"
    />
  </div>
</template>

<script>
import SampleSelectedCountry from '@/components/ui/SampleSelectedCountry.vue'

export default {
  components: { SampleSelectedCountry },
  data () {
    return {
      phoneNumber: '',
      selectedCountryCode: ''
    }
  },
  methods: {
    handleCountrySelected (countryCode) {
      this.selectedCountryCode = countryCode
    }
  },
  mounted () {
    this.handleCountrySelected()
  }
}
</script>

<style scoped>
.base-input {
  background-color: #f1f1f1;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 16px;
  color: #1F1F1F;
  width: 100%;
}

.base-input::placeholder {
  color: #B0B0B0;
}

.phone__field-section {
  display: flex;
  justify-content: center;
}

.phone__field-section input {
  width: 100%;
  border-radius: 0 10px 10px 0;
}
</style>

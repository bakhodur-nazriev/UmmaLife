<template>
  <div class="phone__field-section">
    <sample-selected-country></sample-selected-country>
    <sample-input type="text" v-model="phoneNumber" :placeholder="$t('login.placeholders.phone')"/>
  </div>
</template>

<script>
import SampleInput from '@/components/ui/SampleInput.vue'
import SampleSelectedCountry from '@/components/ui/SampleSelectedCountry.vue'

export default {
  components: { SampleSelectedCountry, SampleInput },
  data () {
    return {
      phoneNumber: ''
    }
  }
}
</script>

<style scoped>
.phone__field-section {
  display: flex;
  justify-content: center;
}

.phone__field-section input {
  width: 100%;
  border-radius: 0 10px 10px 0;
}
</style>

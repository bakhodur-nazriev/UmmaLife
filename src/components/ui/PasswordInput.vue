<template>
  <div>
    <sample-input name="password" type="{isShown ? text : password}"/>
    <button type="button" @click="isShown = !isShown">
      <eye-icon isClosed/>
    </button>
  </div>
</template>

<script>
import SampleInput from '@/components/ui/SampleInput.vue'

export default {
  components: {SampleInput},
  data() {
    return {
      isShown: false
    }
  }
}
</script>

<style scoped>

</style>

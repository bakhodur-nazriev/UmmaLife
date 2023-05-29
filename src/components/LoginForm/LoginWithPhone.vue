<template>
  <form-auth>
    <title-sample>{{ $t('login.title') }}</title-sample>

    <sample-input-locale></sample-input-locale>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleInputLocale from '@/components/ui/SampleInputLocale.vue'

export default {
  components: {
    SampleInputLocale,
    FormAuth,
    TitleSample
  }
}
</script>

<style scoped>

</style>

<template>
  <LayoutAuth>
    <form-auth>
      <title-sample>{{ $t('login.title') }}</title-sample>
    </form-auth>
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'

export default {
  components: {

  }
}
</script>

<style scoped>

</style>

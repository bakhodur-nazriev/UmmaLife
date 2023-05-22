<template>
  <div class="layout container">
    <locales-dropdown/>
    <main-logo/>

    <slot></slot>

    <footer-auth/>
  </div>
</template>

<script>
import LocalesDropdown from '@/components/LocalesDropdown.vue'
import MainLogo from '@/components/ui/MainLogo.vue'
import FooterAuth from '@/components/layouts/FooterAuth.vue'

export default {
  components: {
    LocalesDropdown,
    MainLogo,
    FooterAuth
  }
}
</script>

<style scoped></style>

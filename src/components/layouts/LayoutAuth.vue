<template>
  <div class="layout container">
    <locales-dropdown class="layout__locales"/>
    <main-logo class="layout__logo"/>

    <div class="layout__inner">
      <slot></slot>
    </div>

    <footer-auth class="layout__footer"/>
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

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__locales {
  order: 3;
}

.layout__logo {
  order: 1;
}

.layout__inner {
  order: 2;
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.layout__footer {
  order: 4;
}
</style>

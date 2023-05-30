<template>
  <div class="layout">
    <locales-dropdown class="layout__locales"/>
    <main-logo class="layout__logo"/>

    <div class="layout__inner">
      <slot/>
    </div>

    <footer-auth class="layout__footer"/>
  </div>
</template>

<script>
import LocalesDropdown from '@/components/ui/LocalesDropdown.vue'
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
  margin: 24px auto;
}

.layout__logo {
  order: 1;
  display: flex;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 20px;
}

.layout__inner {
  order: 2;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
}

.layout__footer {
  order: 4;
}

@media (min-width: 768px) {
  .layout__locales,
  .layout__logo,
  .layout__inner,
  .layout__footer{
    order: 0;
  }

  .layout {
    max-width: var(--desktop-width);
    width: 90vw;
    margin: 0 auto;
  }

  .layout__locales {
    margin-right: 0;
    margin-bottom: 54px;
  }

  .layout__logo {
    margin-top: 0;
  }
}
</style>

<template>
  <div class="layout">
    <LocalesDropdown class="layout__locales" />

    <div class="layout__inner">
      <MainLogo class="layout__logo" />
      <slot></slot>
    </div>

    <FooterAuth :class="isTRL ? 'rtl' : ''" class="layout__footer" />
  </div>
</template>

<script>
import LocalesDropdown from '@/components/ui/LocalesDropdown.vue'
import MainLogo from '@/components/ui/Logo/AuthPagesMainLogo.vue'
import FooterAuth from '@/components/layouts/FooterAuth.vue'

export default {
  components: {
    LocalesDropdown,
    MainLogo,
    FooterAuth
  },

  computed: {
    isTRL() {
      return this.$i18n.locale === 'ar'
    }
  },
  mounted() {
    const html = document.querySelector('html')
    html.classList.value = localStorage.getItem('theme') || 'light'
  }
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__locales {
    order: 3;
    margin: 24px auto 0;
  }

  &__logo {
    display: flex;
    justify-content: center;
    margin-top: 64px;
    margin-bottom: 60px;
  }

  &__inner {
    order: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-direction: column;
    z-index: 0;
    padding-bottom: 40px;
  }

  &__footer {
    order: 4;

    .rtl {
      direction: rtl;
    }
  }
}

@media (min-width: 768px) {
  .layout__locales,
  .layout__logo,
  .layout__inner,
  .layout__footer {
    order: 0;
  }

  .layout {
    max-width: var(--desktop-width);
    width: 90vw;
    margin: 0 auto;

    &__locales {
      margin-right: 0;
    }

    &__logo {
      margin-top: 0;
    }
  }
}

@media (max-width: 576px) {
  .layout__locales {
    margin-bottom: 24px;
  }
}
</style>

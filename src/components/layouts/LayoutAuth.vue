<template>
  <div class="layout">
    <LocalesDropdown class="layout__locales"/>
    <MainLogo class="layout__logo"/>

    <div class="layout__inner">
      <slot></slot>
    </div>

    <FooterAuth :class="isTRL ? 'rtl' : ''" class="layout__footer"/>
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
    isTRL () {
      return this.$i18n.locale === 'ar'
    }
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
    margin: 24px auto;
  }

  &__logo {
    order: 1;
    display: flex;
    justify-content: center;
    margin-top: 64px;
    margin-bottom: 20px;
  }

  &__inner {
    order: 2;
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    z-index: 0;
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
      margin-bottom: 54px;
    }

    &__logo {
      margin-top: 0;
    }
  }
}
</style>

<template>
  <form class="form" :class="isRTL ? 'rtl' : 'ltr'">
    <slot />
  </form>
</template>

<script>
export default {
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar'
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  padding: 40px 32px;
  width: 100%;
}

.rtl {
  direction: rtl;

  .form {
    direction: rtl;
  }
}

@media (min-width: 768px) {
  .form {
    border-radius: 20px;
    max-width: 544px;
  }
}
</style>

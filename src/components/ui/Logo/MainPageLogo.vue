<template>
  <div class="logo-block">
    <router-link :to="`/${$i18n.locale}`" class="logo-link">
      <img
        src="@/assets/images/logo/main-logo.svg"
        alt="main-logo"
        width="151"
        height="32"
      >
    </router-link>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.logo {
  &-link {
    display: flex;
  }

  &-block {
    display: flex;
    justify-content: center;
  }
}
</style>

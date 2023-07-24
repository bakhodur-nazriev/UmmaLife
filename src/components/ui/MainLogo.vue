<template>
  <div class="logo-block">
    <router-link :to="`/${$i18n.locale}/news`" class="logo-link">
      <picture>
        <source media="(min-width:1200px)" srcset="@/assets/images/main-logo.svg" width="311" height="56"/>
        <source media="(min-width:768px)" srcset="@/assets/images/main-logo.svg" width="246" height="44"/>
        <img
          src="@/assets/images/main-logo.svg"
          alt="main-logo"
          width="183"
          height="33"
        >
      </picture>
    </router-link>
  </div>
</template>

<script>

</script>

<style scoped>
.logo-link {
  display: inline-block;
}

.logo-block {
  display: flex;
  justify-content: center;
}
</style>

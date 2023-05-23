<template>
  <footer class="footer">
    <nav class="footer__navigation">
      <router-link class="footer__link" :to="{name: 'terms'}">Условия</router-link>
      <router-link class="footer__link" :to="{name: 'privacy-policy'}">Политика</router-link>
      <router-link class="footer__link" :to="{name: 'contacts'}">Контакты</router-link>
      <router-link class="footer__link" :to="{name: 'about-us'}">О нас</router-link>
    </nav>

    <p class="footer__copyright">(c) 2023 Umma Life</p>
  </footer>
</template>

<script>

</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.footer__navigation {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 32px;
  justify-content: center;
}

.footer__link {
  text-decoration: none;
  color: inherit;
}

.footer__copyright {
  margin: 0;
  color: #8D98B4;
  text-align: center;
  width: 100%;
}
</style>

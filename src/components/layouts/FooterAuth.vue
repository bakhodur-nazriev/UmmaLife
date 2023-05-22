<template>
  <footer class="footer">
    <nav class="footer__navigation">
      <router-link class="footer__link" :to="{name: 'conditions'}">Условия</router-link>
      <router-link class="footer__link" :to="{name: 'politic'}">Политика</router-link>
      <router-link class="footer__link" :to="{name: 'contacts'}">Контакты</router-link>
      <router-link class="footer__link" :to="{name: 'about'}">О нас</router-link>
    </nav>

    <p class="footer__copyright">(c) 2023 Umma Life</p>
  </footer>
</template>

<script>

</script>

<style scoped></style>

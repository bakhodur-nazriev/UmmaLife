<template>
  <footer class="footer">
    <nav class="footer__navigation">
      <router-link class="footer__link" :to="{name: 'terms'}">{{ $t('footer.links.terms') }}</router-link>
      <router-link class="footer__link" :to="{name: 'privacy-policy'}">{{ $t('footer.links.privacy_policy') }}</router-link>
      <router-link class="footer__link" :to="{name: 'contacts'}">{{ $t('footer.links.contacts') }}</router-link>
      <router-link class="footer__link" :to="{name: 'about-us'}">{{ $t('footer.links.about_us') }}</router-link>
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

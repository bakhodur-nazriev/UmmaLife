<template>
  <footer class="footer">
    <nav class="footer__navigation">
      <router-link class="footer__link" :to="`/${$i18n.locale}/terms`">{{ $t('links.terms') }}</router-link>
      <router-link class="footer__link" :to="`/${$i18n.locale}/privacy-policy`">{{ $t('links.privacy_policy') }}</router-link>
      <router-link class="footer__link" :to="`/${$i18n.locale}/contacts`">{{ $t('links.contacts') }}</router-link>
      <router-link class="footer__link" :to="`/${$i18n.locale}/about-us`">{{ $t('links.about_us') }}</router-link>
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
  padding-bottom: 12px;
}

.footer__navigation {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 27px;
  justify-content: center;
}

.footer__link {
  text-decoration: none;
  color: inherit;
  font-size: 14px;
}

.footer__copyright {
  margin: 0;
  color: #8D98B4;
  text-align: center;
  width: 100%;
  font-size: 14px;
}

@media (min-width: 768px) {
  .footer {
    padding-bottom: 16px;
    flex-wrap: nowrap;
    font-size: 16px;
  }

  .footer__navigation,
  .footer__copyright {
    width: auto;
  }

  .footer__navigation {
    gap: 32px;
  }
}
</style>

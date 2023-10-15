<template>
  <MainLayout>
    <ArticlesMainTabs :tabsArray="[
      `${$t('tabs.articles_page.all_articles')}`,
      `${$t('tabs.articles_page.my_articles')}`,
      `${$t('tabs.articles_page.saved')}`,
      `${$t('tabs.articles_page.drafts')}`,
      `${$t('tabs.articles_page.create_new_article')}`
    ]"/>

    <button class="add-articles__button">+</button>
  </MainLayout>
</template>

<script>
import ArticlesMainTabs from '@/components/articles/ArticlesMainTabs.vue'
// import ArticleLayout from '@/views/ArticleLayout.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'

export default {
  components: {
    MainLayout,
    // ArticleLayout,
    ArticlesMainTabs
  }
}
</script>

<style scoped>

@media (max-width: 576px) {
  .add-articles__button {
    position: absolute;
    right: 16px;
    bottom: 80px;
    z-index: 1000;
    background-color: var(--color-hippie-blue);
    border-radius: 16px;
    width: 48px;
    height: 48px;
    color: var(--color-white);
    border: unset;
    font-size: 24px;
    font-weight: 400;
    box-shadow: 0 2px 10px 0 rgba(73, 163, 153, 0.60);
    padding-bottom: 3px;
    cursor: pointer;
  }
}
</style>

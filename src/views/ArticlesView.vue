<template>
  <MainLayout>
    <ArticlesMainTabs :tabsArray="[
      `${$t('tabs.articles_page.all_articles')}`,
      `${$t('tabs.articles_page.my_articles')}`,
      `${$t('tabs.articles_page.saved')}`,
      `${$t('tabs.articles_page.drafts')}`,
      `${$t('tabs.articles_page.create_new_article')}`
    ]"/>
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

<style scoped></style>

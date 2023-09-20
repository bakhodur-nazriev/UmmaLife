<template>
  <MainLayout>
    <ArticlesMainTabs :tabsArray="[
      `${$t('tabs.articles_page.all_articles')}`,
      `${$t('tabs.articles_page.my_articles')}`,
      `${$t('tabs.articles_page.saved')}`,
      `${$t('tabs.articles_page.drafts')}`,
      `${$t('tabs.articles_page.create_new_article')}`
    ]" />
    <RouterView></RouterView>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import ArticlesMainTabs from '@/components/articles/ArticlesMainTabs.vue'

export default {
  components: {
    ArticlesMainTabs,
    MainLayout
  }
}
</script>

<style scoped></style>

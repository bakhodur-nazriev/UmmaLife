<template>
    <ArticlesMainTabs :tabsArray="[
      `${$t('tabs.articles_page.all_articles')}`,
      `${$t('tabs.articles_page.my_articles')}`,
      `${$t('tabs.articles_page.saved')}`,
      `${$t('tabs.articles_page.drafts')}`,
      `${$t('tabs.articles_page.create_new_article')}`
    ]"/>
</template>

<script>
import ArticlesMainTabs from '@/components/articles/ArticlesMainTabs.vue'

export default {
  components: {
    ArticlesMainTabs
  }
}
</script>

<style scoped></style>

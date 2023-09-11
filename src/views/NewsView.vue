<template>
  <MainLayout>
    <NewsMainTabs
      :tabsArray="[`${$t('tabs.news_page.publications')}`, `${$t('tabs.news_page.umma_shorts')}`, `${$t('tabs.news_page.umma_video')}`]"
    />
  </MainLayout>
</template>

<script>
import NewsMainTabs from '@/components/ui/NewsMainTabs.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'

export default {
  components: {
    MainLayout,
    NewsMainTabs
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>

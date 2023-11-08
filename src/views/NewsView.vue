<template>
  <NewsMainTabs
      :tabsArray="[`${$t('tabs.news_page.publications')}`, `${$t('tabs.news_page.umma_shorts')}`, `${$t('tabs.news_page.umma_video')}`]"
  />
</template>

<script>
import NewsMainTabs from '@/components/ui/NewsMainTabs.vue'

export default {
  components: {
    NewsMainTabs
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>

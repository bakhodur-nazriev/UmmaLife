<template>
  <main-layout>
      <sample-tabs
        :tabsArray="[`${$t('tabs.news_page.publications')}`, `${$t('tabs.news_page.umma_shorts')}`, `${$t('tabs.news_page.umma_video')}`]"
      ></sample-tabs>
  </main-layout>
</template>

<script>
import SampleTabs from '@/components/ui/NewsMainTabs.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
export default {
  components: {
    MainLayout,
    SampleTabs
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>

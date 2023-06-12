<template>
  <main-layout>
      <sample-tabs
        :tabsArray="[`${$t('tabs.publications')}`, `${$t('tabs.umma_shorts')}`, `${$t('tabs.umma_video')}`]"
      ></sample-tabs>
  </main-layout>
</template>

<script>
import SampleTabs from '@/components/ui/SampleTabs.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
export default {
  components: {
    MainLayout,
    SampleTabs
  },
  data () {
    return {
      content1: 'Содержимое первой вкладки',
      content2: 'Содержимое второй вкладки',
      content3: 'Содержимое третьей вкладки'
    }
  }
}
</script>

<style scoped>

</style>

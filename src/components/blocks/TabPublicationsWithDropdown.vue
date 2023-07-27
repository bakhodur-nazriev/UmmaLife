<template>
  <div class="publication__main--block">
    <h1>Test</h1>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {}
  },
  computed: {
    tabLabels () {
      return [
        this.$t('tabs.publications_inside.publications'),
        this.$t('tabs.publications_inside.articles'),
        this.$t('tabs.publications_inside.photo'),
        this.$t('tabs.publications_inside.video'),
        this.$t('tabs.publications_inside.audio')
      ]
    }
  }
}
</script>

<style scoped>
.publication__main--block {
  display: flex;
}

@media (min-width: 768px) {
  .main__publications--section {
    width: 100%
  }
}

@media (min-width: 1280px) {
  .main__publications--section {
    width: 700px;
  }
}

@media (min-width: 1920px) {
  .main__publications--section {
    width: 700px;
  }
}
</style>

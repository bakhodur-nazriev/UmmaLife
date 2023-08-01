<template>
  <div class="publication__main--block">
    <div class="publication-top__layer">
      <div class="main__publications--section">
        <div class="main-publication__form">
          <PublicationForm />
        </div>
        <section class="tab__publications--section">
          <MainPublicationsTab :tabs-array="tabLabels" />
        </section>
      </div>
    </div>

    <div class="main-publication__sidebar">
      <PublicationTabSide />
    </div>
  </div>
</template>

<script>
import MainPublicationsTab from '@/components/ui/Publications/MainPublicationsTab.vue'
import PublicationTabSide from '@/components/blocks/PublicationTabSide.vue'
import PublicationForm from '@/components/forms/PublicationForm.vue'

export default {
  components: {
    PublicationForm,
    PublicationTabSide,
    MainPublicationsTab
  },
  data () {
    return {
      addedAudioItems: [],
      audioItems: [
        {
          id: 1,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          id: 2,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          id: 4,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          id: 5,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          id: 6,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          id: 7,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        }
      ]
    }
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
.publication-top__layer {
  display: flex;
  justify-content: center;
  width: 100%;
}

svg {
  color: var(--color-silver-chalice);
}

.main__publications--section {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.publication__main--block {
  display: flex;
}

@media (max-width: 576px) {
  .main-publication__sidebar {
    display: none;
  }

  .main-publication__form {
    display: none;
  }
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

<template>
  <div class="publication__main--block" id="container">
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

    <div class="main-publication__sidebar" id="sidebar">
      <div class="sidebar__inner" id="inner">
        <PublicationTabSide ref="tabSide" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MainPublicationsTab from '@/components/ui/Publications/MainPublicationsTab.vue'
import PublicationTabSide from '@/components/blocks/PublicationTabSide.vue'
import PublicationForm from '@/components/forms/PublicationForm.vue'
import StickySidebar from 'sticky-sidebar-v2'

export default {
  components: {
    PublicationForm,
    PublicationTabSide,
    MainPublicationsTab
  },
  data() {
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
    tabLabels() {
      return [
        this.$t('tabs.publications_inside.publications'),
        this.$t('tabs.publications_inside.articles'),
        this.$t('tabs.publications_inside.photo'),
        this.$t('tabs.publications_inside.video'),
        this.$t('tabs.publications_inside.audio')
      ]
    }
  },
  methods: {
    handleScroll() {
      const tabSide = this.$refs.tabSide.$el
      const tabSideRect = tabSide.getBoundingClientRect()
      const tabSideBottom = tabSideRect.bottom

      if (tabSideBottom <= window.innerHeight) {
        tabSide.classList.add('sticky-tab')
      } else {
        tabSide.classList.remove('sticky-tab')
      }
    }
  },
  mounted() {
    new StickySidebar('#sidebar', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '#container',
      innerWrapperSelector: '#inner',
      scrollContainer: '.main__content'
    })
  }
}
</script>

<style scoped lang="scss">
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
}

.publication__main--block {
  display: grid;
  grid-template-columns: 1fr 405px;
  gap: 20px;
}

@media (max-width: 576px) {
  .main-publication__sidebar {
    display: none;
  }

  .main-publication__form {
    display: none;
  }

  .publication__main--block {
    display: flex;
  }
}

@media (min-width: 768px) {
  .main__publications--section {
    width: 100%;
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

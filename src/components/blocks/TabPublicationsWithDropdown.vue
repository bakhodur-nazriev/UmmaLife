<template>
  <div class="publication__main--block">
    <div class="publication-tabs__section">
      <ul class="tab-list">
        <li
          class="tab-list__item"
          v-for="(title, i) in tabLabels"
          :key="i"
          :class="{ 'active' : i === activeTab }"
          @click="setActiveTab(i)"
        >
          {{ title }}
          <CheckMarkSmallIcon v-if="i === activeTab"/>
        </li>
      </ul>
    </div>

    <div class="tabs__content">
      <div
        v-for="(tab, index) in tabLabels"
        :key="index"
        v-show="activeTab === index"
      >
        <PublicationTab v-if="index === 0" />
        <ArticleTab v-if="index === 1"/>
        <PhotoTab v-if="index === 2"/>
        <VideoTab v-if="index === 3"/>
        <AudioTab v-if="index === 4" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckMarkSmallIcon from '@/components/icons/CheckMarkSmallIcon.vue'
import VideoTab from '@/components/ui/Publications/VideoTab.vue'
import ArticleTab from '@/components/ui/Publications/ArticleTab.vue'
import AudioTab from '@/components/ui/Publications/AudioTab.vue'
import PhotoTab from '@/components/ui/Publications/PhotoTab.vue'
import PublicationTab from '@/components/ui/Publications/PublicationTab.vue'

export default {
  components: {
    PublicationTab,
    PhotoTab,
    AudioTab,
    ArticleTab,
    VideoTab,
    CheckMarkSmallIcon
  },
  data () {
    return { activeTab: 0 }
  },
  methods: {
    setActiveTab (index) {
      this.activeTab = index
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

<style scoped lang="scss">
/*.publication__main--block > .publication-tabs__section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  -webkit-backdrop-filter: blur(3px);
  opacity: 0.4;
  pointer-events: none;
}*/
@media (max-width: 576px) {
  .publication__main--block {
    display: flex;
    position: relative;

    .publication-tabs__section {
      background-color: var(--color-white);
      display: flex;
      position: absolute;
      gap: 10px;
      left: 0;
      top: 0;
      padding: 15px 30px;
      width: 100%;
      z-index: 20;

      .tab-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;

        &__item {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        .active {
          color: var(--color-hippie-blue);
          transition: 0.3s;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .main__publications--section {
    width: 100%
  }

  .publication__main--block {
    display: none;
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

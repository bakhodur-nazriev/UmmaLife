<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs__header-item', { 'active': activeTab === index }]"
        @click="changeTab(index)"
      >
        <span
          class="dropdown-tab"
          v-if="index === 0"
          @click="openDropdown"
        >
          {{ tab.title }}
          <ArrowDownIcon/>
        </span>
        <span v-else>{{ tab.title }}</span>
      </div>
    </div>

    <div class="tabs__content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
      >
        <div v-if="index === 0">
          <div class="publication-dropdown" v-if="isMobileView">
            <TabPublicationsWithDropdown />
          </div>
          <TabPublications />
        </div>
        <div v-if="index === 1">
          <TabUmmaShorts  />
        </div>
        <div v-if="index === 2">
          <TabUmmaVideo  />
        </div>

        <div class="create-button__block">
          <button type="button" class="create-button">
            <PlusIcon/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabUmmaVideo from '@/components/blocks/TabUmmaVideo.vue'
import TabPublications from '@/components/blocks/TabPublications.vue'
import TabUmmaShorts from '@/components/blocks/TabUmmaShorts.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import TabPublicationsWithDropdown from '@/components/blocks/TabPublicationsWithDropdown.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
export default {
  components: {
    ArrowDownIcon,
    TabPublicationsWithDropdown,
    PlusIcon,
    TabUmmaShorts,
    TabPublications,
    TabUmmaVideo
  },
  props: {
    tabsArray: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeTab: 0,
      tabs: [],
      categories: []
    }
  },
  methods: {
    changeTab (index) {
      this.activeTab = index
      sessionStorage.setItem('activeTab', index.toString())
    }
  },
  computed: {
    isMobileView () {
      return window.innerWidth < 576
    }
  },
  mounted () {
    const savedTab = sessionStorage.getItem('activeTab')

    if (savedTab) {
      this.activeTab = parseInt(savedTab)
    }

    this.tabs = this.tabsArray.map((title, index) => ({
      title
    }))
  }
}
</script>

<style scoped lang="scss">
.tabs {
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::after {
      content: "";
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--color-alto-second);
      position: absolute;
    }

    &-item {
      display: flex;
      justify-content: center;
      cursor: pointer;
      padding: 16px 0;
      color: var(--color-silver-chalice);
      font-weight: 500;
      font-size: 18px;
      margin: 0 50px;
      width: 200px;

      &.active {
        position: relative;
        color: var(--color-mine-shaft);
        padding-bottom: 16px;
        font-weight: 600;
        z-index: 100;

        &::after {
          content: "";
          position: absolute;
          width: 200px;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--color-deep-cerulean);
          border-radius: 1px 1px 0 0;
        }
      }
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 24px;

    .create-button__block {
      display: none;
    }
  }
}

@media (max-width: 576px) {
  .tabs {

    &__header {

      &-item {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
        padding: 10px 0;

        &.active::after {
          width: 100%;
        }

        .dropdown-tab {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    &__content {
      .create-button__block {
        display: block;
        position: absolute;
        bottom: 80px;
        width: 48px;
        height: 48px;
        right: 20px;

        .create-button {
          border: none;
          outline: none;
          color: var(--color-white);
          font-size: 24px;
          width: 100%;
          height: 100%;
          background: var(--color-hippie-blue);
          box-shadow: 0 2px 10px rgba(73, 163, 153, 0.60);
          border-radius: 15px;
          padding: 0;
          cursor: pointer;
        }
      }
    }
  }
}

@media (min-width: 768px) {}

@media (min-width: 1280px) {}
</style>

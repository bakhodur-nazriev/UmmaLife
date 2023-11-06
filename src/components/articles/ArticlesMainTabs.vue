<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
          v-for="(tab, index) in filteredTabs"
          :key="tab.index"
          :class="['tabs__header-item', { 'active': activeTab === index }]"
          @click="handleTabClick(index)"
      >
        <span v-if="tab.index >= 0" class="tab-title">{{ tab.title }}</span>
      </div>
    </div>

    <div class="tabs__content">
      <div
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="activeTab === index"
          class="tabs__content--item"
      >
        <AllArticles v-if="index === 0"/>
        <MyArticles v-if="index === 1"/>
        <SavedArticles v-if="index === 2"/>
        <DraftArticles v-if="index === 3"/>
        <CreateArticles v-if="index === 4"/>
      </div>
    </div>

    <div class="create-button__block">
      <button type="button" class="create-button" @click="activateCreateArticles">
        <PlusIcon/>
      </button>
    </div>
  </div>
</template>

<script>
import AllArticles from '@/components/articles/AllArticles.vue'
import MyArticles from '@/components/articles/MyArticles.vue'
import SavedArticles from '@/components/articles/SavedArticles.vue'
import DraftArticles from '@/components/articles/DraftArticles.vue'
import CreateArticles from '@/components/articles/CreateArticles.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'

export default {
  components: {
    PlusIcon,
    CreateArticles,
    DraftArticles,
    SavedArticles,
    MyArticles,
    AllArticles
  },
  props: {
    tabsArray: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0,
      tabs: [],
      categories: [],
      isDropdownOpen: false,
      isSmallTab: false
    }
  },
  methods: {
    handleTabClick(index) {
      this.activeTab = index
      sessionStorage.setItem('activeTab', index.toString())
    },
    activateCreateArticles() {
      this.activeTab = 4
    },
    changeTab(index) {
      const screenWidth = window.innerWidth
      const isSmallScreen = screenWidth < 576

      if (isSmallScreen) {
        this.isSmallTab = true
        this.$store.dispatch('toggleChangeTabStyle')
      } else {
        this.activeTab = index
        sessionStorage.setItem('activeTab', index.toString())
      }
    }
  },
  mounted() {
    const savedTab = sessionStorage.getItem('activeTab')

    if (savedTab) {
      this.activeTab = parseInt(savedTab)
    }

    this.tabs = this.tabsArray.map((title, index) => ({
      title,
      index
    }))
  },
  computed: {
    isSmallScreen() {
      return window.innerWidth < 576
    },
    filteredTabs() {
      return this.tabs.filter((tab, index) => {
        return !this.isSmallScreen || index < this.tabs.length - 1
      })
    }
  }
}
</script>

<style scoped lang="scss">
.tabs {
  &__header {
    display: flex;
    align-items: center;
    gap: 160px;
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

      .tab-title {
        font-weight: 500;

        &:hover {
          color: var(--color-mine-shaft);
          transition: all .15s ease-in-out;
        }
      }

      .dropdown-tab {
        &__icon {
          display: none;
        }
      }

      &.active {
        position: relative;
        color: var(--color-mine-shaft);
        padding-bottom: 16px;
        font-weight: 600;
        z-index: 100;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: var(--color-deep-cerulean);
          border-radius: 2px 2px 0 0;
        }
      }
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    width: 100%;

    &--item {
      padding: 24px 0;
    }

    .create-button__block {
      display: none;
    }
  }
}

.create-button__block {
  display: none;
}

@media (min-width: 576px) {
  .tabs {
    &__header {
      justify-content: center;
    }
  }
}

@media (max-width: 576px) {
  .tabs {
    &__header {
      position: fixed;
      top: 64px;
      z-index: 15;
      background-color: var(--color-white);
      width: 100%;
      gap: 16px;
      padding: 0 20px;
      overflow-x: scroll;
      overflow-y: hidden;

      &::after {
        height: 1px;
        bottom: -1px;
      }

      &-item {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
        padding: 16px 0;
        white-space: nowrap;

        .tab-title {
          font-weight: 400;
        }

        &.active {
          padding-bottom: 16px;

          &::after {
            width: 100%;
            bottom: -1px;
          }
        }

        .dropdown-tab {
          display: flex;
          align-items: center;
          gap: 4px;

          &__icon {
            display: block;
          }
        }
      }

      &::-webkit-scrollbar-thumb {
        background: var(--color-secondary);
        border-radius: 10px;
      }

      &::-webkit-scrollbar {
        height: 2px;
      }
    }

    &__content {
      &--item {
        padding: 0;
      }

      .create-button__block {
        display: block;
        position: absolute;
        bottom: 80px;
        width: 48px;
        height: 48px;
        right: 20px;
        z-index: 90;

        .create-button {
          display: flex;
          align-items: center;
          justify-content: center;
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

  .create-button__block {
    display: block;
    position: absolute;
    bottom: 80px;
    width: 48px;
    height: 48px;
    right: 20px;
    z-index: 90;

    .create-button {
      display: flex;
      align-items: center;
      justify-content: center;
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
</style>

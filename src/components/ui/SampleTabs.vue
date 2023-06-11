<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs__header-item', { 'active': activeTab === index }]"
        @click="changeTab(index)"
      >
        {{ tab.title }}
      </div>
    </div>

    <div class="tabs__content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="tabs__content--inside--section"
      >
        <!--{{ tab.content }}-->
        <section class="category__section">
          <div class="selected__country--button">
            <sample-selected-category
              v-for="(item, index) in categories"
              :key="index"
              :title="item"
            ></sample-selected-category>
          </div>
          <div>
            <sample-button class="create__umma--video--button">{{ $t('buttons.create_umma_video') }}</sample-button>
          </div>
        </section>
        <section class="umma__videos--section">
          <umma-video v-for="(item, index) in 7" :key="index"></umma-video>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleSelectedCategory from '@/components/ui/SampleSelectedCategory.vue'
import UmmaVideo from '@/components/ui/UmmaVideo.vue'
export default {
  components: {
    UmmaVideo,
    SampleButton,
    SampleSelectedCategory
  },
  props: {
    tabsArray: {
      type: Array,
      required: true
    },
    tabsContentArray: {
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
    }
  },
  mounted () {
    this.tabs = this.tabsArray.map((title, index) => ({
      title,
      content: this.tabsContentArray[index]
    }))
    this.categories = ['Категория 1', 'Категория 2', 'Категория 3', 'Категория 4', 'Категория 5', 'Категория 6']
  }
}
</script>

<style scoped>
.tabs {}

.tabs__header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.tabs__header::after {
  content: "";
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: var(--color-gray-2);
  position: absolute;
}

.tabs__header-item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 16px 0;
  color: var(--color-text);
  font-weight: 500;
  margin: 0 50px;
  width: 200px;
}

.tabs__header-item.active {
  position: relative;
  color: var(--color-primary);
  padding-bottom: 16px;
}

.tabs__header-item.active::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--color-link);
  border-radius: 1px 1px 0 0;
}

.create__umma--video--button {
  padding: 12px 32px;
  width: 242px;
}

.selected__country--button {
  display: flex;
  flex-wrap: wrap;
}

.category__section {
  display: flex;
  justify-content: space-between;
}

.umma__videos--section {
  display: flex;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .tabs__content {
    padding: 16px 24px;
  }

  .category__section {
    margin-bottom: 8px;
  }
}

@media (min-width: 1280px) {
  .tabs__content {
    display: flex;
    padding: 16px 88px;
  }

  .category__section {
    margin-bottom: 24px;
  }
}

/*.tabs__content--inside--section {
  display: flex;
  flex-direction: column;
  ali
}*/
</style>

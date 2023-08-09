<template>
  <div class="main-tab-umma-video__block">
    <section class="category__section">
      <div class="category__left--section">
        <div class="transparent__left--right--block" ref="transparentBlock">
          <ScrollableCategory />
        </div>
      </div>
      <div>
        <SampleButton
          class="create__umma--video--button"
          :title="`${ $t('buttons.create_umma_video') }`"
        />
      </div>
    </section>
    <section class="umma__videos--section">
      <UmmaVideo v-for="(item, index) in 12" :key="index" />
    </section>
  </div>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import UmmaVideo from '@/components/ui/UmmaVideo.vue'
import ScrollableCategory from '@/components/ui/Fields/ScrollableCategory.vue'

export default {
  components: {
    ScrollableCategory,
    UmmaVideo,
    SampleButton
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.category__left--section {
  display: flex;
  align-items: center;
}

.transparent__left--right--block {
  position: relative;
  display: flex;
  align-items: center;
}

.create__umma--video--button {
  padding: 12px 32px;
  width: 242px;
}

.selected__country--button {
  display: flex;
  align-items: center;
  gap: 0 16px;
  overflow: hidden;
  scroll-behavior: smooth;
}

.category__section {
  display: flex;
  justify-content: space-between;
}

.umma__videos--section {
  display: grid;
  gap: 16px;
  row-gap: 24px;
  grid-template-columns: repeat(3,1fr);
}

@media (min-width: 768px) {
  .category__section {
    margin-bottom: 8px;

  }
  .selected__country--button {
    max-width: 310px;
  }
  .umma__videos--section {
    grid-template-columns: repeat(2,1fr);
  }
}

@media (min-width: 1280px) {
  .category__section {
    margin-bottom: 24px;
  }
  .selected__country--button {
    max-width: 600px;
  }
  .umma__videos--section {
    grid-template-columns: repeat(3,1fr);
  }

  .umma__videos--section {
    max-width: 1500px;
  }
}

@media (min-width: 1920px) {
  .umma__videos--section {
    max-width: 1920px;
  }
  .selected__country--button {
    max-width: 960px;
  }
  .umma__videos--section {
    grid-template-columns: repeat(4,1fr);
  }
}

</style>

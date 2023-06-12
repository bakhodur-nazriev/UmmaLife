<template>
  <section class="category__section">
    <div class="category__left--section">
      <div class="left__button"><dropdown-icon /></div>
      <div class="selected__country--button">
        <sample-selected-category
          v-for="(item, index) in categories"
          :key="index"
          :title="item"
        ></sample-selected-category>
      </div>
      <div class="right__button"><dropdown-icon /></div>
    </div>
    <div>
      <sample-button class="create__umma--video--button">{{ $t('buttons.create_umma_video') }}</sample-button>
    </div>
  </section>
  <section class="umma__videos--section">
    <umma-video v-for="(item, index) in 12" :key="index"></umma-video>
  </section>
</template>

<script>
import SampleSelectedCategory from '@/components/ui/SampleSelectedCategory.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import UmmaVideo from '@/components/ui/UmmaVideo.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  components: {
    DropdownIcon,
    UmmaVideo,
    SampleButton,
    SampleSelectedCategory
  },
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    this.categories = [
      'Категория 1',
      'Категория 2',
      'Категория 3',
      'Категория 4',
      'Категория 5',
      'Категория 6',
      'Категория 4',
      'Категория 5',
      'Категория 6'
    ]
  }
}
</script>

<style scoped>
.category__left--section {
  display: flex;
  align-items: center;
}

.left__button, .right__button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
}

.left__button:hover, .right__button:hover {
  background-color: var(--color-text);
  color: var(--color-divider);
  transition: 0.3s ease;
}

.left__button svg {
  transform: rotate(90deg);
}

.right__button svg {
  transform: rotate(-90deg);
}

.create__umma--video--button {
  padding: 12px 32px;
  width: 242px;
}

.selected__country--button {

  display: flex;
  align-items: center;
  gap: 0 16px;
  overflow-x: scroll;
}
.category__section {
  display: flex;
  justify-content: space-between;
}

.umma__videos--section {
  display: grid;
  gap: 16px;
  row-gap: 24px;
}

.tab__content--umma--video {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 16px;
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
    max-width: 480px;
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

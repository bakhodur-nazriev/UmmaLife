<template>
  <div class="main-tab-umma-video__block">
    <section class="category__section">
      <div class="category__left--section">
        <div class="transparent__left--right--block" ref="transparentBlock">
          <div class="transparent__left" ref="leftTransparent"></div>
          <div class="left__button" @click="scrollLeft" ref="leftButton">
            <DropdownIcon />
          </div>
          <div class="selected__country--button" ref="scrollContainer">
            <SampleSelectedCategory
              v-for="(item, index) in categories"
              :key="index"
              :title="item"
            />
          </div>
          <div class="transparent__right" ref="rightTransparent"></div>
          <div class="right__button" @click="scrollRight" ref="rightButton">
            <DropdownIcon />
          </div>
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
      'Категория 6'
    ]

    this.$refs.scrollContainer.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollLeft() {
      const scrollContainer = this.$refs.scrollContainer
      const leftButton = this.$refs.leftButton

      scrollContainer.scrollLeft -= 150
      scrollContainer.scrollBy({
        left: -150,
        behavior: 'smooth'
      })

      leftButton.style.display = 'flex'
    },
    scrollRight() {
      const scrollContainer = this.$refs.scrollContainer
      const rightButton = this.$refs.rightButton

      scrollContainer.scrollLeft += 150
      scrollContainer.scrollBy({
        left: 150,
        behavior: 'smooth'
      })

      rightButton.style.display = 'flex'
    },
    handleScroll() {
      const scrollContainer = this.$refs.scrollContainer
      const leftButton = this.$refs.leftButton
      const leftTransparent = this.$refs.leftTransparent
      const rightButton = this.$refs.rightButton
      const rightTransparent = this.$refs.rightTransparent

      if (scrollContainer.scrollLeft <= 0) {
        leftButton.style.display = 'none'
        leftTransparent.style.display = 'none'
        rightButton.style.display = 'flex'
        rightTransparent.style.display = 'flex'
      } else if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        leftButton.style.display = 'flex'
        leftTransparent.style.display = 'flex'
        rightButton.style.display = 'none'
        rightTransparent.style.display = 'none'
      } else {
        leftButton.style.display = 'flex'
        leftTransparent.style.display = 'flex'
        rightButton.style.display = 'flex'
        rightTransparent.style.display = 'flex'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.category__left--section {
  display: flex;
  align-items: center;
}

.left__button,
.right__button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 40px;
  max-width: 40px;
  min-height: 40px;
  max-height: 40px;
  border-radius: 50%;
  z-index: 100;
}

.left__button {
  display: none;
  position: absolute;
  left: -15px;
  user-select: none;
}

.right__button {
  position: absolute;
  right: -15px;
  user-select: none;
}

.transparent__left--right--block {
  position: relative;
  display: flex;
  align-items: center;

  //&::after,
  //&::before {
  //  content: "";
  //  position: absolute;
  //  top: 0;
  //  width: 100px;
  //  height: 100%;
  //}
}

//.transparent__left--right--block {
//  &::after {
//    left: 0;
//    background: linear-gradient(to left, transparent, var(--color-seashell) 50%);
//  }
//}
//
//.transparent__left--right--block {
//  &::before {
//    right: 0;
//    background: linear-gradient(to right, transparent, var(--color-seashell) 50%);
//  }
//}

.transparent__left {
  display: none;
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 70px;
  height: 100%;
  background: linear-gradient(to left, transparent, var(--color-seashell) 50%);
}

.transparent__right {
  position: absolute;
  content: '';
  top: 0;
  right: 0;
  width: 70px;
  height: 100%;
  background: linear-gradient(to right, transparent, var(--color-seashell) 50%);
}

.left__button,
.right__button {
  &:hover {
    background-color: var(--color-silver-chalice);
    color: var(--color-seashell);
    transition: all .15s ease-in-out;
  }
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

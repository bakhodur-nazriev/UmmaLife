<template>
  <div class="scrollable-tabs-container">
    <div class="left-arrow" ref="leftArrow">
      <DropdownIcon/>
    </div>
    <ul ref="tabsList">
      <li v-for="(category, i) in categories" :key="i">
        <a href="#" ref="scrollableTabsItem">{{ category.name }}</a>
      </li>
    </ul>
    <div class="right-arrow active" ref="rightArrow">
      <DropdownIcon/>
    </div>
  </div>
</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  components: {
    DropdownIcon
  },
  data: () => ({
    categories: [
      { name: 'Categories 1' },
      { name: 'Categories 2' },
      { name: 'Categories 3' },
      { name: 'Categories 4' },
      { name: 'Categories 5' },
      { name: 'Categories 6' },
      { name: 'Categories 7' }
    ]
  }),
  methods: {
    removeAllActiveClasses() {
      const tabs = this.$refs.scrollableTabsItem
      tabs.forEach((tab) => {
        tab.classList.remove('active')
      })
    },
    manageArrowButtons() {
      const tabsList = this.$refs.tabsList
      const leftArrowButton = this.$refs.leftArrow
      const rightArrowButton = this.$refs.rightArrow

      if (tabsList.scrollLeft <= 0) {
        leftArrowButton.classList.remove('active')
      } else {
        leftArrowButton.classList.add('active')
      }

      const maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth
      if (tabsList.scrollLeft >= maxScrollValue) {
        rightArrowButton.classList.remove('active')
      } else {
        rightArrowButton.classList.add('active')
      }
    }
  },
  mounted() {
    const tabs = this.$refs.scrollableTabsItem
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        this.removeAllActiveClasses()
        tab.classList.add('active')
      })
    })

    const leftArrow = this.$refs.leftArrow
    const rightArrow = this.$refs.rightArrow
    const tabsList = this.$refs.tabsList

    leftArrow.addEventListener('click', () => {
      tabsList.scrollLeft -= 200
      this.manageArrowButtons()
    })

    rightArrow.addEventListener('click', () => {
      tabsList.scrollLeft += 200
      this.manageArrowButtons()
    })

    tabsList.addEventListener('scroll', this.manageArrowButtons)
  }
}
</script>

<style scoped lang="scss">
.scrollable-tabs-container {
  border-radius: 5px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;

  ul {
    list-style: none;
    margin: 0;
    padding: 13px 0;
    display: flex;
    gap: 16px;
    align-items: center;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }

    a {
      text-decoration: none;
      padding: 13px 26px;
      background: var(--color-white);
      color: var(--color-silver-chalice);
      font-size: 16px;
      border-radius: 50px;
      user-select: none;
      white-space: nowrap;
      transition: all .15s ease-in-out;

      &:hover {
        background-color: var(--color-hippie-blue);
        color: var(--color-white);
      }

      &.active {
        background-color: var(--color-hippie-blue);
        color: var(--color-white);
      }
    }
  }

  svg {
    width: 36px;
    height: 36px;
    padding: 12px;
    cursor: pointer;
    transition: all .15s ease-in-out;
    border-radius: 50%;

    &:hover {
      background-color: var(--color-silver-chalice);
      color: var(--color-seashell);
      transition: all 0.15s ease-in-out;
    }
  }
}

.left-arrow {
  display: none;
  position: absolute;
  height: 100%;
  width: 100px;
  top: 0;
  left: 0;
  align-items: center;
  padding: 0 10px;
  background: linear-gradient(to left, transparent, var(--color-seashell) 50%);
  user-select: none;
  svg {
    transform: rotate(90deg);
  }

  &.active {
    display: flex;
  }
}

.right-arrow {
  display: none;
  position: absolute;
  height: 100%;
  width: 100px;
  justify-content: flex-end;
  top: 0;
  right: 0;
  align-items: center;
  padding: 0 10px;
  background: linear-gradient(to right, transparent, var(--color-seashell) 50%);
  user-select: none;
  svg {
    transform: rotate(-90deg);
  }

  &.active {
    display: flex;
  }
}
</style>

<template>
  <div class="select" v-on-click-outside="closeHandler">
    <div class="select__wrapper" @click="clickHandler">
      <div class="left">
        <component :is="options[selected].icon" /><span>{{ options[selected].title }}</span>
      </div>
      <ArrowDownIcon />
    </div>
    <Transition name="bounce">
      <div class="select__dropdown" v-if="isMenuOpen">
        <ul>
          <li v-for="(option, i) in options" :key="option.title" @click="selectHandler(i)">
            <component :is="option.icon" /> <span>{{ option.title }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script>
import AvailableIcon from '@/components/icons/AvailableIcon.vue'
export default {
  components: { AvailableIcon }
}
</script>

<script setup>
/* eslint-disable */
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue'

const selected = ref(0)
const isMenuOpen = ref(false)
const options = ref([
  {
    title: 'Доступно всем',
    icon: 'available-icon'
  },
  {
    title: 'Друзья',
    icon: 'available-icon'
  },
  {
    title: 'Только я',
    icon: 'available-icon'
  }
])
const clickHandler = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const selectHandler = (index) => {
  selected.value = index
  isMenuOpen.value = false
}
const closeHandler = () => {
  isMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: scale-up-top-right 0.2s;
}

.bounce-leave-active {
  animation: scale-up-top-right 0.2s reverse;
}

@keyframes scale-up-top-right {
  0% {
    transform: scale(0.5);
    transform-origin: top right;
  }
  100% {
    transform: scale(1);
    transform-origin: top right;
  }
}
.select {
  position: relative;

  &__wrapper {
    padding: 12px;
    border-radius: 10px;
    background: var(--color-seashell);
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    .left {
      display: flex;
      align-items: center;
      gap: 8px;
      svg {
        width: 16px;
        height: 16px;
      }
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
  &__dropdown {
    position: absolute;
    left: -100px;
    top: -100px;
    background: var(--color-white);
    border-radius: 10px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
    @media (max-width: 1600px) {
      left: unset;
      right: -100px;
    }
    ul {
      list-style: none;
      padding: 8px;
      margin: 0;
      width: -moz-max-content;
      width: max-content;
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 14px;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 10px;
        position: relative;
        &:not(:last-child) {
          border-bottom: 1px solid var(--color-seashell);
        }
        &:hover {
          transition: all 0.15s ease-in-out;
          background-color: var(--color-seashell);
        }
      }
    }
  }
}
</style>

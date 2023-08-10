<template>
  <div class="menu__details">
    <div class="menu__toggle--button" @click="toggleFilterWindow">
      <FilterCommentsIcon class="dropdown__toggle"/>
    </div>

    <div class="menu__overlay" v-show="isFilterWindowOpen">
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          {{ $t('dropdown.first_news') }}
          <CheckMarkSmallIcon />
        </li>
        <SampleDivider class="dropdown__item--divider"/>
        <li class="dropdown__item">
          {{ $t('dropdown.first_oldest') }}
          <CheckMarkSmallIcon />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FilterCommentsIcon from '@/components/icons/comment/FilterCommentsIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import CheckMarkSmallIcon from '@/components/icons/CheckMarkSmallIcon.vue'

export default {
  components: {
    CheckMarkSmallIcon,
    SampleDivider,
    FilterCommentsIcon
  },
  props: {
    isFilterWindowOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleFilterWindow() {
      this.$emit('toggle-filter-window')
    }
  }
}
</script>

<style lang="scss" scoped>
.menu__overlay {
  animation: menu__overlay 0.2s;

  svg {
    color: var(--color-silver-chalice);
  }
}

@keyframes menu__overlay {
  0% {
    transform:scale(.5);
    transform-origin:center top;
  }
  100% {
    transform:scale(1);
    transform-origin:center top
  }
}

.dropdown__item--divider {
  margin: 2px auto;
  width: 92%;
}

.menu__details {
  position: relative;
}

.menu__toggle--button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown__menu {
  list-style: none;
  padding: 8px;
  margin: 0;
  width: max-content;
}

.dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  gap: 5px;

  &:hover {
    background-color: var(--color-seashell);
    border-radius: 10px;
  }

  svg {
    color: var(--color-mine-shaft)
  }
}

@media (max-width: 576px) {
  .menu__overlay {
    position: absolute;
    right: 0;
    background-color: var(--color-white);
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }
}
</style>

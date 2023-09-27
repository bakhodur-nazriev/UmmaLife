<template>
  <nav class="settings__nav">
    <div class="settings__nav--inner">
      <div
        class="settings__nav--item"
        v-for="(tab, i) in tabs"
        :class="{ active: selectedTab === i }"
        :key="`tab_${i + 1}`"
        @click="emit('handleSelectTab', i)"
      >
        {{ tab }}
      </div>
    </div>
  </nav>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  tabs: {
    type: Array,
    default: () => []
  },
  selectedTab: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['handleSelectTab'])
</script>

<style lang="scss" scoped>
.settings {
  &__nav {
    &--inner {
      background-color: var(--color-white);
      border-radius: 20px;
      padding: 12px;
      @media (max-width: 767px) {
        width: 100%;
        height: calc(100dvh - 64px);
      }
    }
    &--item {
      padding: 16px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.2;
      color: var(--color-mine-shaft);
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      &.active {
        background-color: var(--color-seashell);
        font-weight: 550;
        line-height: 1;
      }
    }
  }
}
</style>

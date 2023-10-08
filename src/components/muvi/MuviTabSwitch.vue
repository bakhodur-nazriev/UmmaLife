<template>
  <div class="muvi__activity--tab">
    <div
      class="muvi__activity--btn"
      v-for="(tab, index) in tabs"
      :key="tab"
      :class="{ active: activeIndex === index }"
      @click="emit('handleTabClick', index)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  tabs: Array,
  activeIndex: Number
})

const emit = defineEmits(['handleTabClick'])
</script>

<style lang="scss" scoped>
.muvi__activity {
  &--tab {
    background-color: var(--color-white);
    width: fit-content;
    margin: 0 auto 28px;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    border-radius: 16px;
  }
  &--btn {
    padding: 16px;
    min-width: 242px;
    border-radius: 12px;
    background-color: var(--color-white);
    color: var(--color-secondary);
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    &.active {
      background-color: var(--color-seashell);
      color: var(--color-mine-shaft);
    }
  }
}
</style>

<template>
  <div class="groups__card--container">
    <slot />
  </div>
</template>

<style lang="scss">
.groups__card--container {
  background: var(--color-white);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

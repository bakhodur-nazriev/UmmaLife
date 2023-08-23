<template>
  <div class="groups__nav">
    <div class="groups__nav--wrapper">
      <div class="groups__nav--inner">
        <div class="groups__nav--menu">
          <div
            class="groups__nav--link"
            v-for="(link, index) in links"
            :key="link.name"
            :class="{ active: link.isActive }"
            @click="$emit('clickNavHandler', index)"
          >
            {{ link.name }}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    links: Array
  },
  emits: ['clickNavHandler']
}
</script>

<style lang="scss" scoped>
.groups__settings--nav {
  .groups__nav--menu {
    margin-left: -20px;
  }
}
.groups__nav {
  padding: 24px 0 0;
  border-bottom: 1px solid var(--color-alto-second);
  &--wrapper {
    display: grid;
    grid-template-columns: 1fr 411px;
    gap: 20px;
  }
  &--inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &--menu {
    width: 700px;
    margin-left: 145px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1635px) {
      margin-left: 50px;
    }
    @media (max-width: 1535px) {
      margin-left: 0;
    }
  }
  &--link {
    cursor: pointer;
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-silver-chalice);
    margin: 0 40px;
    border-bottom: 3px solid transparent;
    padding-bottom: 14px;
    user-select: none;
    &.active {
      color: var(--color-mine-shaft);
      border-color: var(--color-deep-cerulean);
    }
  }
}
</style>

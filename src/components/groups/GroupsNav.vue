<template>
  <div class="groups__nav" :class="`${className}__nav`">
    <div class="groups__nav--wrapper" :class="className">
      <div class="groups__nav--inner">
        <div class="groups__nav--menu">
          <div
            class="groups__nav--link"
            v-for="(link, index) in links"
            :key="link.name"
            :class="{ active: link.isActive }"
            @click="$emit('clickNavHandler', index)"
          >
            {{ $t(link.name) }}
          </div>
        </div>
      </div>
      <div class="groups__nav--hidden"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    links: Array,
    className: {
      type: String,
      default: ''
    }
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
  @media (max-width: 767px) {
    background-color: var(--color-white);
    padding-top: 20px;
  }
  &.full__nav {
    @media (max-width: 767px) {
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .groups__nav--menu {
        gap: 40px;
      }
      .groups__nav--link {
        margin: 0;
      }
    }
  }
  &--wrapper {
    display: grid;
    grid-template-columns: 1fr 411px;
    gap: 20px;

    &.muvi__nav {
      grid-template-columns: 100%;
      gap: 0;

      .groups__nav--menu {
        margin-left: 0;
        padding: 0 16px;
        justify-content: center;
        gap: 10%;
        width: 100%;
        @media (max-width: 1350px) {
          gap: 40px;
        }
        @media (max-width: 800px) {
          gap: 24px;
        }
        @media (max-width: 767px) {
          justify-content: flex-start;
          overflow-x: auto;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
      .groups__nav--link {
        margin-left: 0;
        margin-right: 0;
        padding-bottom: 16px;
        @media (max-width: 767px) {
          padding-bottom: 8px;
        }
      }
    }
    &.full {
      grid-template-columns: 1fr;
      .groups__nav--hidden {
        display: none;
      }
      .groups__nav--menu {
        max-width: 1587px;
        width: 100%;
        margin-left: 0;
        padding: 0 16px;
      }
    }
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
    @media (max-width: 767px) {
      white-space: nowrap;
    }
    &.active {
      color: var(--color-mine-shaft);
      border-color: var(--color-deep-cerulean);
    }
  }
}
</style>

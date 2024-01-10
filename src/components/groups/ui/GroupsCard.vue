<template>
  <div class="group__card">
    <div class="group__card--info">
      <img :src="group.img" :alt="group.title" />
      <div class="group__card--wrapper">
        <router-link :to="`/my-groups/${group.id}`" class="group__card--title">{{
          group.title
        }}</router-link>
        <div class="group__card--subs">{{ group.users_count }} подписчиков</div>
      </div>
    </div>
    <div class="group__card--actions subs" v-if="!application">
      <button
        class="group__card--btn"
        :class="!isClicked ? 'subed' : 'nosub'"
        @click="isClicked = !isClicked"
      >
        {{ !isClicked ? 'Подписаться' : 'Отписаться' }}
      </button>
    </div>
    <div class="group__card--actions application" v-else>
      <button class="group__card--btn subed">Принять</button>
      <button class="group__card--btn nosub">Отклонить</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: Object,
    application: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isClicked: false
    }
  },
  mounted() {
    this.isClicked = this.group.isSubs
  }
}
</script>

<style lang="scss" scoped>
.group__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  &--info {
    display: flex;
    align-items: center;
    gap: 12px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
      display: block;
    }
  }
  &--title {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 4px;
    text-decoration: none;
  }
  &--subs {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-secondary);
  }
  &--actions {
    display: flex;
    gap: 8px;
    &.subs {
      button {
        width: 178px;
      }
    }
    &.application {
      button {
        width: 120px;
      }
    }
  }
  &--btn {
    padding: 10px;
    border: none;
    outline: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    cursor: pointer;
    border-radius: 10px;
    &.subed {
      background-color: var(--color-green);
      color: var(--color-white);
      &:hover {
        background-color: var(--color-deep-cerulean);
        color: var(--color-white);
        transition: all 0.15s ease-in-out;
      }
    }
    &.nosub {
      background-color: var(--color-seashell);
      color: var(--color-mine-shaft);
    }
  }
}
</style>

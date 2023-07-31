<template>
  <div class="message" :class="state">
    <div class="message__inner">
      <div class="message__text" v-if="typeof message === 'string'">
        {{ message }}
      </div>
      <div class="message__text" v-if="typeof message === 'object'">
        <div class="message__text--top">
          <span>{{ message.user_name }}</span>
          {{ message.user_message }}
        </div>
        {{ message.text }}
      </div>
      <div class="message__bottom">
        <span>15:52</span>
        <double-check-icon v-if="state === 'send'" />
      </div>
    </div>
  </div>
</template>

<script>
import DoubleCheckIcon from '@/components/icons/DoubleCheckIcon.vue'

export default {
  components: { DoubleCheckIcon },
  props: {
    state: {
      type: String,
      validator: (value) => ['send', 'recieve'].includes(value),
      default: () => 'send'
    },
    message: [String, Object]
  }
}
</script>

<style lang="scss" scoped>
.message {
  margin-bottom: 8px;
  width: 100%;
  &__inner {
    padding: 14px 14px 26px;
    border-radius: 20px;
    max-width: 718px;
    width: fit-content;
    position: relative;
    min-width: 100px;
    overflow-wrap: break-word;
  }
  &.send {
    .message__inner {
      background-color: var(--color-purple);
      margin-left: auto;
      color: var(--color-white);
    }
  }
  &.recieve {
    .message__inner {
      background-color: var(--color-white);
      color: var(--color-mine-shaft);
    }
  }
  &__text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: 0.4px;
    &--top {
      border-left: 2px solid var(--color-white);
      padding-left: 8px;
      margin-bottom: 10px;
      span {
        display: block;
        font-size: 14px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        margin-bottom: 2px;
      }
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
      white-space: nowrap;
    }
  }
  &__bottom {
    position: absolute;
    bottom: 5px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
      letter-spacing: 0.35px;
    }
    svg {
      width: 19px;
      height: 16px;
      display: block;
    }
  }
}
</style>

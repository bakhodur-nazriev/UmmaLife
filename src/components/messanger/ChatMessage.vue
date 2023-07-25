<template>
  <div class="message" :class="state">
    <div class="message__text">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum dicta temporibus tenetur perspiciatis cum, inventore officia unde assumenda explicabo. Corporis iste deserunt quibusdam autem dolore non sint aliquid adipisci dicta?
    </div>
    <div class="message__bottom">
      <span>15:52</span>
      <double-check-icon v-if="state === 'send'" />
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
    }
  }
}
</script>

<style lang="scss" scoped>
.message{
  margin-bottom: 8px;
  padding: 14px 14px 26px;
  border-radius: 20px;
  max-width: 718px;
  width: 100%;
  position: relative;
  &.send{
    background-color: var(--color-purple);
    margin-left: auto;
    color: var(--color-white);
  }
  &.recieve{
    background-color: var(--color-white);
    color: var(--color-mine-shaft);
  }
  &__text{
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: 0.4px;
  }
  &__bottom{
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

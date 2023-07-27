<template>
  <form class="form">
    <div class="form__input">
      <div class="form__file">
        <attach-icon />
        <input type="file">
      </div>
      <input type="text" :placeholder="`${$t('chat.placeholder')}...`" class="form__input--text">
    </div>
    <button type="submit" class="form__btn">
      {{ $t('chat.send') }}
      <send-icon />
    </button>
  </form>
</template>

<script>
import SendIcon from '@/components/icons/SendIcon.vue'
import AttachIcon from '@/components/icons/AttachIcon.vue'
export default {
  components: { SendIcon, AttachIcon }
}
</script>

<style scoped lang="scss">
.form{
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 16px 16px;
  display: grid;
  grid-template-columns: 1fr 171px;
  gap: 16px;
  background-color: var(--color-seashell);
  &__input{
    background-color: var(--color-white);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    &--text{
      width: 100%;
      border: none;
      padding: 16px 24px;
      outline: none;
      color: var(--color-mine-shaft);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      &::placeholder{
        color: var(--color-silver-chalice);
      }
    }
  }
  &__file {
    padding: 19px 24px;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 18px;
      height: 18px;
      display: block;
    }
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    &::after{
      content: '';
      width: 1px;
      height: 24px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background-color: var(--color-silver-chalice);
    }
  }
  &__btn{
    border-radius: 10px;
    border: 1px solid var(--color-deep-cerulean);
    outline: none;
    color: var(--color-deep-cerulean);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    svg {
      width: 18px;
      height: 18px;
      display: block;
    }
  }
}
</style>

<template>
  <label class="radio" :class="`${checked ? 'radio__checked' : ''}`">
    <input
      class="radio__input"
      type="radio"
      :name="name"
      :checked="checked"
      @change="changeHandler"
    />
    <span class="radio__icon"></span>

    <span class="radio__text">
      <slot/>
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'category'
  },
  checked: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: -1
  }
})

const emit = defineEmits(['changeHandler'])
const changeHandler = (e) => {
  emit('changeHandler', {target: e.target.checked, index: props.index})
}
</script>

<style lang="scss">
.radio {
  display: flex;
  position: relative;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  &__icon {
    margin-top: -3px;
    max-width: 20px;
    width: 20px;
    height: 20px;
    border: 1px solid var(--color-hippie-blue);
    position: relative;
    border-radius: 50%;
    margin-right: 8px;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color-hippie-blue);
      opacity: 0;
    }
  }

  &__checked {
    .radio__icon::after {
      opacity: 1;
    }
  }

  &__text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    color: var(--color-mine-shaft);
  }
}
</style>

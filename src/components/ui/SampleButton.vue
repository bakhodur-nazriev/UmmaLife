<script setup>
/* eslint-disable */
const emit = defineEmits(['click'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 16
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  rounded: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const clickButton = () => {
  emit('click')
}

</script>

<template>
  <button
    :type="type"
    :class="['btn', `btn_${ color }`, {'btn_rounded': rounded}, {'btn_icon': icon}]"
    @click="clickButton"
    :style="{ fontSize: `${size}px` }"
    :disabled="disabled"
  >
    <span v-if="icon" class="btn__icon">
      <slot />
    </span>
    <span v-if="title">{{ title }}</span>
  </button>
</template>

<style scoped lang="scss">
.btn {
  background-color: #49A399;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;

  &_primary {
    background-color: var(--color-hippie-blue);
  }

  &_secondary {
    background-color: var(--color-deep-cerulean);
  }

  &_tertiary {
    background-color: var(--color-white);
    color: var(--color-hippie-blue);
  }

  &_none {
    all: unset;
    border: none;
    background-color: transparent;
  }

  &_primary:hover {
    background-color: #00819D;
    color: #fff;
    transition: 0.2s;
  }

  &::placeholder {
    color: #B0B0B0;
    font-weight: 400;
  }

  &_rounded {
    border-radius: 50px;
  }

  &:disabled {
    opacity: .6;
    cursor: default;
    background-color: var(--color-silver-chalice);

    &:hover {
      opacity: .6;
      background-color: var(--color-silver-chalice);
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
  }
}

@media (min-width: 768px) {
  .btn {
    max-width: 320px;
  }
}
</style>

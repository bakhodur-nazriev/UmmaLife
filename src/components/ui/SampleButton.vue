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
  },
  width: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: '15px'
  }
})

const clickButton = () => {
  emit('click')
}
</script>

<template>
  <button
    :type="type"
    :class="['btn', `btn_${color}`, { btn_rounded: rounded }, { btn_icon: icon }]"
    @click="clickButton"
    :style="{ fontSize: `${size}px`, width, padding }"
    :disabled="disabled"
  >
    <span v-if="icon" class="btn__icon">
      <slot />
    </span>
    <span v-if="title">{{ title }}</span>
  </button>
</template>

<style lang="scss">
.btn {
  background-color: var(--color-hippie-blue);
  color: var(--color-white);
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &_primary {
    background-color: var(--color-hippie-blue);
  }

  &_secondary {
    background-color: var(--color-deep-cerulean);
  }

  &_white {
    background-color: var(--color-white);
    color: var(--color-hippie-blue);
  }

  &_default {
    background-color: var(--color-seashell);
    color: var(--color-mine-shaft);
  }

  &_default_flex {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-seashell);
    color: var(--color-mine-shaft);
  }

  &_tertiary {
    background-color: var(--color-white);
    color: var(--color-hippie-blue);
  }

  &_seashell {
    background-color: var(--color-seashell);
    color: var(--color-mine-shaft);
  }

  &_alto-first {
    background-color: var(--color-alto-first);
    color: var(--color-mine-shaft);
  }

  &_none {
    all: unset;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin: 0;
    }
  }

  &_primary:hover {
    background-color: var(--color-deep-cerulean);
    color: var(--color-white);
    transition: all 0.15s ease-in-out;
  }

  &::placeholder {
    color: #b0b0b0;
    font-weight: 400;
  }

  &_rounded {
    border-radius: 50px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    background-color: var(--color-silver-chalice);

    &:hover {
      opacity: 0.6;
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

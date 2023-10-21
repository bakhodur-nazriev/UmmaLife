<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false" v-if="screenWidth > 767">
    <div class="selected" :class="{ open: open }" @click="open = !open" v-html="selected"></div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="handleClick(option)"
        v-html="option"
      ></div>
    </div>
  </div>
  <div class="mobile-select" v-else>
    <div class="custom-select" :tabindex="tabindex">
      <div class="selected" :class="{ open: open }" @click="open = !open" v-html="selected"></div>
    </div>
    <div class="mobile-select--inner" v-if="open">
      <div
        class="mobile-select--block"
        :class="open && !className ? 'opened' : 'closed'"
        v-on-click-outside="handleClose"
      >
        <div class="mobile-select--header" v-if="title">{{ title }}</div>
        <div class="mobile-select--wrapper">
          <label
            class="mobile-select--item"
            v-for="(option, i) of options"
            :key="i"
            @click="handleSelect(option)"
          >
            <div v-html="option"></div>
            <div class="mobile-select--radio">
              <input type="radio" name="radio" :checked="option === selected" />
              <div class="mobile-select--radio-input"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['input'],
  props: {
    options: {
      type: Array,
      required: true
    },
    default: {
      type: String,
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
      open: false,
      className: false
    }
  },
  methods: {
    handleClick(option) {
      this.selected = option
      this.open = false
      this.$emit('input', option)
    },
    handleSelect(option) {
      this.selected = option
      this.$emit('input', option)
      this.handleClose()
    },
    handleClose() {
      this.className = true
      setTimeout(() => {
        this.open = false
        this.className = false
      }, 100)
    }
  }
}
</script>

<script setup>
/* eslint-disable */
import { computed } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { useWindowSize } from '@vueuse/core'
const screenWidth = computed(() => {
  const { width } = useWindowSize()
  return width.value
})
</script>

<style lang="scss">
.mobile-select {
  width: 100%;
  &--radio {
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
    width: 20px;
    height: 20px;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      &:checked ~ .mobile-select--radio-input::after {
        opacity: 1;
      }
    }
    &-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid var(--color-deep-cerulean);
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        opacity: 0;
        border-radius: 50%;
        background-color: var(--color-deep-cerulean);
        display: block;
      }
    }
  }
  &--inner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background: rgba($color: #000000, $alpha: 0.4);
  }
  &--block {
    position: absolute;
    background-color: var(--color-white);
    bottom: -100%;
    left: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
    transition: all 0.3s ease-in-out;
    -webkit-animation-duration: 0.2s;
    animation-duration: 0.2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    max-height: 464px;
    overflow-y: scroll;
    &.closed {
      animation-name: fadeOut;
    }
    &.opened {
      animation-name: fadeIn;
    }
  }
  &--header {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    padding: 20px 16px;
    border-bottom: 1px solid var(--color-seashell);
    position: sticky;
    top: 0;
    width: 100%;
    background-color: var(--color-white);
    border-radius: 20px 20px 0 0;
    z-index: 20;
    &::before {
      content: '';
      width: 28px;
      height: 2px;
      background-color: var(--color-secondary);
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &--item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 17px 16px;
    border-bottom: 1px solid var(--color-seashell);
  }
}
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 46px;
  line-height: 46px;
}

.custom-select .selected {
  background-color: var(--color-seashell);
  border-radius: 6px;
  color: var(--color-mine-shaft);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M14.2134 8.125L10.0754 12.2629L5.9375 8.125' stroke='black' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}
.custom-select .selected.open:after {
  transform: translateY(-50%) rotate(180deg);
}

.custom-select .items {
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  position: absolute;
  background-color: var(--color-white);
  color: var(--color-mine-shaft);
  left: 0;
  right: 0;
  z-index: 1;
  border: 1px solid var(--grey-2, #f1f1f1);
}

.custom-select .items div {
  color: var(--color-mine-shaft);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: var(--color-green);
  color: var(--color-white);
}

.selectHide {
  display: none;
}

.custom-select .items div:hover .select--item span {
  color: var(--color-white);
}
.custom-select .selected .select--item,
.custom-select .items .select--item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}
.custom-select .selected .select--item span,
.custom-select .items .select--item span {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--color-silver-chalice);
}
.custom-select .selected .select--item span {
  padding-right: 50px;
}
.custom-select .items .select--item span {
  padding-right: 20px;
}

@keyframes fadeIn {
  from {
    bottom: -100%;
  }

  to {
    bottom: 0;
  }
}
@keyframes fadeOut {
  from {
    bottom: 0;
  }

  to {
    bottom: -100%;
  }
}
</style>

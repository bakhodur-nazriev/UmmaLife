<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div v-for="(option, i) of options" :key="i" @click="handleClick(option)">
        {{ option }}
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
    }
  },
  data() {
    return {
      selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
      open: false
    }
  },
  methods: {
    handleClick(option) {
      this.selected = option
      this.open = false
      this.$emit('input', option)
    }
  },
  mounted() {
    this.$emit('input', this.selected)
  }
}
</script>

<style scoped>
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
</style>

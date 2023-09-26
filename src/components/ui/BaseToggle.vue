<template>
  <label class="switch">
    <input type="checkbox" :checked="isChecked" @change="changeHandler" />
    <span class="slider round"></span>
  </label>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
const emit = defineEmits(['update:isChecked'])
const props = defineProps({
  checked: Boolean,
  default: false
})
const isChecked = ref(props.checked)

const changeHandler = () => {
  isChecked.value = !isChecked.value
  emit('update:isChecked', isChecked.value)
}
</script>

<style lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-toggle);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: var(--color-white);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--color-hippie-blue);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--color-hippie-blue);
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

<template>
  <div class="library__options">
    <div class="library__options--list">
      <span>Шрифт</span>
      <div class="library__options--right">
        <BaseCustomSelect
          :options="fonts"
          :default="selectedFont"
          @input="(value) => handleChange('fontFamily', value)"
        />
      </div>
    </div>
    <div class="library__options--list">
      <span>Размер шрифта</span>
      <div class="library__options--right">
        <Slider
          :min="14"
          :max="40"
          v-model="fontSize"
          style="width: 100%"
          :step="1"
          @change="(value) => handleChange('fontSize', value)"
        />
        <span> {{ fontSize }}px </span>
      </div>
    </div>
    <div class="library__options--list">
      <span>Высота строк</span>
      <div class="library__options--right">
        <Slider
          :min="60"
          :max="400"
          v-model="lineHeight"
          style="width: 100%"
          :step="10"
          @change="(value) => handleChange('lineHeight', value)"
        />
        <span> {{ lineHeight / 100 }} </span>
      </div>
    </div>
    <div class="library__options--list">
      <span>Цвет фона</span>
      <div class="library__options--right">
        <div class="library__options--colors">
          <div class="library__options--colors-item" @click="handleChange('theme', 'white')">
            <div class="white"></div>
            <span>Белый</span>
          </div>
          <div class="library__options--colors-item" @click="handleChange('theme', 'yellow')">
            <div class="yellow"></div>
            <span>Сепия</span>
          </div>
          <div class="library__options--colors-item" @click="handleChange('theme', 'black')">
            <div class="black"></div>
            <span>Черный</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import Slider from 'primevue/slider'

import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'

const props = defineProps({
  menuOptions: Object
})

const emit = defineEmits(['handleEmit'])

const fontSize = ref(props.menuOptions.fontSize)
const lineHeight = ref(props.menuOptions.lineHeight)
const fonts = ref(['inherit', 'Arial', 'Roboto'])
const selectedFont = ref(props.menuOptions.fontFamily)

const handleChange = (key, value) => {
  const changedMenuOptions = {
    ...props.menuOptions,
    [key]: value
  }
  emit('handleEmit', changedMenuOptions)
}
</script>

<style lang="scss">
.library__options {
  position: absolute;
  top: calc(100% + 40px);
  right: 0;
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  width: 437px;
  padding: 24px;
  color: var(--color-mine-shaft);
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 50;
  @media (max-width: 767px) {
    width: calc(100vw - 32px);
    border-radius: 12px;
    top: calc(100% + 12px);
  }
  &--right {
    position: relative;
    @media (max-width: 767px) {
      width: 100%;
    }
    .p-slider {
      margin-top: 15px;
    }
    .p-slider-range {
      background-color: transparent;
      border-radius: 2px;
    }
    .p-slider.p-slider-horizontal {
      height: 4px;
      border-radius: 2px;
    }
    .p-slider-handle {
      background-color: var(--color-hippie-blue);
      border-color: var(--color-hippie-blue);
      width: 10px;
      height: 10px;
      margin-top: -5px !important;
      margin-left: -5px !important;
    }
    span {
      margin-top: 5px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
      display: block;
    }
  }
  &--list {
    display: grid;
    grid-template-columns: 125px 1fr;
    gap: 16px;
    align-items: center;
    @media (max-width: 767px) {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
      & > span {
        width: 100%;
      }
    }
    & > span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  &--colors {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    &-item {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;
      & > span {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-secondary);
      }
      & > div {
        border-radius: 8px;
        border: 1px solid transparent;
        height: 40px;
        width: 100%;
        cursor: pointer;
        &.white {
          border-color: var(--color-seashell);
          background-color: var(--color-white);
        }
        &.yellow {
          background-color: var(--color-light-yellow);
        }
        &.black {
          background-color: var(--color-light-black);
        }
      }
    }
  }
}
</style>

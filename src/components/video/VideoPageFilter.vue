<template>
  <div class="video__filter">
    <div class="muvi__mobile--nav white" v-if="width < 767">
      <div class="library__actions--btn"></div>
      <div class="muvi__mobile--nav-title">{{ $t('video.parameters.title') }}</div>
      <div class="left close" @click="emit('closeHandler')"><CloseIcon /></div>
    </div>
    <div class="video__filter--title" v-else>{{ $t('video.parameters.title') }}</div>
    <ul class="video__filter--wrapper">
      <li class="video__filter--list">
        <div class="video__filter--list-title">{{ $t('video.parameters.category') }}</div>
        <BaseCustomSelect :options="['All', 'Drama', 'Comedy']" :default="'All'" />
      </li>
      <li class="video__filter--list">
        <div class="video__filter--list-title">{{ $t('video.parameters.year') }}</div>
        <BaseCustomSelect :options="['All', '2023', '2022']" :default="'All'" />
      </li>
      <li class="video__filter--list">
        <div class="video__filter--list-title">{{ $t('video.parameters.genre') }}</div>
        <BaseCustomSelect :options="['All', 'Drama', 'Comedy']" :default="'All'" />
      </li>
      <li class="video__filter--list">
        <div class="video__filter--list-title">{{ $t('video.parameters.country') }}</div>
        <BaseCustomSelect :options="['All', 'Turkey', 'USA']" :default="'All'" />
      </li>
    </ul>
    <div class="video__filter--btn" v-if="width < 767">
      <SampleButton width="100%" title="Save" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import { useWindowSize } from '@vueuse/core'
import CloseIcon from '../icons/CloseIcon.vue'

const { width } = useWindowSize()

const emit = defineEmits(['closeHandler'])
</script>

<style lang="scss" scoped>
.video__filter {
  background-color: var(--color-white);
  height: fit-content;
  padding: 28px;
  border-radius: 20px;
  position: sticky;
  top: 16px;
  &.mobile-active {
    position: fixed;
    min-height: 100dvh;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
    z-index: 50;
    padding: 0;
    border-radius: 0;
  }
  @media (max-width: 767px) {
    display: none;
  }
  &--title {
    font-size: 20px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 30px;
  }
  &--wrapper {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    @media (max-width: 767px) {
      padding: 20px 16px;
    }
  }
  &--list {
    &-title {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 8px;
    }
  }
  .left {
    color: var(--color-hippie-blue);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &--btn {
    width: calc(100% - 32px);
    position: fixed;
    bottom: 20px;
    left: 16px;
  }
}
</style>

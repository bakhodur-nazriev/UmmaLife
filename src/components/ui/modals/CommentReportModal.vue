<template>
  <div class="report_modal" v-on-click-outside="() => emit('modalClose')">
    <div class="report_modal--block">
      <SuccessIcon class="report_modal--icon" />
      <div class="report_modal--title">{{ $t('report_comment.title') }}</div>
      <div class="report_modal--text">{{ $t('report_comment.text') }}</div>
      <SampleButton
        :title="$t('report_comment.ok')"
        width="100%"
        :size="14"
        padding="13px"
        @click="emit('modalClose')"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
import SuccessIcon from '@/components/icons/SuccessIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

const emit = defineEmits(['modalClose'])
</script>

<style lang="scss">
.report_modal {
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.3);
  &--block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 374px;
    min-height: 244px;
    background-color: var(--color-white);
    border-radius: 20px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  &--icon {
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
  }
  &--title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 16px;
  }
  &--text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    color: var(--color-secondary);
    margin-bottom: 20px;
  }
}
</style>

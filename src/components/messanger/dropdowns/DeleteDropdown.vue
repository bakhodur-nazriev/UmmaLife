<template>
  <dropdown-parent v-on-click-outside="() => emit('handleClickOutside')" class="delete-dropdown">
    <div class="drop__list clear" @click="emit('clearChat')">
      <ClearIcon />
      <span>{{ $t('modal.clear_history') }}</span>
    </div>
    <sample-divider />
    <div class="drop__list" @click="emit('handleDeleteChat')">
      <delete-icon />
      <span>{{ $t('dropdown.delete_dialog') }}</span>
    </div>
  </dropdown-parent>
</template>

<script setup>
import DropdownParent from '@/components/messanger/dropdowns/DropdownParent.vue'
import DeleteIcon from '@/components/icons/message/DeleteIcon.vue'
import ClearIcon from '@/components/icons/ClearIcon.vue'
import { vOnClickOutside } from '@vueuse/components'
import SampleDivider from '@/components/ui/SampleDivider.vue'
/* eslint-disable */
const emit = defineEmits(['handleClickOutside', 'handleDeleteChat', 'clearChat'])
</script>

<style scoped lang="scss">
.delete-dropdown {
  position: absolute;
  top: 51px;
  right: 8px;
  @media (max-width: 767px) {
    right: 8px;
  }
  .drop__list {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
    transition: all 0.3s;
    &.clear {
      color: var(--color-silver-chalice);
      span {
        color: var(--color-mine-shaft);
        font-weight: 400;
      }
    }
    &:hover {
      background-color: var(--color-seashell);
    }
    span {
      color: var(--color-valencia);
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    svg {
      width: 20px;
      height: 20px;
      display: block;
    }
  }
}
</style>

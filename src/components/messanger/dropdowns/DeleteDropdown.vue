<template>
  <dropdown-parent v-on-click-outside="closeDropdown" class="delete-dropdown">
    <div class="drop__list">
      <delete-icon />
      <span>Удалить диалог</span>
    </div>
  </dropdown-parent>
</template>

<script setup>
import DropdownParent from '@/components/messanger/dropdowns/DropdownParent.vue'
import DeleteIcon from '@/components/icons/message/DeleteIcon.vue'
import { vOnClickOutside } from '@vueuse/components'
/* eslint-disable */
const emit = defineEmits(['handleClickOutside'])

const closeDropdown = () => {
  emit('handleClickOutside')
}
</script>

<style scoped lang="scss">
.delete-dropdown{
  position: absolute;
  top: 51px;
    right: 69px;
  .drop__list{
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
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

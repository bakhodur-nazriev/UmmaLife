<template>
  <KeepAlive>
    <dropdown-parent
      class="context-menu"
      :style="{
        ...contextMenuPosition,
        opacity: isContextMenuOpen ? '1' : '0',
        zIndex: isContextMenuOpen ? '10' : '-1'
      }"
      tabindex="0"
      v-on-click-outside="close"
    >
      <div class="drop__list--parent">
        <div class="drop__list" @click="emit('replyMessage')">
          <ForwardIcon />
          <span>{{ $t('dropdown.answer') }}</span>
        </div>
        <sample-divider />
        <div class="drop__list" @click="emit('copyClipboard')">
          <CopyTextIcon />
          <span>{{ $t('dropdown.copy_text') }}</span>
        </div>
        <template v-if="isOwner">
          <sample-divider />
          <div class="drop__list" @click="emit('editMessage')">
            <EditIcon class="edit" />
            <span>{{ $t('dropdown.change') }}</span>
          </div>
        </template>

        <template v-if="isOwner">
          <sample-divider />
          <div class="drop__list delete" @click="emit('deleteMessage')">
            <DeleteIcon />
            <span>{{ $t('settings.restore.delete') }}</span>
          </div>
        </template>
      </div>
    </dropdown-parent>
  </KeepAlive>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'

import DropdownParent from '@/components/messanger/dropdowns/DropdownParent.vue'
import DeleteIcon from '@/components/icons/message/DeleteIcon.vue'
import CopyTextIcon from '@/components/icons/message/CopyTextIcon.vue'
import EditIcon from '@/components/icons/message/EditIcon.vue'
import ForwardIcon from '@/components/icons/message/ForwardIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'

const props = defineProps({
  contextMenuPosition: Object,
  isContextMenuOpen: Boolean,
  isOwner: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'replyMessage', 'editMessage', 'deleteMessage', 'copyClipboard'])

const close = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  z-index: 10;
  outline: none;
  display: block;
}
.drop__list {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 5px;
  cursor: pointer;
  font-weight: 400;
  position: relative;
  min-height: 30px;
  transition: all 0.3s;
  border-radius: 10px;
  &--parent {
    padding: 0 5px;
  }
  &:hover {
    background: var(--color-gallery-first);
  }
  &:first-child {
    padding-top: 5px;
  }
  &:last-child {
    padding-bottom: 5px;
  }
  &.delete {
    color: var(--color-valencia);
  }
  span {
    color: var(--color-mine-shaft);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  svg {
    width: 20px;
    height: 20px;
    display: block;
    &.edit {
      width: 14px !important;
      height: 14px !important;
      margin-right: 3px;
      margin-left: 3px;
    }
  }
}
</style>

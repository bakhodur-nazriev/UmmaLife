<template>
  <dropdown-parent v-on-click-outside="closeDropdown">
    <div class="drop__list">
      <ForwardIcon />
      <span>Ответить</span>
    </div>
    <div class="drop__list">
      <EditIcon class="edit" />
      <span>Изменить</span>
    </div>
    <div class="drop__list">
      <CopyTextIcon />
      <span>Копировать текст</span>
    </div>
    <div class="drop__list">
      <ChooseIcon />
      <span>Выбрать</span>
    </div>
    <div class="drop__list delete">
      <DeleteIcon />
      <span>Удалить диалог</span>
    </div>
  </dropdown-parent>
</template>

<script setup>
/* eslint-disable */
import DropdownParent from "@/components/messanger/dropdowns/DropdownParent.vue";
import DeleteIcon from "@/components/icons/message/DeleteIcon.vue";
import ChooseIcon from "@/components/icons/message/ChooseIcon.vue";
import CopyTextIcon from "@/components/icons/message/CopyTextIcon.vue";
// eslint-disable-next-line
import EditIcon from "@/components/icons/message/EditIcon.vue";
import ForwardIcon from "@/components/icons/message/ForwardIcon.vue";

import { vOnClickOutside } from "@vueuse/components";
/* eslint-disable */
const emit = defineEmits(["handleClickOutside"]);

const closeDropdown = () => {
  emit("handleClickOutside");
};
</script>

<style scoped lang="scss">
.drop__list {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--color-alto-second);
  padding: 11px 0;
  cursor: pointer;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
  &.delete {
    color: var(--color-valencia);
  }
  span {
    color: var(--color-mine-shaft);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
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
.messanger-dropdown{
  position: absolute;
  z-index: 10;
  &.recieve{
    right: -180px;
    top: -10px;
  }
  &.send {
    left: -180px;
    top: -10px;
  }
}
</style>

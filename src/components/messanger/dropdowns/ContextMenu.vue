<template>
  <dropdown-parent class="context-menu" :style="style" tabindex="0" @blur="close">
    <div class="drop__list">
      <ForwardIcon />
      <span>{{ $t('dropdown.answer') }}</span>
    </div>
    <div class="drop__list">
      <EditIcon class="edit" />
      <span>{{ $t('dropdown.change') }}</span>
    </div>
    <div class="drop__list">
      <CopyTextIcon />
      <span>{{ $t('dropdown.copy_text') }}</span>
    </div>
    <div class="drop__list">
      <ChooseIcon />
      <span>{{ $t('dropdown.select') }}</span>
    </div>
    <div class="drop__list delete">
      <DeleteIcon />
      <span>{{ $t('dropdown.delete_dialog') }}</span>
    </div>
  </dropdown-parent>
</template>

<script>
import DropdownParent from '@/components/messanger/dropdowns/DropdownParent.vue'
import DeleteIcon from '@/components/icons/message/DeleteIcon.vue'
import ChooseIcon from '@/components/icons/message/ChooseIcon.vue'
import CopyTextIcon from '@/components/icons/message/CopyTextIcon.vue'
import EditIcon from '@/components/icons/message/EditIcon.vue'
import ForwardIcon from '@/components/icons/message/ForwardIcon.vue'

export default {
  components: { DropdownParent, DeleteIcon, ChooseIcon, CopyTextIcon, EditIcon, ForwardIcon },
  emits: ['close', 'open'],
  data() {
    return {
      left: 0,
      top: 0
    }
  },
  computed: {
    style() {
      return {
        top: this.top + 'px',
        left: this.left + 'px'
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.left = 0
      this.top = 0
    },
    open(evt) {
      this.left = evt.pageX || evt.clientX
      this.top = evt.pageY || evt.clientY
      this.$nextTick(() => this.$el.focus())

      this.$emit('open')
    }
  }
}
</script>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  z-index: 10;
  outline: none;
}
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
</style>

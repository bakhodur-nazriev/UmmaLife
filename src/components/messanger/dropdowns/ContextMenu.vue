<template>
  <dropdown-parent class="context-menu" :style="style" tabindex="0" @blur="close">
    <div class="drop__list--parent">
      <div class="drop__list" @click="$emit('shareMessage')">
        <ForwardIcon />
        <span>{{ $t('dropdown.answer') }}</span>
      </div>
      <sample-divider />
      <div class="drop__list" @click="$emit('editMessage')">
        <EditIcon class="edit" />
        <span>{{ $t('dropdown.change') }}</span>
      </div>
      <sample-divider />
      <div class="drop__list">
        <CopyTextIcon />
        <span>{{ $t('dropdown.copy_text') }}</span>
      </div>
      <sample-divider />
      <div class="drop__list">
        <ChooseIcon />
        <span>{{ $t('dropdown.select') }}</span>
      </div>
      <sample-divider />
      <div class="drop__list delete" @click="$emit('deleteMessage')">
        <DeleteIcon />
        <span>{{ $t('dropdown.delete_dialog') }}</span>
      </div>
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
import SampleDivider from '@/components/ui/SampleDivider.vue'

export default {
  components: {
    DropdownParent,
    DeleteIcon,
    ChooseIcon,
    CopyTextIcon,
    EditIcon,
    ForwardIcon,
    SampleDivider
  },
  emits: ['close', 'open', 'shareMessage', 'editMessage', 'deleteMessage'],
  data () {
    return {
      left: 0,
      top: 0
    }
  },
  computed: {
    style () {
      return {
        top: this.top + 'px',
        left: this.left + 'px'
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.left = 0
      this.top = 0
    },
    open (evt) {
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
  padding: 5px;
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

<template>
  <label class="checkbox">
    <input class="checkbox__input visually-hidden" type="checkbox" :name="name">
    <span class="checkbox__icon">
      <check-mark-icon/>
    </span>
    <span>
      <slot/>
    </span>
  </label>
</template>

<script>
import CheckMarkIcon from '@/components/icons/ChekMarkIcon.vue'
export default {
  components: {
    CheckMarkIcon
  },
  props: ['name']
}
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkbox__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #F1F1F1;
  border-radius: 2px;
  color: transparent;
  transition: 0.3s;
}

.checkbox__input:checked+.checkbox__icon {
  background: #49A399;
  color: white;
}
</style>

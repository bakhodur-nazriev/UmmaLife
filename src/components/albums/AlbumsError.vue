<template>
  <div class="albums__error">
    <AlertIcon />
    <div class="albums__error--text">
      <span>Ошибка загрузки:</span>
      Неподдерживаемый формат файла
    </div>
  </div>
</template>

<script>
import AlertIcon from '@/components/icons/AlertIcon.vue'

export default {
  components: { AlertIcon }
}
</script>

<style lang="scss" scoped>
.albums__error {
  position: fixed;
  bottom: 20px;
  left: 250px;
  background-color: var(--color-valencia);
  padding: 12px;
  border-radius: 14px;
  display: flex;
  gap: 8px;
  svg {
    width: 24px;
    height: 24px;
  }
  &--text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    color: var(--color-white);
    span {
      display: block;
    }
  }
}
</style>

<template>
  <div class="room__empty">
    <span>{{ $t('chat.empty_room') }}</span>
  </div>
</template>

<style lang="scss" scoped>
.room__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
  }
}
</style>

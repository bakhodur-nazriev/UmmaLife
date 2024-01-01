<template>
  <Transition name="popup-slide">
    <div v-if="show" class="popup">
      <div class="popup-content">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.popup-slide-enter-active {
  transition: opacity 0.5s ease;
}

.popup-slide-enter {
  transform: translateY(-100%);
  transition: opacity 0.5s ease;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  &-content {
    background-color: var(--color-hippie-blue);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
    color: var(--color-white);
  }
}
</style>

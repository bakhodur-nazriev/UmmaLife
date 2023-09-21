<template>
  <div class="settings__info">
    <div class="settings__info--wrapper">
      <div class="settings__info--icon">
        <slot name="icon" />
      </div>
      <div class="settings__info--info">
        <div class="settings__info--title"><slot name="title" /></div>
        <div class="settings__info--text">
          <slot name="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings__info {
  padding: 16px;
  background-color: var(--color-white);
  border-radius: 16px;
  margin-bottom: 8px;
  &--wrapper {
    display: flex;
    gap: 16px;
  }
  &--title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 8px;
  }
  &--text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: var(--color-secondary);
  }
  &--icon {
    width: 40px;
  }
}
</style>

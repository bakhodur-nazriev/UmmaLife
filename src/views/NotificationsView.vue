<template>
  <div class="groups__container">
    <div class="groups__wrapper">
      <div class="groups__content">
        <div class="groups__content--inner">
          <NotificationContainer :main="true" />
        </div>
      </div>
      <GroupsSidebar v-if="width > 767" />
    </div>
  </div>
</template>

<script setup>
import GroupsSidebar from '@/components/groups/GroupsSidebar.vue'
import NotificationContainer from '@/components/notification/NotificationContainer.vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
</script>

<style lang="scss" scoped>
.groups__wrapper {
  display: grid;
  grid-template-columns: 1fr 411px;
  gap: 20px;
  padding: 24px 45px;
  @media (max-width: 767px) {
    padding: 0;
  }
}
.groups__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  &--inner {
    max-width: 700px;
    width: 100%;
    margin-left: 145px;
    @media (max-width: 1635px) {
      margin-left: 50px;
    }
    @media (max-width: 1535px) {
      margin-left: 0;
    }
  }
}
</style>

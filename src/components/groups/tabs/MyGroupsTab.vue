<template>
  <GroupsCardContainer>
    <div class="mygroup__top">
      <div class="mygroup__top--tabs">
        <button
          class="mygroup__top--btn"
          @click="(isActive[0] = true), (isActive[1] = false)"
          :class="{ active: isActive[0] }"
        >
          Все
        </button>
        <button
          class="mygroup__top--btn"
          @click="(isActive[1] = true), (isActive[0] = false)"
          :class="{ active: isActive[1] }"
        >
          Созданные
        </button>
      </div>
      <button class="mygroup__top--create" @click="$emit('openCreate')">
        <PlusIcon />
        <span>Создать сообщество</span>
      </button>
    </div>
    <template v-if="isActive[0]">
      <GroupsCard v-for="group in groups" :key="group.id" :group="group" />
      <GroupsCard v-for="group in groups" :key="group.id" :group="group" />
      <GroupsCard v-for="group in groups" :key="group.id" :group="group" />
    </template>
    <template v-if="isActive[1]">
      <GroupsCard v-for="group in groups" :key="group.id" :group="group" />
      <GroupsCard v-for="group in groups" :key="group.id" :group="group" />
    </template>
  </GroupsCardContainer>
</template>

<script>
import GroupsCardContainer from '@/components/groups/ui/GroupsCardContainer.vue'
import GroupsCard from '@/components/groups/ui/GroupsCard.vue'

import { groups } from '@/dummy.js'
import PlusIcon from '../../icons/PlusIcon.vue'

export default {
  components: { GroupsCardContainer, GroupsCard, PlusIcon },
  emits: ['openCreate'],
  data() {
    return {
      groups,
      isActive: [true, false]
    }
  }
}
</script>

<style lang="scss" scoped>
.mygroup__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-gallery-first);
  &--tabs {
    display: flex;
    gap: 8px;
  }
  &--btn {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
    background: transparent;
    padding: 13px 23px;
    &.active {
      background: var(--color-seashell);
    }
  }
  &--create {
    padding: 13px 23px;
    background: var(--color-green);
    color: var(--color-white);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 10px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>

<template>
  <li
    class="muvi__add--list"
    @click="isDropdownOpen = !isDropdownOpen"
    v-on-click-outside="() => (isDropdownOpen = false)"
  >
    <div class="muvi__add--list-parent">
      <p><LockIcon /> Who can view this MUVI</p>
      <div class="muvi__add--selected" v-if="selectedOption">
        {{ selectedOption.name }}
      </div>
    </div>
    <ArrowDownIcon class="arrow" :class="{ open: isDropdownOpen }" />

    <div class="muvi__add--dropdown" v-if="isDropdownOpen" @click.stop>
      <div
        class="muvi__add--dropdown-list"
        v-for="(option, index) in options"
        :key="option.id"
        @click="handleSelect(index)"
      >
        <div class="muvi__add--dropdown-left">
          <div class="muvi__add--dropdown-top">
            <component :is="option.icon" /> <span>{{ option.name }}</span>
          </div>
          <div class="muvi__add--dropdown-text">{{ option.text }}</div>
        </div>
        <CustomRadio :isSelected="option.isSelected" />
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import LockIcon from '@/components/icons/shorts/LockIcon.vue'
import ArrowDownIcon from '@/components/icons/shorts/ArrowDownIcon.vue'
import CustomRadio from '@/components/ui/CustomRadio.vue'
import AvailableAllIcon from '@/components/icons/shorts/AvailableAllIcon.vue'
import SubscribesOnlyIcon from '@/components/icons/shorts/SubscribesOnlyIcon.vue'
import SubscriptionsOnlyIcon from '@/components/icons/shorts/SubscriptionsOnlyIcon.vue'

const isDropdownOpen = ref(false)
const options = ref([
  {
    id: 1,
    isSelected: true,
    name: 'Available to all',
    text: 'In Umma Life and beyond.',
    icon: 'available-all-icon'
  },
  {
    id: 2,
    isSelected: false,
    name: 'Subscribers only',
    text: 'Your subscribers to Umma Life',
    icon: 'subscribes-only-icon'
  },
  {
    id: 3,
    isSelected: false,
    name: 'Subscriptions only',
    text: 'Your subscriptions to Umma Life',
    icon: 'subscriptions-only-icon'
  }
])

const selectedOption = ref(options.value[0])

const handleSelect = (index) => {
  options.value.forEach((option) => (option.isSelected = false))
  options.value[index].isSelected = true
  selectedOption.value = options.value[index]
}
</script>

<script>
export default {
  components: { AvailableAllIcon, SubscribesOnlyIcon, SubscriptionsOnlyIcon }
}
</script>

<style lang="scss" scoped>
.muvi__add {
  &--dropdown {
    position: absolute;
    top: calc(100% + 6px);
    background-color: var(--color-white);
    padding: 16px;
    z-index: 10;
    width: 100%;
    left: 0;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      user-select: none;
      background-color: var(--color-seashell);
      padding: 16px 20px;
      border-radius: 8px;
    }
    &-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 9px;
      svg {
        width: 16px;
        height: 16px;
      }
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(-color-mine-shaft);
      }
    }
    &-text {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
  }
  &--selected {
    margin-top: 8px;
    padding-left: 28px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-secondary);
  }
  &--inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
</style>

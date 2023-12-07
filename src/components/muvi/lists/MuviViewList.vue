<template>
  <li
    class="muvi__add--list"
    @click="isDropdownOpen = !isDropdownOpen"
    v-on-click-outside="() => (isDropdownOpen = false)"
    :class="{ 'menu-list': menu }"
  >
    <div class="muvi__add--list-parent">
      <p><LockIcon /> {{ menu ? $t('add_muvi.change_view') : $t('add_muvi.can_view') }}</p>
      <div class="muvi__add--selected" v-if="selectedOption">
        {{ $t(selectedOption.name) }}
      </div>
    </div>
    <ArrowDownIcon class="arrow" :class="{ open: isDropdownOpen }" />

    <div class="muvi__add--dropdown" v-if="isDropdownOpen" @click.stop>
      <div class="muvi__mobile--nav white">
        <button @click="isDropdownOpen = false" class="muvi__mobile--nav-btn">
          <ArrowLeftIcon />
        </button>
        <div class="muvi__mobile--nav-title">
          {{ menu ? $t('add_muvi.change_view') : $t('add_muvi.can_view') }}
        </div>
        <div class="left"></div>
      </div>
      <div
        class="muvi__add--dropdown-list"
        v-for="(option, index) in options"
        :key="option.id"
        @click="handleSelect(index)"
      >
        <div class="muvi__add--dropdown-left">
          <div class="muvi__add--dropdown-top">
            <component :is="option.icon" /> <span>{{ $t(option.name) }}</span>
          </div>
          <div class="muvi__add--dropdown-text">{{ $t(option.text) }}</div>
        </div>
        <CustomRadio :isSelected="option.isSelected" />
      </div>
      <div class="selected__option--action">
        <SampleButton
          :size="14"
          width="100%"
          :title="`${$t('add_muvi.done')}`"
          type="button"
          @click="isDropdownOpen = false"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import LockIcon from '@/components/icons/shorts/LockIcon.vue'
import ArrowDownIcon from '@/components/icons/shorts/ArrowDownIcon.vue'
import CustomRadio from '@/components/ui/CustomRadio.vue'
import AvailableAllIcon from '@/components/icons/shorts/AvailableAllIcon.vue'
import SubscribesOnlyIcon from '@/components/icons/shorts/SubscribesOnlyIcon.vue'
import SubscriptionsOnlyIcon from '@/components/icons/shorts/SubscriptionsOnlyIcon.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

const emit = defineEmits(['passSelectedOption'])
const props = defineProps({
  menu: {
    type: Boolean,
    default: false
  },
  selectedIndex: {
    type: Number,
    default: 0
  }
})

const isDropdownOpen = ref(false)
const options = ref([
  {
    id: 1,
    isSelected: true,
    name: 'add_muvi.views_options.name1',
    text: 'add_muvi.views_options.text1',
    icon: 'available-all-icon'
  },
  {
    id: 2,
    isSelected: false,
    name: 'add_muvi.views_options.name2',
    text: 'add_muvi.views_options.text2',
    icon: 'subscribes-only-icon'
  },
  {
    id: 3,
    isSelected: false,
    name: 'add_muvi.views_options.name3',
    text: 'add_muvi.views_options.text3',
    icon: 'subscriptions-only-icon'
  }
])

const selectedOption = ref(options.value[props.selectedIndex])

const handleSelect = (index) => {
  options.value.forEach((option) => (option.isSelected = false))
  options.value[index].isSelected = true
  selectedOption.value = options.value[index]
  emit('passSelectedOption', index)
  isDropdownOpen.value = false
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
    .muvi__mobile--nav {
      display: none;
      @media (max-width: 767px) {
        display: flex;
      }
    }
    @media (max-width: 767px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100dvh;
      padding: 0;
    }
    &-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      user-select: none;
      background-color: var(--color-seashell);
      padding: 16px 20px;
      border-radius: 8px;

      @media (max-width: 767px) {
        margin: 0 16px;
      }
    }
    &-left {
      width: calc(100% - 36px);
    }
    &-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 9px;
      color: var(--color-mine-shaft);
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
  &--list {
    &.menu-list {
      &:hover {
        background-color: var(--color-seashell);
      }
      background: transparent;
      border-bottom: 1px solid var(--color-seashell);
      .muvi__add--selected {
        padding-left: 0;
      }
      .muvi__add--dropdown {
        padding: 2px;
        gap: 5px;
        .muvi__add--dropdown-list {
          background-color: transparent;
          &:hover {
            background-color: var(--color-seashell);
          }
        }
      }
    }
  }
}
</style>

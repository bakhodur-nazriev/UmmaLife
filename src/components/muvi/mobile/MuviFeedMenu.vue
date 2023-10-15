<template>
  <div class="mobile-select-model">
    <div class="mobile-select--inner" v-if="isMenuOpen">
      <div
        class="mobile-select--block muvi__menu"
        :class="isMenuOpen && !className ? 'opened' : 'closed'"
        v-on-click-outside="handleClose"
      >
        <div class="mobile-select--header p-0" v-if="!isDropdownOpen"></div>
        <div class="mobile-select--header" v-else>Who is allowed to show your MUVI to?</div>

        <div class="session__modal--block muvi__menu--block" v-if="!isDropdownOpen">
          <div class="muvi__menu--list">
            <PlaybackIcon />
            <div class="muvi__menu--wrapper">
              <div class="muvi__menu--list-text">Playback speed:</div>
              <ul class="muvi__menu--list-speed">
                <li
                  v-for="speed in playbackSpeeds"
                  :key="speed"
                  :class="{ active: speed === selectedSpeed }"
                  @click="handleSpeedSelect(speed)"
                >
                  {{ speed }}
                </li>
              </ul>
            </div>
          </div>
          <div class="muvi__menu--list">
            <EditIcon />
            <div class="muvi__menu--list-text">Edit description</div>
          </div>
          <div class="muvi__menu--list" @click="isDropdownOpen = true">
            <VisibleIcon />
            <div class="muvi__menu--wrapper">
              <div class="muvi__menu--list-text">Change the visibility of MUVI</div>
              <div class="muvi__menu--list-visible">{{ selectedOption.name }}</div>
            </div>
          </div>
          <div class="muvi__menu--list">
            <CommentsIcon />
            <div class="muvi__menu--list-text">Disable comments</div>
          </div>
          <div class="muvi__menu--list delete">
            <DeleteIcon />
            <div class="muvi__menu--list-text">Delete MUVI</div>
          </div>
        </div>
        <div class="muvi__menu--block" v-else>
          <div
            class="muvi__menu--list selecttion"
            v-for="(option, index) in options"
            :key="option.id"
            @click="handleSelect(index)"
          >
            <div class="muvi__add--dropdown-left">
              <div class="muvi__add--dropdown-top">
                <component :is="option.icon" /> <span>{{ option.name }}</span>
              </div>
              <div class="muvi__menu--list-visible">{{ option.text }}</div>
            </div>
            <CustomRadio :isSelected="option.isSelected" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import PlaybackIcon from '@/components/icons/shorts/mobile/PlaybackIcon.vue'
import EditIcon from '@/components/icons/shorts/mobile/EditIcon.vue'
import VisibleIcon from '@/components/icons/shorts/mobile/VisibleIcon.vue'
import CommentsIcon from '@/components/icons/shorts/mobile/CommentsIcon.vue'
import DeleteIcon from '@/components/icons/shorts/mobile/DeleteIcon.vue'
import AvailableAllIcon from '@/components/icons/shorts/AvailableAllIcon.vue'
import SubscribesOnlyIcon from '@/components/icons/shorts/SubscribesOnlyIcon.vue'
import SubscriptionsOnlyIcon from '@/components/icons/shorts/SubscriptionsOnlyIcon.vue'
import CustomRadio from '@/components/ui/CustomRadio.vue'

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeMenu'])

const className = ref(false)
const selectedSpeed = ref('1x')
const playbackSpeeds = ref(['1x', '1,25x', '1,75x', '2x'])

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

const handleClose = () => {
  className.value = true
  setTimeout(() => {
    emit('closeMenu')
    className.value = false
  }, 100)
}

const handleSpeedSelect = (speed) => {
  selectedSpeed.value = speed
}
const handleSelect = (index) => {
  options.value.forEach((option) => (option.isSelected = false))
  options.value[index].isSelected = true
  selectedOption.value = options.value[index]
  isDropdownOpen.value = false
}
</script>

<script>
export default {
  components: { AvailableAllIcon, SubscribesOnlyIcon, SubscriptionsOnlyIcon }
}
</script>

<style lang="scss" scoped>
.muvi__menu {
  &--block {
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &--list {
    padding: 16px 20px;
    border-radius: 12px;
    background: var(--color-seashell);
    display: flex;
    align-items: flex-start;
    gap: 12px;
    &.selecttion {
      justify-content: space-between;
      align-items: center;
      .muvi__add--dropdown-top {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
    &-text {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &-speed {
      margin: 0;
      padding: 0;
      padding-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      list-style: none;
      li {
        padding: 8px;
        border-radius: 6px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
        &.active {
          background-color: var(--color-hippie-blue);
          color: var(--color-white);
        }
      }
    }
    &-visible {
      margin-top: 8px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    &.delete {
      color: var(--color-valencia);
      .muvi__menu--list-text {
        color: var(--color-valencia);
      }
    }
  }
}
</style>

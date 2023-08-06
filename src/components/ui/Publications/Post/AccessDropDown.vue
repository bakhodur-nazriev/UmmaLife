<template>
  <div class="dropdown">
    <button type="button" class="dropdown__toggle" @click="toggleDropdown">
      <AccessIcon class="access__icon"/>
      <span>{{ selectedTitle }}</span>
      <DropdownIcon/>
    </button>

    <Transition name="fade">
      <ul v-if="isOpen" class="dropdown__list">
        <li
          v-for="(item, index) in dropdownItems"
          :key="item.id"
        >
          <div @click="selectItem(item)" class="dropdown__item">
            <component :is="item.icon"/>
            <span class="dropdown__item--title">{{ item.title }}</span>
          </div>
          <SampleDivider class="access-item__divider"/>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script>
import AccessIcon from '@/components/icons/news/AccessIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import ToWhomImSubscribeIcon from '@/components/icons/news/ToWhomImSubscribeIcon.vue'
import WhoIsFollowMeIcon from '@/components/icons/news/WhoIsFollowMeIcon.vue'
import AnonymousIcon from '@/components/icons/news/AnonymousIcon.vue'

export default {
  components: {
    AnonymousIcon,
    WhoIsFollowMeIcon,
    ToWhomImSubscribeIcon,
    SampleDivider,
    DropdownIcon,
    AccessIcon
  },
  data() {
    return {
      isOpen: false,
      selectedItemId: null,
      items: [
        {
          id: 1,
          title: this.$t('buttons.available_everyone'),
          icon: 'AccessIcon'
        },
        {
          id: 2,
          title: this.$t('buttons.who_am_i_following'),
          icon: 'ToWhomImSubscribeIcon'
        },
        {
          id: 3,
          title: this.$t('buttons.who_is_following_me'),
          icon: 'WhoIsFollowMeIcon'
        },
        {
          id: 4,
          title: this.$t('buttons.anonymously'),
          icon: 'AnonymousIcon'
        }
      ],
      icons: {
        AccessIcon,
        ToWhomImSubscribeIcon,
        WhoIsFollowMeIcon,
        AnonymousIcon
      }
    }
  },
  mounted() {
    this.selectedItemId = this.items.length > 0 ? this.items[0].id : null
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectItem(item) {
      this.selectedItemId = item.id
      this.isOpen = false
    }
  },
  computed: {
    selectedTitle() {
      const selectedItem = this.dropdownItems.find(
        item => item.id === this.selectedItemId
      )
      if (selectedItem) {
        return selectedItem.title
      }
      return ''
    },
    dropdownItems() {
      return this.items.map(item => ({
        ...item,
        icon: this.icons[item.icon]
      }))
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active {
  animation: scale-up-top .2s;
}

.fade-leave-active {
  animation: scale-up-top .2s reverse;
}

@keyframes scale-up-top {
  0% {
    transform:scale(.5);
    transform-origin:center top
  }
  100% {
    transform:scale(1);
    transform-origin:center top
  }
}

.access-item__divider {
  width: 92%;
  margin: 2px auto;
}

.access__icon {
  color: var(--color-silver-chalice)
}

.left__side--item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  .dropdown__item-icon {
  }
}

.dropdown {
  position: relative;
  background-color: var(--color-white);
  z-index: 10;

  &__list {
    list-style: none;
    margin: 0;
    font-size: 16px;
    box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.10);
    background-color: var(--color-white);
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    top: 32px;
    left: -32px;
    z-index: 10;
    width: 230px;
  }
}

.dropdown__toggle {
  padding: 0;
  border: none;
  font-size: 16px;
  display: flex;
  gap: 8px;
  color: var(--color-silver-chalice);
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  width: max-content;
  cursor: pointer;
  margin: 0;
}

.dropdown__toggle svg {
  fill: var(--color-silver-chalice);
}

.dropdown__item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 10px;
  position: relative;

  &:hover {
    transition: all 0.15s ease-in-out;
    background-color: var(--color-seashell);
  }
}
</style>

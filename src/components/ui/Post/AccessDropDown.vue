<template>
  <div class="dropdown">
    <button type="button" class="dropdown__toggle" @click="toggleDropdown">
      <access-icon />
      <span>{{ selectedTitle }}</span>
      <dropdown-icon />
    </button>

    <ul v-if="isOpen" class="dropdown__list">
      <li
        v-for="item in dropdownItems"
        class="dropdown__item"
        :key="item.id"
        @click="selectItem(item)"
      >
        <div class="left__side--item">
          <span class="dropdown__item-icon">
            <component :is="item.icon" />
          </span>
          <span class="dropdown__item--title">{{ item.title }}</span>
        </div>
        <sample-divider />
      </li>
    </ul>
  </div>
</template>

<script>
import AccessIcon from '@/components/icons/news/AccessIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import ToWhomImSubscribeIcon from '@/components/icons/news/ToWhomImSubscribeIcon.vue'
import WhoIsFollowMeIcon from '@/components/icons/news/WhoIsFollowMeIcon.vue'
import AnonymIcon from '@/components/icons/news/AnonymIcon.vue'

export default {
  components: {
    AnonymIcon,
    WhoIsFollowMeIcon,
    ToWhomImSubscribeIcon,
    SampleDivider,
    DropdownIcon,
    AccessIcon
  },
  data () {
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
          icon: 'AnonymIcon'
        }
      ],
      icons: {
        AccessIcon,
        ToWhomImSubscribeIcon,
        WhoIsFollowMeIcon,
        AnonymIcon
      }
    }
  },
  mounted () {
    this.selectedItemId = this.items.length > 0 ? this.items[0].id : null
  },
  methods: {
    toggleDropdown () {
      this.isOpen = !this.isOpen
    },
    selectItem (item) {
      this.selectedItemId = item.id
      this.isOpen = false
    }
  },
  computed: {
    selectedTitle () {
      const selectedItem = this.dropdownItems.find(
        item => item.id === this.selectedItemId
      )
      if (selectedItem) {
        return selectedItem.title
      }
      return ''
    },
    dropdownItems () {
      return this.items.map(item => ({
        ...item,
        icon: this.icons[item.icon]
      }))
    }
  }
}
</script>

<style scoped>
.left__side--item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.dropdown {
  width: 220px;
  position: absolute;
  padding: 10px;
  top: -100px;
  left: 0;
  border-radius: 10px;
  background-color: var(--color-white);
  z-index: 10;
}

.dropdown__list {
  list-style: none;
  margin: 0;
  font-size: 16px;
  padding: 0;
}

.dropdown__toggle {
  padding: 0;
  border: none;
  font-size: 16px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  width: max-content;
  cursor: pointer;
}

.dropdown__item {
  display: flex;
  align-items: start;
  flex-direction: column;
}
</style>

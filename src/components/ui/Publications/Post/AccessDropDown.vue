<template>
  <div class="dropdown">
    <button type="button" class="dropdown__toggle" @click="toggleDropdown">
      <AccessIcon class="access__icon"/>
      <span>{{ selectedTitle }}</span>
      <DropdownIcon/>
    </button>

    <Transition name="fade">
      <div v-if="isOpen" class="dropdown__list">
        <div class="first__section">
          <SampleRadio :index="0">
            {{ $t('buttons.available_everyone') }}
          </SampleRadio>
          <SampleRadio :index="1">
            {{ $t('buttons.only_sisters') }}
          </SampleRadio>
        </div>
        <div class="second__section">
          <CheckBox
            name="only_subscribers"
            color="primary"
            text-size="small"
            size="small"
          >
            {{ $t('buttons.only_subscribers') }}
          </CheckBox>

          <CheckBox name="anonymously" color="primary" text-size="small" size="small">
            {{ $t('buttons.anonymously') }}
          </CheckBox>
        </div>
        <div class="third__section">
          <button type="button" class="exclude-button">{{ $t('buttons.exclude') }}</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import AccessIcon from '@/components/icons/news/AccessIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import ToWhomImSubscribeIcon from '@/components/icons/news/ToWhomImSubscribeIcon.vue'
import WhoIsFollowMeIcon from '@/components/icons/news/WhoIsFollowMeIcon.vue'
import AnonymousIcon from '@/components/icons/news/AnonymousIcon.vue'
import SampleRadio from "@/components/ui/SampleRadio.vue";
import SampleCheckBox from "@/components/ui/SampleCheckBox.vue";
import CheckBox from "@/components/ui/CheckBox.vue";
import CustomRadio from "@/components/ui/CustomRadio.vue";
import {ref} from "vue";

export default {
  components: {
    CustomRadio,
    CheckBox,
    SampleCheckBox,
    SampleRadio,
    AnonymousIcon,
    WhoIsFollowMeIcon,
    ToWhomImSubscribeIcon,
    DropdownIcon,
    AccessIcon
  },
  data() {
    return {
      isOpen: true,
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
      },

    }
  },
  mounted() {
    this.selectedItemId = this.items.length > 0 ? this.items[0].id : null
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    }
  },
  computed: {
    selectedTitle() {
      const selectedItem = this.dropdownItems.find((item) => item.id === this.selectedItemId)
      if (selectedItem) {
        return selectedItem.title
      }
      return ''
    },
    dropdownItems() {
      return this.items.map((item) => ({
        ...item,
        icon: this.icons[item.icon]
      }))
    }
  }
}
</script>

<style scoped lang="scss">
.first__section,
.second__section,
.third__section {
  background-color: var(--color-seashell);
  border-radius: 10px;
  padding: 20px;
}

.first__section {
  display: flex;
  align-items: center;
  text-wrap: nowrap;
  gap: 44px;
}

.second__section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exclude-button {
  all: unset;
  color: var(--color-hippie-blue);
  font-size: 14px;
  cursor: pointer;
}

.fade-enter-active {
  animation: scale-up-top-left 0.2s;
}

.fade-leave-active {
  animation: scale-up-top-left 0.2s reverse;
}

@keyframes scale-up-top-left {
  0% {
    transform: scale(.5);
    transform-origin: top left;
  }
  100% {
    transform: scale(1);
    transform-origin: top left;
  }
}

.access__icon {
  color: var(--color-silver-chalice);
}

.left__side--item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.dropdown {
  border-radius: 10px;
  position: relative;
  background-color: var(--color-seashell);
  z-index: 10;

  &__list {
    list-style: none;
    margin: 0;
    font-size: 14px;
    box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.1);
    background-color: var(--color-white);
    padding: 16px;
    border-radius: 10px;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 10;
    display: flex;
    gap: 10px;
    flex-direction: column;

    li {
      color: var(--color-mine-shaft);
    }
  }

  &__toggle {
    border: none;
    font-size: 14px;
    display: flex;
    gap: 8px;
    color: var(--color-mine-shaft);
    justify-content: center;
    align-items: center;
    width: max-content;
    cursor: pointer;
    margin: 0;
    user-select: none;
    border-radius: 10px;
    height: 40px;
    padding: 0 12px;

    .access__icon {
      width: 20px;
      height: 20px;
    }

    svg {
      color: var(--color-mine-shaft);
    }
  }
}
</style>

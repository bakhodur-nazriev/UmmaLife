<template>
  <div class="menu__details">
    <div class="menu__toggle--button open__menu--details--button" @click="toggleMenu">
      <MenuDetailsIcon class="dropdown__toggle"/>
    </div>

    <Transition name="bounce">
      <div class="menu__overlay" v-if="isMenuOpen" @click="handleOverlayClick">
        <ul class="dropdown__menu">
          <li class="dropdown-item">
            <ShareIcon/>
            <span>{{ $t('buttons.share') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>

          <li class="dropdown-item">
            <CopyLinkIcon/>
            <span>{{ $t('buttons.copy_link') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>

          <li class="dropdown-item">
            <SaveIcon/>
            <span>{{ $t('buttons.save') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>

          <li class="dropdown-item">
            <BlankIcon/>
            <span>{{ $t('buttons.open_in_new_tab') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>

          <li class="dropdown-item">
            <HideIcon/>
            <span>{{ $t('buttons.hide') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>

          <li class="dropdown-item complain">
            <ComplainIcon/>
            <span>{{ $t('buttons.complain') }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script>
import MenuDetailsIcon from "@/components/icons/MenuDetailsIcon.vue";
import SampleDivider from "@/components/ui/SampleDivider.vue";
import ShareIcon from "@/components/icons/shorts/ShareIcon.vue";
import CopyLinkIcon from "@/components/icons/CopyLinkIcon.vue";
import SaveIcon from "@/components/icons/MenuDetails/SaveIcon.vue";
import BlankIcon from "@/components/icons/MenuDetails/BlankIcon.vue";
import ComplainIcon from "@/components/icons/MenuDetails/ComplainIcon.vue";
import HideIcon from "@/components/icons/MenuDetails/HideIcon.vue";

export default {
  components: {
    MenuDetailsIcon,
    SampleDivider,
    ShareIcon,
    CopyLinkIcon,
    SaveIcon,
    BlankIcon,
    ComplainIcon,
    HideIcon
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      test: this.isMenuOpen
    }
  },
  methods: {
    toggleMenu() {
      this.$emit('toggle-menu')
    },
    handleOverlayClick() {
      this.$emit('toggle-menu')
    },
    closeMenuDetailsWindow(event) {
      const menuDetailsWWindow = this.$refs.menuDetailsWindow
      const openMenuDetailsButton = document.querySelector('.open__menu--details--button')

      if (menuDetailsWWindow && !menuDetailsWWindow.contains(event.target) && event.target !== openMenuDetailsButton) {
        this.test = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenuDetailsWindow)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenuDetailsWindow)
  }
}

</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: scale-up-top-right 0.2s;
}

.bounce-leave-active {
  animation: scale-up-top-right 0.2s reverse;
}

@keyframes scale-up-top-right {
  0% {
    transform: scale(0.5);
    transform-origin: top right;
    transform: scale(.5);
    transform-origin: top right
  }
  100% {
    transform: scale(1);
    transform-origin: top right;
    transform: scale(1);
    transform-origin: top right
  }
}

.menu__details {
  position: relative;
}

.menu__toggle--button {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 30px;
  user-select: none;
}

.menu__overlay {
  position: absolute;
  right: 0;
  background-color: var(--color-white);
  z-index: 500;
  border-radius: 10px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
}

.menu__overlay svg {
  color: var(--color-mine-shaft);
}

.dropdown__menu {
  list-style: none;
  padding: 8px;
  margin: 0;
  width: max-content;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 16px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  color: var(--color-mine-shaft);

  &.complain {
    color: var(--color-valencia);

    svg {
      color: var(--color-valencia);
    }
  }

  &:hover {
    transition: all 0.15s ease-in-out;
    transition: all .15s ease-in-out;
    background-color: var(--color-seashell);
  }

  &__divider {
    width: 92%;
    margin: 1px auto;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}
</style>


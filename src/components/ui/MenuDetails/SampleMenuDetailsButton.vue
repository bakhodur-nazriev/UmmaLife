<template>
  <div class="menu__details">
    <div
      class="menu__toggle--button open__menu--details--button"
      @click="toggleMenu"
    >
      <MenuDetailsIcon class="dropdown__toggle" />
    </div>

    <Transition name="bounce">
      <div
        class="menu__overlay"
        v-if="isMenuOpen"
        @click="handleOverlayClick"
      >
        <ul class="dropdown__menu">
          <li class="dropdown-item">
            <ShareIcon />
            <span>{{ $t('buttons.share') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>
          <li class="dropdown-item">
            <CopyLinkIcon />
            <span>{{ $t('buttons.copy_link') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>
          <li class="dropdown-item">
            <SaveIcon />
            <span>{{ $t('buttons.save') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>
          <li class="dropdown-item">
            <BlankIcon />
            <span>{{ $t('buttons.open_in_new_tab') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>
          <li class="dropdown-item">
            <ComplainIcon />
            <span>{{ $t('buttons.complain') }}</span>
          </li>
          <SampleDivider class="dropdown-item__divider"/>
          <li class="dropdown-item">
            <HideIcon />
            <span>{{ $t('buttons.hide') }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
<script>
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import ShareIcon from '@/components/icons/MenuDetails/SendMenuIcon.vue'
import CopyLinkIcon from '@/components/icons/MenuDetails/CopyLinkIcon.vue'
import SaveIcon from '@/components/icons/MenuDetails/SaveIcon.vue'
import BlankIcon from '@/components/icons/MenuDetails/BlankIcon.vue'
import HideIcon from '@/components/icons/MenuDetails/HideIcon.vue'
import ComplainIcon from '@/components/icons/MenuDetails/ComplainIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'

export default {
  components: {
    SampleDivider,
    ComplainIcon,
    HideIcon,
    BlankIcon,
    SaveIcon,
    CopyLinkIcon,
    MenuDetailsIcon,
    ShareIcon
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      test: this.isMenuOpen
    }
  },
  methods: {
    toggleMenu () {
      this.$emit('toggle-menu')
    },
    handleOverlayClick () {
      this.$emit('toggle-menu')
    },
    closeMenuDetailsWindow (event) {
      const menuDetailsWWindow = this.$refs.menuDetailsWindow
      const openMenuDetailsButton = document.querySelector('.open__menu--details--button')

      if (menuDetailsWWindow && !menuDetailsWWindow.contains(event.target) && event.target !== openMenuDetailsButton) {
        this.test = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.closeMenuDetailsWindow)
  },
  beforeUnmount () {
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
    transform:scale(.5);
    transform-origin:top right
  }
  100% {
    transform:scale(1);
    transform-origin:top right
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
  color: var(--color-silver-chalice);
}

.dropdown__menu {
  list-style: none;
  padding: 10px;
  margin: 0;
  width: max-content;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 10px;
  position: relative;

  &:hover {
    transition: all .15s ease-in-out;
    background-color: var(--color-seashell);
  }

  &__divider {
    width: 92%;
    margin: 1px auto;
  }
}
</style>

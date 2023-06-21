<template>
  <div class="menu__details">
    <div class="menu__toggle--button" @click="toggleMenu">
      <menu-details-icon class="dropdown__toggle"></menu-details-icon>
    </div>

    <Transition name="bounce">
      <div
        class="menu__overlay"
        v-show="isMenuOpen"
        @click="handleOverlayClick"
      >
        <ul class="dropdown__menu">
          <li class="dropdown__item">
            <share-icon />
            <span>{{ $t('buttons.share') }}</span>
          </li>
          <sample-divider class="dropdown__item--divider"/>

          <li class="dropdown__item">
            <copy-link-icon />
            <span>{{ $t('buttons.copy_link') }}</span>
          </li>

          <sample-divider class="dropdown__item--divider"/>
          <li class="dropdown__item">
            <save-icon />
            <span>{{ $t('buttons.save') }}</span>
          </li>

          <sample-divider class="dropdown__item--divider"/>
          <li class="dropdown__item">
            <blank-icon />
            <span>{{ $t('buttons.open_in_new_tab') }}</span>
          </li>

          <sample-divider class="dropdown__item--divider"/>
          <li class="dropdown__item">
            <complain-icon />
            <span>{{ $t('buttons.complain') }}</span>
          </li>

          <sample-divider class="dropdown__item--divider"/>
          <li class="dropdown__item">
            <hide-icon />
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
  data () {},
  methods: {
    toggleMenu () {
      this.$emit('toggle-menu')
    },
    handleOverlayClick () {
      this.$emit('toggle-menu')
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.dropdown__item--divider {
  border: 1px solid var(--color-divider);
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

.dropdown__menu {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.menu__overlay {
  position: absolute;
  right: 0;
  background-color: var(--color-background);
  z-index: 500;
  border-radius: 10px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
}

.menu__overlay svg {
  color: var(--color-text);
}

.dropdown__item {
  display: flex;
  align-items: center;
  width: 210px;
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown__item:hover {
  background-color: var(--color-divider);
  border-radius: 10px;
}

.dropdown__item svg {
  margin-right: 9px;
}
</style>

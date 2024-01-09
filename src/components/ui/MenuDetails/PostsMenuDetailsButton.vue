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

          <li class="dropdown-item" @click="copyPostLink">
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
            <router-link :to="`/${$i18n.locale}/post/${postId}`" target="_blank">
              <BlankPostIcon/>
              <span>{{ $t('buttons.open_in_new_tab') }}</span>
            </router-link>
          </li>
          <SampleDivider class="dropdown-item__divider"/>

          <li class="dropdown-item">
            <HidePostIcon/>
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

  <PopupSample :show="showPopup">
    <span>{{ $t('modal.link_copied') }}</span>
  </PopupSample>
</template>

<script>
import MenuDetailsIcon from "@/components/icons/MenuDetailsIcon.vue";
import SampleDivider from "@/components/ui/SampleDivider.vue";
import ShareIcon from "@/components/icons/shorts/ShareIcon.vue";
import CopyLinkIcon from "@/components/icons/CopyLinkIcon.vue";
import SaveIcon from "@/components/icons/MenuDetails/SaveIcon.vue";
import ComplainIcon from "@/components/icons/MenuDetails/ComplainIcon.vue";
import HidePostIcon from "@/components/icons/MenuDetails/HidePostIcon.vue";
import BlankPostIcon from "@/components/icons/MenuDetails/BlankPostIcon.vue";
import PopupSample from "@/components/ui/PopupSample.vue";

export default {
  components: {
    PopupSample,
    BlankPostIcon,
    HidePostIcon,
    MenuDetailsIcon,
    SampleDivider,
    ShareIcon,
    CopyLinkIcon,
    SaveIcon,
    ComplainIcon
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    },
    postId: {
      type: String
    }
  },
  data() {
    return {
      test: this.isMenuOpen,
      showPopup: false,
    }
  },
  methods: {
    openPopup() {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false
      }, 3000);
    },
    async copyPostLink() {
      const currentUrl = window.location.origin;
      const postId = 'post/' + this.postId;

      try {
        await navigator.clipboard.writeText(`${currentUrl}/${postId}`);
        this.openPopup();
      } catch (error) {
        console.error('Не удалось скопировать ссылку', error);
      }
    },
    toggleMenu() {
      this.$emit('toggle-menu');
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

.dropdown {
  &__menu {
    list-style: none;
    padding: 8px;
    margin: 0;
    width: max-content;
    display: flex;
    flex-direction: column;
    row-gap: 2px;

    .dropdown-item, a {
      display: flex;
      align-items: center;
      padding: 0 10px;
      gap: 9px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 6px;
      position: relative;
      color: var(--color-mine-shaft);
      height: 36px;
      text-decoration: none;

      a {
        padding: 0;
      }

      svg {
        width: 16px;
        height: 16px;
      }

      &.complain {
        color: var(--color-valencia);

        svg {
          color: var(--color-valencia);
        }
      }

      &:hover {
        transition: all .2s ease-in-out;
        background-color: var(--color-seashell);
      }

      &__divider {
        width: 94%;
        margin: 1px auto;
      }
    }
  }
}
</style>


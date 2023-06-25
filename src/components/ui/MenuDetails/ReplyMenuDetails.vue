<template>
  <div class="menu__details">
    <div class="menu__toggle--button" @click="toggleReplyMenu">
      <menu-details-icon class="dropdown__toggle"></menu-details-icon>
    </div>

    <Transition name="bounce">
      <div
        class="menu__overlay"
        v-show="isReplyMenuOpen"
      >
        <ul class="dropdown__menu">
          <li class="dropdown__item">
            <edit-icon />
            <span>{{ $t('buttons.edit') }}</span>
          </li>
          <sample-divider class="dropdown__item--divider"/>

          <li class="dropdown__item">
            <copy-link-icon />
            <span>{{ $t('buttons.copy_link') }}</span>
          </li>

          <sample-divider class="dropdown__item--divider"/>
          <li class="dropdown__item">
            <delete-icon />
            <span>{{ $t('buttons.delete') }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
<script>
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import EditIcon from '@/components/icons/MenuDetails/EditIcon.vue'
import DeleteIcon from '@/components/icons/MenuDetails/DeleteIcon.vue'
import CopyLinkIcon from '@/components/icons/MenuDetails/CopyLinkIcon.vue'
export default {
  components: {
    CopyLinkIcon,
    DeleteIcon,
    EditIcon,
    SampleDivider,
    MenuDetailsIcon
  },
  props: {
    isReplyMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    toggleReplyMenu () {
      this.$emit('toggle-reply-menu')
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
  border: 1px solid var(--color-seashell);
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
  background-color: var(--color-white);
  z-index: 500;
  border-radius: 10px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
}

.menu__overlay svg {
  color: var(--color-silver-chalice);
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
  background-color: var(--color-seashell);
  border-radius: 10px;
}

.dropdown__item svg {
  margin-right: 9px;
}
</style>

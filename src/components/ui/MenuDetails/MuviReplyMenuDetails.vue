<template>
  <div class="menu__details">
    <div class="menu__toggle--button" @click="toggleReplyMenu">
      <MenuDetailsIcon class="dropdown__toggle" v-if="!vertical" />
      <VerticalMenuIcon class="dropdown__toggle" v-else />
    </div>

    <div class="menu__overlay" v-show="isReplyMenuOpen">
      <ul class="dropdown__menu" v-if="owner">
        <li class="dropdown__item" @click="$emit('updateComment')">
          <EditIcon />
          <span>{{ $t('buttons.edit') }}</span>
        </li>

        <SampleDivider class="dropdown__item--divider" />
        <li class="dropdown__item" @click="$emit('deleteComment')">
          <DeleteIcon />
          <span>{{ $t('buttons.delete') }}</span>
        </li>
      </ul>
      <ul class="dropdown__menu" v-else>
        <li class="dropdown__item" @click="$emit('reportComment')">
          <ComplainIcon />
          <span>{{ $t('buttons.complain') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import EditIcon from '@/components/icons/MenuDetails/EditIcon.vue'
import DeleteIcon from '@/components/icons/MenuDetails/DeleteIcon.vue'
import VerticalMenuIcon from '@/components/icons/shorts/VerticalMenuIcon.vue'
import ComplainIcon from '@/components/icons/MenuDetails/ComplainIcon.vue'
export default {
  components: {
    DeleteIcon,
    EditIcon,
    SampleDivider,
    MenuDetailsIcon,
    VerticalMenuIcon,
    ComplainIcon
  },
  emits: ['deleteComment', 'updateComment', 'reportComment', 'toggle-reply-menu'],
  props: {
    isReplyMenuOpen: {
      type: Boolean,
      required: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    toggleReplyMenu() {
      this.$emit('toggle-reply-menu')
    }
  }
}
</script>

<style scoped lang="scss">
.menu__overlay {
  animation: menu__overlay 0.2s;
}

@keyframes menu__overlay {
  0% {
    transform: scale(0.5);
    transform-origin: center top;
  }
  100% {
    transform: scale(1);
    transform-origin: center top;
  }
}

.dropdown__item--divider {
  margin: 2px auto;
  width: 92%;
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
  padding: 8px;
  margin: 0;
  width: max-content;
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
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
  color: var(--color-mine-shaft);

  svg {
    margin-right: 9px;
  }

  &:hover {
    background-color: var(--color-seashell);
    border-radius: 10px;
  }
}

@media (max-width: 576px) {
  .menu__toggle--button {
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
    svg {
      transform: scale(0.8);
    }
  }
}
</style>

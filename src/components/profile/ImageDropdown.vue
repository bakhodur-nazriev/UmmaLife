<template>
  <div class="menu__overlay" v-on-click-outside="closeHandler">
    <ul class="dropdown__menu">
      <li class="dropdown__item change__image" @click="emit('changeProfile')">
        Изменить фото
        <GalleryIcon />
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          @change="emit('inputHandler', $event, 'profile')"
        />
      </li>
      <SampleDivider class="dropdown__item--divider" />
      <li class="dropdown__item delete__item">
        Удалить фото
        <DeleteIcon class="delete__icon" />
      </li>
    </ul>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import DeleteIcon from '@/components/icons/MenuDetails/DeleteIcon.vue'
import GalleryIcon from '@/components/icons/GalleryIcon.vue'

const emit = defineEmits(['closeDropdown', 'changeProfile', 'inputHandler'])

const closeHandler = () => {
  emit('closeDropdown')
}
</script>

<style lang="scss" scoped>
.menu__overlay {
  position: absolute;
  left: 20px;
  top: 70px;
  background-color: var(--color-white);
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  z-index: 20;
  @media (max-width: 575px) {
    left: 50%;
    transform: translateX(-50%);
    top: 45px;
  }
}
.dropdown__menu {
  list-style: none;
  padding: 8px;
  margin: 0;
  width: max-content;
}

.dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  gap: 30px;
  line-height: 1;

  &:hover {
    background-color: var(--color-seashell);
    border-radius: 10px;
  }

  svg {
    color: var(--color-mine-shaft);
    width: 16px;
    height: 16px;
  }
  &.delete__item {
    color: var(--color-valencia);
    svg {
      scale: 1.2;
    }
  }
  &.change__image {
    position: relative;

    input[type='file'] {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      &::-webkit-file-upload-button {
        cursor: pointer;
      }
    }
  }
}
</style>

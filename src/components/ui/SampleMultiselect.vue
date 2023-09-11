<template>
  <div class="custom__multiselect">
    <Multiselect
      v-model="selected"
      :options="selectOptions"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="false"
      :showLabels="false"
      :placeholder="placeholder"
      :label="trackBy"
      :track-by="trackBy"
      @select="selectHandler"
      @remove="removeHandler"
    >
      <template #selection="{ values, isOpen }">
        <span
          class="multiselect__single selected__option__single"
          v-if="values.length"
          v-show="!isOpen"
        >
          {{ values.length }} опции выбрано
        </span>
      </template>
      <template #option="{ option }">
        <div class="selected__option">
          <div class="selected__option--left">
            <img class="selected__option--img" :src="option.img" :alt="option[trackBy]" />
            <div class="selected__option--title">{{ option[trackBy] }}</div>
          </div>

          <div class="selected__option--checkbox" :class="{ checked: option.isChecked }">
            <CheckMarkIcon v-if="option.isChecked" />
          </div>
        </div>
      </template>
      <template #noResult>
        <div class="multiselect__single">Пусто</div>
      </template>
      <template #noOptions>
        <div class="multiselect__single">Пусто</div>
      </template>
    </Multiselect>
    <div class="selected">
      <div
        v-for="select in selected"
        :key="select.id"
        class="selected__items"
        @click="deleteHandler(select)"
      >
        <img :src="select.img" :alt="select[trackBy]" />
        <p>{{ select[trackBy] }}</p>
        <button><CloseIcon /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array
  },
  trackBy: {
    type: String,
    default: ''
  }
})

const selectOptions = ref(props.options.map((o) => ({ ...o, isSelected: false })))

const selected = ref([])
const selectHandler = (option) => {
  option.isChecked = true
}
const removeHandler = (option) => {
  option.isChecked = false
}

const deleteHandler = (option) => {
  selected.value = selected.value.filter((o) => o.id !== option.id)
  removeHandler(option)
}
</script>

<style lang="scss">
.custom__multiselect {
  .selected__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
    gap: 12px;
    &--left {
      display: flex;
      align-items: center;
      gap: 11px;
    }
    &--img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      overflow: hidden;
    }
    &--title {
      width: 278px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &--checkbox {
      width: 24px;
      height: 24px;
      border: 1px solid var(--color-silver-chalice);
      border-radius: 5px;
      padding: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.checked {
        border: 1px solid var(--color-hippie-blue);
        background-color: var(--color-hippie-blue);
        color: var(--color-white);
      }
    }
  }
  .selected {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
    &__items {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--color-seashell);
      width: fit-content;
      border-radius: 10px;

      max-width: calc(50% - 4px);
      img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        overflow: hidden;
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        width: 140px;
      }
      button {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        width: 20px;
        height: 20px;
        cursor: pointer;
        svg {
          width: 16px;
          height: 16px;
          scale: 1.3;
        }
      }
    }
  }
  .multiselect__input::placeholder {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-silver-chalice);
  }

  .multiselect__option--selected {
    font-weight: 400;
  }
  .multiselect__option {
    padding: 0;
    min-height: unset;
  }
  .multiselect__option--selected,
  .multiselect__option--highlight,
  .multiselect__option--highlight .multiselect__option--selected,
  .multiselect__option--selected.multiselect__option--highlight {
    background: transparent;
    color: unset;
    outline: none;
  }
  .multiselect__content-wrapper {
    max-height: 176px !important;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    background-color: var(--color-white);
  }
  .multiselect__content {
    padding: 10px 16px;
  }
}
</style>

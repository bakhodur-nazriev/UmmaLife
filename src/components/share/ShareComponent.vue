<template>
  <div class="share">
    <div class="share__inner" v-on-click-outside="closeHandler">
      <div class="share__title">Поделиться</div>
      <div class="share__body">
        <div class="share__radio">
          <SampleRadio :checked="isChecked[0]" :index="0" @changeHandler="changeHandler">
            На своей странице
          </SampleRadio>
        </div>
        <div class="share__radio">
          <SampleRadio :checked="isChecked[1]" :index="1" @changeHandler="changeHandler">
            В группе
          </SampleRadio>
          <SampleMultiselect
            class="share__multiselect"
            v-if="isChecked[1]"
            :options="groups"
            placeholder="Выберите группу"
            trackBy="title"
          />
        </div>

        <div class="share__radio">
          <SampleRadio :checked="isChecked[2]" :index="2" @changeHandler="changeHandler">
            В личном сообщении
          </SampleRadio>
          <SampleMultiselect
            class="share__multiselect"
            v-if="isChecked[2]"
            :options="groupsUsers"
            placeholder="Выберите личный или групповой чат"
            trackBy="name"
          />
        </div>

        <div class="share__comment">
          <div class="share__comment--title">Ваш комментарий</div>
          <textarea class="share__comment--textarea"></textarea>
        </div>
        <SampleButton title="Поделиться записью" class="share__btn" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { groups, groupsUsers } from '@/dummy'
import SampleRadio from '@/components/ui/SampleRadio.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleMultiselect from '@/components/ui/SampleMultiselect.vue'
import { vOnClickOutside } from '@vueuse/components'
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
const closeHandler = () => {
  store.commit('setShareOpen', false)
}

const isChecked = ref([true, false, false])
const changeHandler = ({ target, index }) => {
  isChecked.value.forEach((_, i) => {
    isChecked.value[i] = false
  })
  isChecked.value[index] = target
}
</script>

<style lang="scss">
.share {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.7);
  z-index: 150;
  &__inner {
    width: 450px;
    min-height: 466px;
    border-radius: 20px;
    background-color: var(--color-white);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    @media (max-width: 767px) {
      width: 100%;
      top: unset;
      bottom: 0;
      left: unset;
      transform: unset;
      bottom: 0;
      padding: 0;
      border-radius: 12px 12px 0 0;
      min-height: auto;
    }
  }
  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    text-align: center;
    margin-bottom: 20px;
    @media (max-width: 767px) {
      padding: 20px 16px;
      margin-bottom: 0;
    }
  }
  &__body {
    border-top: 1px solid var(--color-gallery-first);
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
    @media (max-width: 767px) {
      padding: 16px;
    }
  }
  &__multiselect {
    margin-top: 12px;
    .multiselect__tags,
    .multiselect__input {
      background-color: transparent;
      color: var(--color-mine-shaft);
    }
  }
  &__radio {
    margin-bottom: 20px;
  }
  &__comment {
    @media (max-width: 767px) {
      margin-bottom: 20px;
    }
    &--title {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 8px;
    }
    &--textarea {
      padding: 10px;
      width: 100%;
      resize: none;
      min-height: 150px;
      border: 1px solid var(--color-seashell);
      border-radius: 10px;
      outline: none;
      display: block;
      background-color: transparent;
      color: var(--color-mine-shaft);
    }
  }
  &__btn {
    max-width: 100%;
  }
}
</style>

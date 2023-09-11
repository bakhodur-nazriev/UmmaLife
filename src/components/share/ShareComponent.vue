<template>
  <div class="share">
    <div class="share__inner" v-on-click-outside="closeHandler">
      <div class="share__title">Поделиться</div>
      <div class="share__body">
        <SampleRadio :checked="isChecked[0]" :index="0" @changeHandler="changeHandler">
          На своей странице
        </SampleRadio>
        <SampleRadio :checked="isChecked[1]" :index="1" @changeHandler="changeHandler">
          В группе
        </SampleRadio>
        <SampleRadio :checked="isChecked[2]" :index="2" @changeHandler="changeHandler">
          В личном сообщении
        </SampleRadio>
        <div class="share__comment">
          <div class="share__comment--title">Ваш комментарий</div>
          <textarea class="share__comment--textarea"></textarea>
        </div>
        <SampleButton title="Поделиться записью" class="share__btn" />
      </div>
    </div>
  </div>
</template>

<script>
import SampleRadio from '@/components/ui/SampleRadio.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: { SampleRadio, SampleButton },
  data() {
    return {
      isChecked: [true, false, false]
    }
  },
  methods: {
    changeHandler({ target, index }) {
      this.isChecked.forEach((_, i) => {
        this.isChecked[i] = false
      })
      this.isChecked[index] = target
    }
  }
}
</script>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
import { useStore } from 'vuex'
const store = useStore()
const closeHandler = () => {
  store.commit('setShareOpen', false)
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
  z-index: 20;
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
  }
  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    text-align: center;
    margin-bottom: 20px;
  }
  &__body {
    border-top: 1px solid var(--color-gallery-first);
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__comment {
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
    }
  }
  &__btn {
    max-width: 100%;
  }
}
</style>

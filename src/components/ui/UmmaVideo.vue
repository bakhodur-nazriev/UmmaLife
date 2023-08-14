<template>
  <div class="umma__video--block">
    <div class="video__section">
      <img width="42" height="42" src="@/assets/images/Ellipse.png" alt="">
      <img width="364" height="200" src="@/assets/images/Rectangle.png" alt="">
      <div class="time__section">
        <span>15:52</span>
      </div>
    </div>
    <div class="title__section">
      <h3 class="title">Вообще любое название для видео, которое влазит на 2 строки</h3>
      <SampleMenuDetailsButton
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />
    </div>

    <div class="subtitle__section">
      <div>
        <time class="video__time" datetime="2022.08.20">20.08.2022</time><small>-</small> <small>1 тыс. {{ $t('video.views') }}</small>
      </div>
      <div>
        <small>255 {{ $t('video.reactions') }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import SampleMenuDetailsButton from '@/components/ui/MenuDetails/SampleMenuDetailsButton.vue'

export default {
  components: {
    SampleMenuDetailsButton
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 15px;
}

.title__section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  line-height: 1.3;
}

.subtitle__section small {
  color: var(--color-gray);
  font-size: 12px;
}

.video__section {
  position: relative;
}

.video__section img:first-child {
  border-radius: 50%;
  position: absolute;
  z-index: 5;
  margin: 12px;
  padding: 1px;
  background-color: var(--color-white);
}

.video__section .time__section {
  position: absolute;
  z-index: 5;
  bottom: 20px;
  right: 15px;
}

.time__section span {
  color: var(--color-white);
  background-color: var(--color-mine-shaft);
  border-radius: 7px;
  padding: 6px;
  font-size: 12px;
  font-weight: 500;
}

.video__time {
  font-size: 12px;
  color: var(--color-gray);
}
/*.umma__video--block {
  min-width: 364px;
}*/

@media (min-width: 768px) {
  .umma__video--block {
    max-width: 364px;
  }
}
</style>

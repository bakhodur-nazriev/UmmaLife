<template>
  <div class="umma__video--block">
    <div class="video__section">
      <img width="42" height="42" src="../../assets/images/Ellipse.png" alt="">
      <img width="364" height="200" src="../../assets/images/Rectangle.png" alt="">
      <div class="time__section">
        <span>15:52</span>
      </div>
    </div>
    <div class="title__section">
      <h3 class="title">Вообще любое название для видео, которое влазит на 2 строки</h3>
      <sample-menu-details-button></sample-menu-details-button>
    </div>
    <div class="subtitle__section">
      <div>
        <small>20.08.2022</small> <small>-</small> <small>1 тыс. просмотров</small>
      </div>
      <div>
        <small>255 реакций</small>
      </div>
    </div>
  </div>
</template>

<script>
import SampleMenuDetailsButton from '@/components/ui/SampleMenuDetailsButton.vue'

export default {
  components: { SampleMenuDetailsButton }
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
  color: var(--color-gray-4);
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
  background-color: var(--color-background);
}

.video__section .time__section {
  position: absolute;
  z-index: 5;
  bottom: 20px;
  right: 15px;
}

.time__section span {
  color: var(--color-background);
  background-color: var(--color-primary);
  border-radius: 7px;
  padding: 6px;
  font-size: 12px;
  font-weight: 500;
}

/*.umma__video--block {
  min-width: 364px;
}*/

@media (min-width: 768px) {
  .umma__video--block {
    max-width: 320px;
  }
}
</style>

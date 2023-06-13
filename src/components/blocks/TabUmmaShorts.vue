<template>
  <div class="umma__shorts--main--container">
    <div class="umma__shorts--block" v-for="i in 7" :key="i">
      <img src="../../assets/images/UmmaShorts.png" alt="">
      <div class="umma__shorts--title__section">
        <div class="umma__shorts--title--button">
          <h3 class="title umma__shorts--title">
            #history #muslim #desert и все об исламе #history #muslim #desert и все об исламе
          </h3>
          <sample-menu-details-button></sample-menu-details-button>
        </div>
        <div class="subtitle">
          <div>
            <time class="shorts__time" datetime="2022.08.20">20.08.2022</time>
            <small>-</small> <small>1 тыс. {{ $t('video.views') }}</small>
          </div>
          <div>
            <small>255 {{ $t('video.reactions') }}</small>
          </div>
        </div>
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
.umma__shorts--main--container {
  display: grid;
  grid-template-columns: repeat(3, 237px);
  gap: 16px;
}

.umma__shorts--title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.umma__shorts--title--button {
  display: flex;
}
.menu__details--button {
  transform: rotate(90deg);
}

.umma__shorts--title--button .menu__details--button {
  height: max-content;
}

.subtitle small {
  color: var(--color-gray-4);
}

.shorts__time {
  font-size: 12px;
  color: var(--color-gray-4);
}

@media (min-width: 1280px) {
  .umma__shorts--inside--block img {
    border-radius: 15px;
  }

  .umma__shorts--main--container {
    grid-template-columns: repeat(4, 237px);
  }
}

@media (min-width: 1920px) {
  .umma__shorts--main--container {
    grid-template-columns: repeat(6, 237px);

  }
}
</style>

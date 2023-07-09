<template>
  <div class="umma__shorts--block">
    <img src="../../assets/images/UmmaShorts.png" alt="">
    <div class="umma__shorts--title__section">
      <div class="umma__shorts--title--button">
        <h3 class="title umma__shorts--title">
          #history #muslim #desert и все об исламе #history #muslim #desert и все об исламе
        </h3>
        <sample-menu-details-button
          :is-menu-open="isMenuOpen"
          @toggle-menu="toggleMenu"
        ></sample-menu-details-button>
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

.subtitle small {
  color: var(--color-gray);
}

.shorts__time {
  font-size: 12px;
  color: var(--color-gray);
}
</style>

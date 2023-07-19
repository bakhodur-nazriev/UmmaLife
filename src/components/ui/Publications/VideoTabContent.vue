<template>
  <article class="main__video--block">
    <div v-for="i in 10" :key="i">
      <div class="video__main--section">
        <button
          class="menu__detail--button"
          type="button"
          @click="clickMenuDetail"
        >
          <MenuDetailsIcon />
        </button>
        <img class="video__image" src="@/assets/images/video_image_1.png" alt="video">
        <div class="video__time">
          <span>15:30</span>
        </div>
      </div>

      <div class="description__video--section">
        <h3 class="text-1 video__title">Вообще любое название для видео, которое влазит на 2 стр...</h3>
        <div>
        <span class="author__video--section">
          <img src="@/assets/images/video_author.png" alt="video author">
          <small>Шамиль Ибн Абубакр</small>
        </span>
          <small class="video__date--section">20.08.2022 - 1 тыс. {{ $t('video.views') }}</small>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'

export default {
  components: {
    MenuDetailsIcon
  },
  data () {
    return {}
  },
  methods: {
    clickMenuDetail () {
      console.log('test')
    }
  }
}
</script>

<style scoped>
.description__video--section {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
}

.main__video--block {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 15px;
}

.video__main--section {
  position: relative;

  .video__image {
    width: 100%;
  }
  .menu__detail--button {
    position: absolute;
    right: 30px;
    top: 20px;
    border-radius: 5px;
    backdrop-filter: blur(10px);
    max-width: 24px;
    max-height: 24px;
  }

  .video__time {
    position: absolute;
    right: 15px;
    bottom: 20px;
    color: var(--color-white);
    padding: 4px 6px;
    background-color: var(--color-mine-shaft);
    backdrop-filter: blur(20px);
    border-radius: 5px;
    font-size: 12px;
  }
}

.menu__detail--button {
  border: none;
  background: none;
}

.video__date--section {
  color: var(--color-gray);
}

.author__video--section {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--color-gray);
}

.video__title {
  line-height: 1.2;
}
</style>

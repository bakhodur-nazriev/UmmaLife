<template>
  <div class="video-block">
    <article class="video-block__article" v-for="i in 10" :key="i">
      <div class="video__main--section">
        <button
          class="menu__detail--button"
          type="button"
          @click="clickMenuDetail"
        >
          <ThreeDotIcon />
        </button>
        <img class="video__image" src="@/assets/images/video_image_1.png" alt="video">
        <div class="video__time">
          <span>15:30</span>
        </div>
      </div>

      <div class="description__video--section">
        <h3 class="text-1 video__title">Вообще любое название для видео, которое влазит на 2 стр...</h3>
        <div class="video-author__section">
          <span class="author__video--section">
            <img src="@/assets/images/video_author.png" alt="video author">
            <small>Шамиль Ибн Абубакр</small>
          </span>
          <small class="video__date--section">20.08.2022 - 1 тыс. {{ $t('video.views') }}</small>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import ThreeDotIcon from '@/components/icons/ThreeDotIcon.vue'

export default {
  components: {
    ThreeDotIcon
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

<style scoped lang="scss">
.video-author__section {
  display: flex;
  flex-direction: column;
}

.video-block {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 15px;
  background-color: var(--color-white);
  padding: 24px;
  border-radius: 15px;

  &__article {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
}

.description__video--section {
  display: flex;
  flex-direction: column;
  row-gap: 6px;

  .video__title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.2;
  }
}

.video__main--section {
  position: relative;
  display: flex;

  .video__image {
    width: 100%;
  }
  .menu__detail--button {
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    padding: 2px;
    border: none;
    background-color: rgba(0, 0, 0, 0.2)
  }

  .video__time {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: var(--color-white);
    padding: 4px 6px;
    background-color: var(--color-mine-shaft);
    backdrop-filter: blur(20px);
    border-radius: 5px;
    font-size: 12px;
  }
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
</style>

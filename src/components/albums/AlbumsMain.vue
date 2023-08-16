<template>
  <div class="albums__main">
    <div class="albums__main--block add" @click="$emit('openAdd')">
      <GalleryAddIcon />
      <p>Добавить новый альбом</p>
    </div>
    <div class="albums__main--block" v-for="i in 3" :key="i">
      <div class="albums__main--gallery">
        <a href="/images/albums/album-9.jpg" data-fancybox>
          <img src="/images/albums/album-9.jpg" alt="album-5" />
        </a>
        <a href="/images/albums/album-6.jpg" data-fancybox>
          <img src="/images/albums/album-6.jpg" alt="album-6" />
        </a>
        <a href="/images/albums/album-7.jpg" data-fancybox>
          <img src="/images/albums/album-7.jpg" alt="album-7" />
        </a>
        <a href="/images/albums/album-8.jpg" data-fancybox>
          <img src="/images/albums/album-8.jpg" alt="album-8" />
        </a>
      </div>
      <div class="albums__main--bottom">
        <img src="/images/users/jeff.png" alt="jeff" class="albums__main--profile" />
        <div class="albums__main--info">
          <div class="albums__main--name" @click="$emit('openCard')">My favourite summer</div>
          <div class="albums__main--date">Создано: 20.08.2022</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Fancybox } from '@fancyapps/ui'
import GalleryAddIcon from '@/components/icons/GalleryAddIcon.vue'
export default {
  components: { GalleryAddIcon },
  emits: ['openAdd', 'openCard'],
  mounted() {
    Fancybox.bind('[data-fancybox]', {
      wheel: 'zoom'
    })
  }
}
</script>

<style lang="scss" scoped>
.albums__main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  &--block {
    border-radius: 20px;
    background-color: var(--color-white);
    padding: 16px 16px 10px 16px;
    &.add {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg {
        width: 80px;
        height: 80px;
        margin-bottom: 13px;
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: var(--color-silver-chalice);
      }
    }
  }
  &--gallery {
    display: grid;
    grid-template-columns: 151px 151px;
    grid-template-rows: 151px 151px;
    gap: 8px;
    margin-bottom: 10px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
    }
  }
  &--bottom {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &--profile {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  &--name {
    cursor: pointer;
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: 130%;
    color: var(--color-mine-shaft);
  }
  &--date {
    font-size: 12px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-silver-chalice);
  }
}
</style>

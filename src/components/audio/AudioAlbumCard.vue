<template>
  <div class="playlist">
    <div class="playlist__cover">
      <img src="/images/message/message-img.jpg" alt="message-img" />
      <button class="playlist__cover--bookmark">
        <BookmarkIcon />
      </button>
    </div>
    <div class="playlist__content">
      <h2>Favourite album</h2>
      <p>Создано: 20.08.2022</p>
    </div>
  </div>
</template>

<script>
import BookmarkIcon from '@/components/icons/BookmarkIcon.vue'

export default {
  components: { BookmarkIcon },
  data() {
    return {
      isBookmarkClicked: false
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  max-width: 350px;
  width: 100%;
  border-radius: 15px;
  padding: 8px 8px 14px 8px;
  background-color: var(--color-white);
  display: block;
  cursor: pointer;
  &__cover {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center;
    }
    &--bookmark {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      background: rgba(31, 31, 31, 0.5);
      backdrop-filter: blur(10px);
      border: none;
      outline: none;
      cursor: pointer;
    }
  }
  &__content {
    padding-top: 14px;
    h2 {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      margin: 0;
      margin-bottom: 4px;
      padding: 0;
      color: var(--color-mine-shaft);
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 12px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-silver-chalice);
    }
  }
}
</style>

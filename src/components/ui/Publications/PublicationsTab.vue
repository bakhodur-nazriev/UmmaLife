<template>
  <article>
    <header class="post__header">
      <router-link to="#">
        <img src="../../../assets/images/Ellipse.png" alt="">
        <span>Абрахам Арахамович</span>
        <span class="time">15 минут назад</span>
      </router-link>
      <div>
        <menu-details-icon></menu-details-icon>
      </div>
    </header>

    <div class="post__content">
      <p>The 29-year-old took more than a tenth of a second off a record that had stood for 16 years, clocking 52.20 seconds to beat Russian Yuliya Pechonkina's previous mark of 52.34.
        "I'm just shocked," said Muhammad.
        "I've been kind of hitting that time in practice and my coach was like 'there's no way you can't do it'."
      </p>
      <div class="post__content--reactions">
        <div></div>
        <div>
          <router-link to="#"></router-link>
          <router-link to="#"></router-link>
        </div>
      </div>
    </div>

    <hr class="post__footer--divider">

    <footer class="post__footer">
      <div class="like__button">
        <heart-icon></heart-icon>
        {{ $t('buttons.like') }}
      </div>
      <div class="comment__button">
        <comment-icon></comment-icon>
        {{ $t('buttons.comment') }}
      </div>
      <div class="share__button">
        <share-icon></share-icon>
        <div>{{ $t('buttons.share') }}</div>
      </div>
    </footer>
  </article>
</template>

<script>
import HeartIcon from '@/components/icons/HeartIcon.vue'
import CommentIcon from '@/components/icons/CommentIcon.vue'
import ShareIcon from '@/components/icons/ShareIcon.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'

export default {
  components: {
    MenuDetailsIcon,
    ShareIcon,
    CommentIcon,
    HeartIcon
  }
}
</script>

<style scoped>
.post__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like__button,
.comment__button,
.share__button {
  display: flex;
  align-items: center;
  color: var(--color-gray-4);
  cursor: pointer;
}

.like__button svg,
.comment__button svg,
.share__button svg {
  margin-right: 12px;
}

.post__footer--divider {
  height: 1px;
  background-color: var(--color-surface);
  border: none;
}
</style>

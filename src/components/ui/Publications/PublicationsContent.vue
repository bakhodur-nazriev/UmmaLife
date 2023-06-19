<template>
  <article class="post__block">
    <header class="post__header">
      <router-link class="post__author" to="#">
        <img width="56" height="56" src="../../../assets/images/Ellipse.png" alt="">
        <div class="author__info">
          <span class="name">Абрахам Арахамович</span>
          <span class="time">15 минут назад</span>
        </div>
      </router-link>
      <div class="menu__button">
        <menu-details-icon></menu-details-icon>
      </div>
    </header>

    <div class="post__content">
      <p class="post__content--paragraph">The 29-year-old took more than a tenth of a second off a record that had stood for 16 years, clocking 52.20 seconds to beat Russian Yuliya<br>
        Pechonkina's previous mark of 52.34.<br>
        "I'm just shocked," said Muhammad.<br>
        "I've been kind of hitting that time in practice and my coach was like 'there's no way you can't do it'."
      </p>
      <div class="post__content--reactions">
        <div class="reactions__block">
          <div class="reaction">
            <like-icon></like-icon>
            <span>1550</span>
          </div>
          <div class="reaction">
            <dislike-icon></dislike-icon>
            <span>1550</span>
          </div>
          <div class="reaction">
            <love-icon></love-icon>
            <span>1935</span>
          </div>
          <div class="reaction">
            <laugh-icon></laugh-icon>
            <span>4336</span>
          </div>
          <div class="reaction">
            <fire-icon></fire-icon>
            <span>9685</span>
          </div>
          <div class="reaction">
            <think-icon></think-icon>
            <span>9685</span>
          </div>
          <div class="reaction">
            <angry-icon></angry-icon>
            <span>9685</span>
          </div>
          <div class="reaction">
            <sad-icon></sad-icon>
            <span>9685</span>
          </div>
          <div class="reaction">
            <scared-icon></scared-icon>
            <span>9685</span>
          </div>

        </div>

        <div class="stats__reposts">
          <span>155 {{ $t('labels.comments.plural') }}</span>
          <span class="stats__separator"> / </span>
          <span>35 {{ $t('labels.reposts.plural') }}</span>
        </div>
      </div>
    </div>

    <hr class="post__footer--divider">

    <footer class="post__footer">
      <div class="footer__buttons">
        <div class="reaction__buttons--block">
          <div class="reactions__buttons">
            <transition name="slide">
              <div v-if="isReactionWindowOpen" class="reaction__window">
                <big-like-icon></big-like-icon>
                <big-dislike-icon></big-dislike-icon>
                <big-love-icon></big-love-icon>
                <big-laugh-icon></big-laugh-icon>
                <big-fire-icon></big-fire-icon>
                <big-think-icon></big-think-icon>
                <big-angry-icon></big-angry-icon>
                <big-sad-icon></big-sad-icon>
                <big-scared-icon></big-scared-icon>
              </div>
            </transition>
          </div>
          <div class="like__button" @click="openReactionWindow">
            <heart-icon></heart-icon>
            {{ $t('buttons.like') }}
          </div>
        </div>
        <div class="comment__button" @click="toggleForm">
          <comment-icon></comment-icon>
          {{ $t('buttons.comment') }}
        </div>
        <div class="share__button">
          <share-icon></share-icon>
          <div>{{ $t('buttons.share') }}</div>
        </div>
      </div>

      <form
        action=""
        method="post"
        v-if="isFormOpen"
        class="comment__form"
      >
        <img src="" alt="">
        <textarea></textarea>
        <button type="submit">
          Send
        </button>
      </form>
    </footer>
  </article>
</template>

<script>
import HeartIcon from '@/components/icons/HeartIcon.vue'
import CommentIcon from '@/components/icons/CommentIcon.vue'
import ShareIcon from '@/components/icons/ShareIcon.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'

import BigAngryIcon from '@/components/icons/reactions/men/big/AngryIcon.vue'
import BigDislikeIcon from '@/components/icons/reactions/men/big/DislikeIcon.vue'
import BigFireIcon from '@/components/icons/reactions/men/big/FireIcon.vue'
import BigLaughIcon from '@/components/icons/reactions/men/big/LaughIcon.vue'
import BigLikeIcon from '@/components/icons/reactions/men/big/LikeIcon.vue'
import BigLoveIcon from '@/components/icons/reactions/men/big/LoveIcon.vue'
import BigSadIcon from '@/components/icons/reactions/men/big/SadIcon.vue'
import BigScaredIcon from '@/components/icons/reactions/men/big/ScaredIcon.vue'
import BigThinkIcon from '@/components/icons/reactions/men/big/ThinkIcon.vue'

export default {
  components: {
    ScaredIcon,
    SadIcon,
    AngryIcon,
    ThinkIcon,
    FireIcon,
    DislikeIcon,
    LaughIcon,
    LoveIcon,
    LikeIcon,
    MenuDetailsIcon,
    ShareIcon,
    CommentIcon,
    HeartIcon,

    BigFireIcon,
    BigAngryIcon,
    BigDislikeIcon,
    BigLaughIcon,
    BigLikeIcon,
    BigLoveIcon,
    BigSadIcon,
    BigScaredIcon,
    BigThinkIcon
  },
  data () {
    return {
      isFormOpen: false,
      isReactionWindowOpen: false
    }
  },
  methods: {
    toggleForm () {
      this.isFormOpen = !this.isFormOpen
    },

    openReactionWindow () {
      this.isReactionWindowOpen = !this.isReactionWindowOpen
    }
  }
}
</script>

<style scoped>
.reaction__buttons--block {
  position: relative;
}

.reactions__buttons {
  position: absolute;
  bottom: 42px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: var(--color-background);
}

.reaction__window {
  display: flex;
  gap: 18px;
  padding: 12px;
}

.comment__form {
  height: auto;
  opacity: 1;
  transition: height 0.3s ease, opacity 0.3s ease;
}

.footer__buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.reaction {
  height: 32px;
  background: var(--color-divider);
  border-radius: 50px;
  padding: 8px 12px;
  color: var(--color-text);
  width: auto;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
}

.reactions__block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.post__block {
  background-color: var(--color-background);
  margin-bottom: 20px;
  border-radius: 15px;
  padding: 20px 24px;
}

.stats__separator {
  margin: 0 8px;
}

.post__content--reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 14px 0;
}

.stats__reposts {
  color: var(--color-text);
  display: flex;
  font-size: 14px;
}

.post__header {
  display: flex;
  justify-content: space-between;
  margin: 0 0 8px 0;
}

.menu__button {
  cursor: pointer;
  height: 27px;
}

.menu__button svg {
  color: var(--color-text);
}

.post__footer {
  display: flex;
  flex-direction: column;
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
  margin-bottom: 18px;
}

.post__author {
  display: flex;
  text-decoration: none;
}

.post__author img {
  margin-right: 8px;
}

.post__content--paragraph {
  margin: 0;
}

.time {
  color: var(--color-text);
  font-size: 14px;
}

.name {
  color: var(--color-primary);
  font-size: 18px;
}

.author__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 1280px) {
  .reactions__block {
    max-width: 560px;
  }
}

@media (min-width: 1920px) {
  .reactions__block {
    max-width: 100%;
  }
}
</style>

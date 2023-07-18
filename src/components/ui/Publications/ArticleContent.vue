<template>
  <div class="main__article--block">
    <article class="article__block" v-for="i in 4" :key="i">
      <section class="article__header--section">
        <div class="author__avatar--name--time">
          <img
            src="@/assets/images/Article_Author.png"
            alt="author"
            width="56"
            height="56"
          >
          <div class="author__name--time">
            <span>Абрахам Арахамович</span>
            <small>15 минут назад</small>
          </div>
        </div>
        <div>
          <SampleMenuDetailsButton
            :is-menu-open="isMenuOpen"
            @toggleMenu="$emit('toggle-menu')"
          />
        </div>
      </section>

      <section class="article__content--section">
        <div class="article__content--item">
          <img
            src="@/assets/images/post_image.png"
            alt=""
            class="article__content--image"
          >
          <div class="article__content--details">
            <div class="article__title--block">
              <h3 class="article__title">Название статьи, которое не поместилось на одну строку и переместилось на вторую</h3>
            </div>
            <div class="article__detail--block">
              <router-link
                to="#"
                class="read__more--link"
              >
                {{ $t('buttons.read_more') }}
              </router-link>
              <div class="stats__reposts">
                <span>155 {{ $t('labels.comments.plural') }}</span>
                <span class="stats__separator"> / </span>
                <span>35 {{ $t('labels.reposts.plural') }}</span>
              </div>
            </div>

          </div>
        </div>

        <div class="article__content--reactions">
          <div class="reactions__block">
            <div
              v-for="(reaction, index) in reactions"
              :key="index"
              class="reaction"
            >
              <component :is="reaction.icon"/>
              <span>{{ reaction.count }}</span>
            </div>
          </div>
        </div>
      </section>

      <SampleDivider />

      <footer class="post__footer">
          <div class="footer__buttons">
            <div class="reaction__buttons--block" ref="reactionWindow">
              <div class="reactions__buttons">
                <div v-if="isReactionWindowOpen" class="reaction__window" >
                  <ul class="reaction__menu">
                    <li
                      v-for="(icon, i) in footerReactsIcons"
                      :key="i"
                      class="reaction__item"
                    >
                      <component :is="icon"/>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="like__button open-reaction-button"
                @click="openReactionWindow"
              >
                <HeartIcon />
                {{ $t('buttons.like') }}
              </div>
            </div>

            <div
              class="comment__button"
              @click="toggleForm"
            >
              <CommentIcon />
              {{ $t('buttons.comment') }}
            </div>

            <div class="share__buttons--block" ref="shareWindow">
              <div class="share__buttons">
                <div v-if="isShareWindowOpen" class="share__window">
                  <ul class="share__menu">
                    <li class="share__item">
                      <SendMenuIcon class="share__item--divider"/>
                      <span>{{ $t('buttons.open_like_message') }}</span>
                    </li>
                    <SampleDivider class="share__item--divider"/>
                    <li class="share__item">
                      <ShareMenuIcon />
                      <span>{{ $t('buttons.share_on_my_page') }}</span>
                    </li>
                    <SampleDivider class="share__item--divider"/>
                    <li class="share__item">
                      <MyGroupIcon />
                      <span>{{ $t('buttons.share_in_group') }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="share__button open-share-button" @click="openShareWindow">
                <ShareIcon />
                {{ $t('buttons.share') }}
              </div>
            </div>
          </div>

          <SampleDivider v-if="isFormOpen" />

          <div class="main__comment--form" v-if="isFormOpen">
            <Transition name="fade">
              <ReplyCommentForm />
            </Transition>

            <Transition name="fade">
              <CommentForm />
            </Transition>
          </div>

        </footer>
    </article>
  </div>
</template>

<script>
import SampleMenuDetailsButton from '@/components/ui/MenuDetails/SampleMenuDetailsButton.vue'
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import testIcon from '@/components/icons/reactions/men/small/testIcon.vue'
import BigLikeIcon from '@/components/icons/reactions/men/big/LikeIcon.vue'
import BigDislikeIcon from '@/components/icons/reactions/men/big/DislikeIcon.vue'
import BigLoveIcon from '@/components/icons/reactions/men/big/LoveIcon.vue'
import BigLaughIcon from '@/components/icons/reactions/men/big/LaughIcon.vue'
import BigFireIcon from '@/components/icons/reactions/men/big/FireIcon.vue'
import BigThinkIcon from '@/components/icons/reactions/men/big/ThinkIcon.vue'
import BigAngryIcon from '@/components/icons/reactions/men/big/AngryIcon.vue'
import BigSadIcon from '@/components/icons/reactions/men/big/SadIcon.vue'
import BigScaredIcon from '@/components/icons/reactions/men/big/ScaredIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import CommentIcon from '@/components/icons/CommentIcon.vue'
import SendMenuIcon from '@/components/icons/MenuDetails/SendMenuIcon.vue'
import ShareMenuIcon from '@/components/icons/MenuDetails/ShareMenuIcon.vue'
import MyGroupIcon from '@/components/icons/MyGroupIcon.vue'
import ShareIcon from '@/components/icons/ShareIcon.vue'
import ReplyCommentForm from '@/components/ui/Comment/ReplyCommentForm.vue'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
export default {
  components: {
    SampleMenuDetailsButton,
    CommentForm,
    ReplyCommentForm,
    ShareIcon,
    MyGroupIcon,
    ShareMenuIcon,
    SendMenuIcon,
    CommentIcon,
    HeartIcon,
    SampleDivider
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      reactions: [
        { icon: LikeIcon, count: 1550 },
        { icon: DislikeIcon, count: 2351 },
        { icon: LoveIcon, count: 1987 },
        { icon: FireIcon, count: 2358 },
        { icon: AngryIcon, count: 7462 },
        { icon: ScaredIcon, count: 7894 },
        { icon: LaughIcon, count: 5671 },
        { icon: ThinkIcon, count: 9874 },
        { icon: SadIcon, count: 9876 },
        { icon: testIcon, count: 9876 }
      ],
      footerReactsIcons: [
        { icon: BigLikeIcon },
        { icon: BigDislikeIcon },
        { icon: BigLoveIcon },
        { icon: BigLaughIcon },
        { icon: BigFireIcon },
        { icon: BigThinkIcon },
        { icon: BigAngryIcon },
        { icon: BigSadIcon },
        { icon: BigScaredIcon }
      ],
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isFormOpen: false
    }
  },
  methods: {
    openReactionWindow () {
      this.isReactionWindowOpen = !this.isReactionWindowOpen
    },
    toggleForm () {
      this.isFormOpen = !this.isFormOpen
      this.$emit('toggle-menu')
    },
    openShareWindow () {
      this.isShareWindowOpen = !this.isShareWindowOpen
    },
    closeReactionWindow (event) {
      const reactionWindow = this.$refs.reactionWindow
      const openReactionButton = document.querySelector('.open-reaction-button')

      if (reactionWindow && !reactionWindow.contains(event.target) && event.target !== openReactionButton) {
        this.isReactionWindowOpen = false
      }
    },
    closeShareWindow (event) {
      const shareWindow = this.$refs.shareWindow
      const openShareButton = document.querySelector('.open-share-button')

      if (shareWindow && !shareWindow.contains(event.target) && event.target !== openShareButton) {
        this.isShareWindowOpen = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.closeReactionWindow)
    document.addEventListener('click', this.closeShareWindow)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.closeReactionWindow)
    document.removeEventListener('click', this.closeShareWindow)
  }
}

</script>

<style scoped lang="scss">
.main__article--block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.read__more--link {
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-white);
  background-color: var(--color-hippie-blue);
  padding: 12px 80px;
}

.article__title {
  margin: 0;
  color: var(--color-white);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.article__content--reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
}

.reactions__block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.reaction {
  height: 32px;
  background: var(--color-seashell);
  border-radius: 50px;
  padding: 8px 12px;
  color: var(--color-silver-chalice);
  width: auto;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
}

.stats__separator {
  margin: 0 8px;
}

.stats__reposts {
  color: var(--color-white);
  display: flex;
  font-size: 16px;

  * {
    line-height: 1;
  }
}

.article__content--section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article__block {
  max-width: 100%;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 24px;
}

.article__header--section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.author__avatar--name--time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author__name--time {
  display: flex;
  flex-direction: column;

  span {
    color: var(--color-mine-shaft);
    font-size: 18px;
  }

  small {
    color: var(--color-silver-chalice);
    font-size: 14px;
  }
}

.article__content--item {
  position: relative;
  display: flex;

  &:before {
    display: flex;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    backdrop-filter: blur(8px);
    z-index: 1;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
}

.article__content--image {
  width: 100%;
  border-radius: 15px;
  height: 80%;
}

.article__content--details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 14px;
  position: absolute;
  bottom: 24px;
  padding: 0 18px;
  width: 100%;
  z-index: 200;
}

.article__detail--block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.share__item--divider {
  margin: 8px 0;
}

.main__comment--form {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  transition: all 0.3s;
  opacity: 0;
}

.reaction__item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.like__button svg,
.comment__button svg,
.share__button svg {
  margin-right: 12px;
}

.share__item span {
  font-size: 14px;
}

.share__item {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  padding: 5px 10px;
}

.share__item:hover {
  background-color: var(--color-seashell);
  border-radius: 10px;
}

.share__menu {
  display: flex;
  flex-direction: column;
}

.share__menu,
.reaction__menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.reaction__menu {
  display: flex;
  gap: 16px;
}

.reaction__buttons--block,
.share__buttons--block {
  position: relative;
}

.reactions__buttons,
.share__buttons {
  position: absolute;
  bottom: 45px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: var(--color-white);
}

.reaction__window,
.share__window {
  display: flex;
  gap: 18px;
  padding: 12px;
}

.footer__buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
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
  justify-content: center;
  color: var(--color-gray);
  cursor: pointer;
  padding: 0 20px;
}

.like__button:hover,
.comment__button:hover,
.share__button:hover {
  background-color: var(--color-seashell);
  border-radius: 10px;
}

@media (min-width: 1280px) {
  .comment__button,
  .share__button,
  .like__button {
    height: 43px;
  }

  .share__item {
    width: 220px;
  }
}

@media (max-width: 767px) {}

@media (min-width: 1200px) {
  .article__block {
    max-width: 560px;
  }
}

@media (max-width: 1920px) {}
</style>

<template>
  <footer class="article__footer">
    <div class="footer__buttons">
      <div class="reaction__buttons--block" ref="reactionWindow">
        <div class="reactions__buttons">
          <div v-if="isReactionWindowOpen" class="reaction__window" >
            <ul class="reaction__menu">
              <li
                v-for="(reaction, index) in footerReactsIcons"
                :key="index"
                class="reaction__item"
              >
                <component :is="reaction.icon"/>
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

      <div class="comment__button" @click="toggleForm">
        <CommentIcon/>
        <span>{{ $t('buttons.comment') }}</span>
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
        <div
          class="share__button open-share-button"
          @click="openShareWindow"
        >
          <ShareIcon />
          <span>{{ $t('buttons.share') }}</span>
        </div>
      </div>
    </div>

    <SampleDivider v-if="isFormOpen"/>

    <div class="main__comment--form" v-if="isFormOpen">
      <Transition name="fade">
        <ReplyCommentForm />
      </Transition>

      <Transition name="fade">
        <CommentForm />
      </Transition>
    </div>
  </footer>
</template>

<script>
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
import SampleDivider from '@/components/ui/SampleDivider.vue'
import SendMenuIcon from '@/components/icons/MenuDetails/SendMenuIcon.vue'
import CommentIcon from '@/components/icons/CommentIcon.vue'
import ShareIcon from '@/components/icons/ShareIcon.vue'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import MyGroupIcon from '@/components/icons/MyGroupIcon.vue'
import ShareMenuIcon from '@/components/icons/MenuDetails/ShareMenuIcon.vue'
import ReplyCommentForm from '@/components/ui/Comment/ReplyCommentForm.vue'
export default {
  components: {
    SendMenuIcon,
    HeartIcon,
    CommentIcon,
    ShareMenuIcon,
    MyGroupIcon,
    ShareIcon,
    SampleDivider,
    ReplyCommentForm,
    CommentForm
  },
  data () {
    return {
      footerReactsIcons: [
        { icon: BigLikeIcon },
        { icon: BigDislikeIcon },
        { icon: BigLoveIcon },
        { icon: BigFireIcon },
        { icon: BigAngryIcon },
        { icon: BigScaredIcon },
        { icon: BigLaughIcon },
        { icon: BigThinkIcon },
        { icon: BigSadIcon }
      ],
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isFormOpen: false
    }
  },
  methods: {
    toggleForm () {
      this.isFormOpen = !this.isFormOpen
      this.$emit('toggle-menu')
    },
    openReactionWindow () {
      this.isReactionWindowOpen = !this.isReactionWindowOpen
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

.article__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.reaction__buttons--block,
.share__buttons--block {
  position: relative;

  .reactions__buttons,
  .share__buttons {
    position: absolute;
    bottom: 45px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: var(--color-white);
    z-index: 100;

    .reaction__window,
    .share__window {
      display: flex;
      gap: 18px;
      padding: 12px;

      .share__menu,
      .reaction__menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  }
}

.share__menu {
  flex-direction: column;
}

.reaction__menu {
  gap: 16px;
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

@media (max-width: 576px) {
  .comment__button span,
  .share__button span {
    display: none;
  }

  .like__button,
  .comment__button,
  .share__button {
    padding: 0 15px;
  }

  .footer__buttons {
    justify-content: flex-start;
  }
}

@media (min-width: 1280px) {
  .comment__button,
  .share__button,
  .like__button {
    height: 43px;
  }

  .share__item {
    min-width: 220px;
  }
}

.share__item--divider {
  margin: 8px 0;
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

.main__comment--form {
  width: 100%;
}
</style>

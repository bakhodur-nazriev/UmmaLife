<template>
  <footer class="post__footer">
    <div class="footer__buttons">
      <div class="reaction__buttons--block" ref="reactionWindow">
        <div class="reactions__buttons">
          <div v-if="isReactionWindowOpen" class="reaction__window" >
            <ul class="reaction__menu">
              <li
                v-for="(icon, index) in iconReactions"
                :key="index"
                class="reaction__item"
              >
                <component :is="icon.name" />
              </li>
            </ul>
          </div>
        </div>
        <div
          class="like__button open-reaction-button"
          @click="openReactionWindow"
        >
          <HeartIcon />
          <span>{{ $t('buttons.like') }}</span>
        </div>
      </div>

      <div
        class="comment__button"
        @click="toggleForm"
      >
        <CommentIcon />
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
              <sample-divider class="share__item--divider"/>
              <li class="share__item">
                <ShareMenuIcon />
                <span>{{ $t('buttons.share_on_my_page') }}</span>
              </li>
              <sample-divider class="share__item--divider"/>
              <li class="share__item">
                <MyGroupIcon/>
                <span>{{ $t('buttons.share_in_group') }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="share__button open-share-button" @click="openShareWindow">
          <ShareIcon />
          <span>{{ $t('buttons.share') }}</span>
        </div>
      </div>
    </div>

    <sample-divider v-if="isFormOpen" />

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
import BigSadIcon from '@/components/icons/reactions/men/big/SadIcon.vue'
import BigLikeIcon from '@/components/icons/reactions/men/big/LikeIcon.vue'
import SendMenuIcon from '@/components/icons/MenuDetails/SendMenuIcon.vue'
import BigAngryIcon from '@/components/icons/reactions/men/big/AngryIcon.vue'
import MyGroupIcon from '@/components/icons/MyGroupIcon.vue'
import BigLoveIcon from '@/components/icons/reactions/men/big/LoveIcon.vue'
import BigDislikeIcon from '@/components/icons/reactions/men/big/DislikeIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import BigThinkIcon from '@/components/icons/reactions/men/big/ThinkIcon.vue'
import ShareIcon from '@/components/icons/ShareIcon.vue'
import BigFireIcon from '@/components/icons/reactions/men/big/FireIcon.vue'
import CommentIcon from '@/components/icons/CommentIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import ShareMenuIcon from '@/components/icons/MenuDetails/ShareMenuIcon.vue'
import BigScaredIcon from '@/components/icons/reactions/men/big/ScaredIcon.vue'
import BigLaughIcon from '@/components/icons/reactions/men/big/LaughIcon.vue'
import ReplyCommentForm from '@/components/ui/Comment/ReplyCommentForm.vue'

export default {
  components: {
    SendMenuIcon,
    MyGroupIcon,
    ReplyCommentForm,
    HeartIcon,
    ShareIcon,
    CommentIcon,
    SampleDivider,
    CommentForm,
    ShareMenuIcon
  },
  data () {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isFormOpen: false,
      iconReactions: [
        { name: BigSadIcon },
        { name: BigLikeIcon },
        { name: SendMenuIcon },
        { name: BigAngryIcon },
        { name: MyGroupIcon },
        { name: BigLoveIcon },
        { name: BigDislikeIcon },
        { name: BigThinkIcon },
        { name: BigFireIcon },
        { name: BigScaredIcon },
        { name: BigLaughIcon }
      ]
    }
  },
  mounted () {
    document.addEventListener('click', this.closeReactionWindow)
    document.addEventListener('click', this.closeShareWindow)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.closeReactionWindow)
    document.removeEventListener('click', this.closeShareWindow)
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
  }
}
</script>

<style scoped>
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

.share__item {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  padding: 5px 10px;

  &:hover {
    background-color: var(--color-seashell);
    border-radius: 10px;
  }

  span {
    font-size: 14px;
  }
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
  width: max-content;
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
  gap: 12px;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  cursor: pointer;

  &:hover {
    background-color: var(--color-seashell);
    border-radius: 15px;
  }
}

@media (max-width: 576px) {
  .comment__button span,
  .share__button span {
    display: none;
  }

  .footer__buttons {
    justify-content: flex-start;
  }

  .like__button,
  .comment__button,
  .share__button {
    padding: 0 10px;

    &:hover {
      background: none;
      border-radius: 0;
    }
  }
}

@media (min-width: 1280px) {
  .comment__button,
  .share__button,
  .like__button {
    width: 210px;
    height: 43px;
  }

  .share__item {
    width: 220px;
  }
}
</style>

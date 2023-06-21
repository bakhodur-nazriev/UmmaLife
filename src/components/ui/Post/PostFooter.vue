<template>
  <footer class="post__footer">
    <div class="footer__buttons">
      <div class="reaction__buttons--block" ref="reactionWindow">
        <div class="reactions__buttons">
          <div v-if="isReactionWindowOpen" class="reaction__window" >
            <ul class="reaction__menu">
              <li><big-like-icon></big-like-icon></li>
              <li><big-dislike-icon></big-dislike-icon></li>
              <li><big-love-icon></big-love-icon></li>
              <li><big-laugh-icon></big-laugh-icon></li>
              <li><big-fire-icon></big-fire-icon></li>
              <li><big-think-icon></big-think-icon></li>
              <li><big-angry-icon></big-angry-icon></li>
              <li><big-sad-icon></big-sad-icon></li>
              <li><big-scared-icon></big-scared-icon></li>
            </ul>
          </div>
        </div>
        <div class="like__button open-reaction-button" @click="openReactionWindow">
          <heart-icon></heart-icon>
          {{ $t('buttons.like') }}
        </div>
      </div>

      <div class="comment__button" @click="toggleForm">
        <comment-icon></comment-icon>
        {{ $t('buttons.comment') }}
      </div>

      <div class="share__buttons--block" ref="shareWindow">
        <div class="share__buttons">
          <div v-if="isShareWindowOpen" class="share__window">
            <ul class="share__menu">
              <li class="share__item">
                <send-menu-icon class="share__item--divider"/>
                <span>{{ $t('buttons.open_like_message') }}</span>
              </li>
              <sample-divider class="share__item--divider"/>
              <li class="share__item">
                <share-menu-icon />
                <span>{{ $t('buttons.share_on_my_page') }}</span>
              </li>
              <sample-divider class="share__item--divider"/>
              <li class="share__item">
                <my-group-icon />
                <span>{{ $t('buttons.share_in_group') }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="share__button open-share-button" @click="openShareWindow">
          <share-icon></share-icon>
          {{ $t('buttons.share') }}
        </div>
      </div>
    </div>

    <ReplyCommentForm />
    <Transition name="fade">
      <comment-form v-if="isFormOpen"/>
    </Transition>
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
    ReplyCommentForm,
    BigSadIcon,
    BigLikeIcon,
    SendMenuIcon,
    BigAngryIcon,
    MyGroupIcon,
    BigLoveIcon,
    BigDislikeIcon,
    HeartIcon,
    BigThinkIcon,
    ShareIcon,
    BigFireIcon,
    CommentIcon,
    SampleDivider,
    CommentForm,
    ShareMenuIcon,
    BigScaredIcon,
    BigLaughIcon
  },
  data () {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isFormOpen: true
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sample__divider {
  margin: 0;
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
  background-color: var(--color-divider);
  border-radius: 10px;
}

.share__menu {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.share__menu,
.reaction__menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.reaction__menu {
  display: flex;
  gap: 18px;
}

.reaction__buttons--block,
.share__buttons--block {
  position: relative;
}

.reactions__buttons,
.share__buttons {
  position: absolute;
  bottom: 42px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: var(--color-background);
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
  color: var(--color-gray-4);
  cursor: pointer;
}

.like__button:hover,
.comment__button:hover,
.share__button:hover {
  background-color: var(--color-divider);
  border-radius: 15px;
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
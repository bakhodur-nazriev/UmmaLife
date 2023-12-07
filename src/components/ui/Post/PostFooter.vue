<template>
  <footer class="post__footer">
    <div class="footer__buttons">
      <div class="reaction__buttons--block" ref="reactionWindow">
        <div class="reactions__buttons" v-if="isReactionWindowOpen">
          <div class="reaction__window">
            <ul class="reaction__menu">
              <li
                v-for="(reaction, index) in reactionsIcon"
                :key="index"
                class="reaction__item"
              >
                <span class="reaction__item--tooltip">{{ reaction.tooltip }}</span>
                <component :is="reaction.icon"/>
              </li>
            </ul>
          </div>
        </div>
        <div class="like__button open-reaction-button" @click="openReactionWindow">
          <HeartIcon/>
          <span>{{ $t('buttons.like') }}</span>
        </div>
      </div>

      <div class="comment__button" @click="toggleForm">
        <CommentIcon/>
        <span>{{ $t('buttons.comment') }}</span>
      </div>

      <div class="share__buttons--block" ref="shareWindow">
        <div class="share__buttons" v-if="isShareWindowOpen">
          <div class="share__window">
            <ul class="share__menu">
              <li class="share__item">
                <SendMenuIcon/>
                <span>{{ $t('buttons.open_like_message') }}</span>
              </li>

              <SampleDivider class="share__item--divider"/>

              <li class="share__item">
                <ShareMenuIcon/>
                <span>{{ $t('buttons.share_on_my_page') }}</span>
              </li>

              <SampleDivider class="share__item--divider"/>

              <li class="share__item">
                <MyGroupIcon/>
                <span>{{ $t('buttons.share_in_group') }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="share__button open-share-button" @click="openShareWindow">
          <ShareIcon/>
          <span>{{ $t('buttons.share') }}</span>
        </div>
      </div>
    </div>

    <SampleDivider v-if="isFormOpen"/>

    <div
      ref="commentForm"
      v-if="isFormOpen"
      :class="['main__comment--form', isFormOpen ? 'main__comment--form--shown' : '']"
    >
      <ReplyCommentForm @close-comment-window="toggleForm"/>

      <div class="enter-comment__form">
        <CommentForm/>
      </div>
    </div>
  </footer>
</template>
<script>
import BigSadIcon from '@/components/icons/reactions/men/big/BigSadIcon.vue'
import BigLikeIcon from '@/components/icons/reactions/men/big/BigLikeIcon.vue'
import SendMenuIcon from '@/components/icons/MenuDetails/SendMenuIcon.vue'
import BigAngryIcon from '@/components/icons/reactions/men/big/BigAngryIcon.vue'
import MyGroupIcon from '@/components/icons/MyGroupIcon.vue'
import BigLoveIcon from '@/components/icons/reactions/men/big/BigLoveIcon.vue'
import BigDislikeIcon from '@/components/icons/reactions/men/big/BigDislikeIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import BigThinkIcon from '@/components/icons/reactions/men/big/BigThinkIcon.vue'
import ShareIcon from '@/components/icons/ShareIcon.vue'
import BigFireIcon from '@/components/icons/reactions/men/big/BigFireIcon.vue'
import CommentIcon from '@/components/icons/CommentIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import ShareMenuIcon from '@/components/icons/MenuDetails/ShareMenuIcon.vue'
import BigScaredIcon from '@/components/icons/reactions/men/big/BigScaredIcon.vue'
import BigLaughIcon from '@/components/icons/reactions/men/big/BigLaughIcon.vue'
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
  props: {
    reactions: {
      type: Object
    }
  },
  data() {
    return {
      reactionsIcon: [
        {id: 1, icon: BigLikeIcon, tooltip: this.$t('reaction_tooltip.like')},
        {id: 2, icon: BigDislikeIcon, tooltip: this.$t('reaction_tooltip.dislike')},
        {id: 3, icon: BigLoveIcon, tooltip: this.$t('reaction_tooltip.love')},
        {id: 4, icon: BigFireIcon, tooltip: this.$t('reaction_tooltip.fire')},
        {id: 5, icon: BigAngryIcon, tooltip: this.$t('reaction_tooltip.angry')},
        {id: 6, icon: BigScaredIcon, tooltip: this.$t('reaction_tooltip.scared')},
        {id: 7, icon: BigLaughIcon, tooltip: this.$t('reaction_tooltip.laugh')},
        {id: 8, icon: BigThinkIcon, tooltip: this.$t('reaction_tooltip.think')},
        {id: 9, icon: BigSadIcon, tooltip: this.$t('reaction_tooltip.sad')}
      ],
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isFormOpen: false
    }
  },
  methods: {
    toggleForm() {
      this.isFormOpen = !this.isFormOpen
      this.$emit('toggle-menu')
    },
    openReactionWindow() {
      this.isReactionWindowOpen = !this.isReactionWindowOpen
    },
    openShareWindow() {
      this.isShareWindowOpen = !this.isShareWindowOpen
    },
    closeReactionWindow(event) {
      const reactionWindow = this.$refs.reactionWindow
      const openReactionButton = document.querySelector('.open-reaction-button')

      if (
        reactionWindow &&
        !reactionWindow.contains(event.target) &&
        event.target !== openReactionButton
      ) {
        this.isReactionWindowOpen = false
      }
    },
    closeShareWindow(event) {
      const shareWindow = this.$refs.shareWindow
      const openShareButton = document.querySelector('.open-share-button')

      if (shareWindow && !shareWindow.contains(event.target) && event.target !== openShareButton) {
        this.isShareWindowOpen = false
      }
    }
  },
  mounted() {
    // console.log(this.reactions)
    document.addEventListener('click', this.closeReactionWindow)
    document.addEventListener('click', this.closeShareWindow)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeReactionWindow)
    document.removeEventListener('click', this.closeShareWindow)
  }
}
</script>

<style lang="scss">
.share__buttons {
  animation: share__buttons 0.2s;
}

@keyframes share__buttons {
  0% {
    transform: scale(0.5);
    transform-origin: center bottom;
  }
  100% {
    transform: scale(1);
    transform-origin: center bottom;
  }
}

.reactions__buttons {
  animation: reactions__buttons 0.2s;
}

@keyframes reactions__buttons {
  0% {
    transform: scale(0.5);
    transform-origin: left bottom;
  }
  100% {
    transform: scale(1);
    transform-origin: left bottom;
  }
}

.reaction__item {
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;

    svg {
      transition: all 0.3s ease;
      transform: scale(1.3);
    }

    .reaction__item--tooltip {
      display: flex;
    }
  }

  &--tooltip {
    display: none;
    position: absolute;
    bottom: 35px;
    width: max-content;
    background-color: var(--color-mine-shaft);
    padding: 2px 8px;
    color: var(--color-white);
    border-radius: 15px;
    font-size: 12px;
    opacity: 0.8;
    transition: all 0.3s ease;
  }
}

.share__item--divider {
  margin: 2px auto;
  width: 92%;
}

.share__item {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  padding: 5px 10px;
  border-radius: 10px;
  color: var(--color-mine-shaft);

  &:hover {
    background-color: var(--color-seashell);
    transition: all 0.15s ease-in-out;
  }

  span {
    font-size: 14px;
  }
}

.share__menu {
  list-style: none;
  padding: 10px;
  margin: 0;
  width: max-content;
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
  bottom: 35px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: var(--color-white);
  z-index: 50;
}

.reaction__window,
.share__window {
  display: flex;
  gap: 18px;
  padding: 8px;
  width: max-content;
}

.reaction__window {
  padding: 12px 10px;
}

.footer__buttons {
  display: flex;
  justify-content: space-between;
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
  user-select: none;
  border-radius: 10px;
  padding: 0 20px;

  &:hover {
    background-color: var(--color-seashell);
    transition: all 0.15s ease-in-out;
  }
}

@media (max-width: 576px) {
  // .reaction__item {
  //   svg {
  //     width: 18px;
  //     height: 18px;
  //   }
  // }

  .share__item {
    gap: 6px;
  }

  .reaction__window,
  .share__window {
    padding: 5px;
  }

  .reaction__menu {
    gap: 14px;
  }

  .reaction__window {
    padding: 10px 8px;
  }

  .enter-comment__form {
    background-color: var(--color-white);
    filter: drop-shadow(10px 0px 40px rgba(108, 108, 108, 0.15));
  }

  .comment__button span,
  .share__button span {
    display: none;
  }

  .footer__buttons {
    justify-content: flex-start;
    gap: 20px;
  }

  .like__button,
  .comment__button,
  .share__button {
    padding: 0;

    svg {
      width: 22px;
      height: 22px;
    }

    span {
      line-height: normal;
    }

    &:hover {
      background: none;
      border-radius: 0;
    }
  }

  .main__comment--form {
    background-color: var(--color-white);
    box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.15);
    border-radius: 20px 20px 0 0;
    width: 100%;
    margin: 0;
    z-index: 99;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 14px;

    &--shown::before {
      display: none;
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 855px;
      background: rgba(31, 31, 31, 0.3);
      backdrop-filter: blur(3px);
      transition: 0.3s;
      opacity: 1;
      pointer-events: none;
    }
  }
}

@media (min-width: 768px) {
  .main__comment--form {
    width: 100%;

    &::before {
      display: none;
    }
  }
}

@media (min-width: 1280px) {
  .reactions__buttons,
  .share__buttons {
    bottom: 45px;
  }
}

.comment__button,
.share__button,
.like__button {
  height: 43px;
}
</style>

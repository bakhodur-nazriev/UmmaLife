<template>
  <div class="shorts__modal--overlay">
    <div class="shorts__modal parent" v-on-click-outside="closeDropdown">
      <div class="shorts__video video">
        <ShortsCard class="isModal" />
      </div>
      <div class="shorts__content">
        <div class="shorts__info content">
          <div class="shorts__info--top top">
            <div class="shorts__user--wrapper">
              <div class="shorts__user">
                <img src="/images/users/jeff.png" alt="jeff" class="shorts__user--img" />
                <div class="shorts__user--name">arabman</div>
                <div class="shorts__user--bage">
                  <BageIcon />
                </div>
              </div>
              <button class="shorts__info--details">
                <MenuBlackDetailsIcon />
              </button>
            </div>

            <div class="shorts__info--text">
              Небольшой влог о самом высокоразвитом городе мира - Дубае. Почему мы выбрали этот
              город для...
            </div>
            <div class="shorts__bottom">
              <div class="shorts__bottom--views">1 тыс. просмотров</div>
              <span>|</span>
              <div class="shorts__bottom--date">20.08.2022</div>
            </div>
            <div class="shorts__bottom--comments">
              <p>Комментарии</p>
              <span>415</span>
            </div>
          </div>
          <div class="shorts__comments comment">
            <ShortsBlockComments v-for="i in 10" :key="i" />
          </div>
          <div class="shorts__info--bottom bottom">
            <div class="shorts__info--reactions">
              <div class="reaction active">
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
            </div>
            <div class="shorts__comments--actions">
              <div class="actions__btn">
                <HeartIcon />
                <span>{{ $t('buttons.like') }}</span>
              </div>
              <div class="actions__btn">
                <ShareIcon />
                <span>{{ $t('buttons.share') }}</span>
              </div>
            </div>
            <form class="shorts__comments--form">
              <div class="form__input">
                <img src="/images/users/jeff.png" alt="jeff" />
                <textarea
                  type="text"
                  :placeholder="$t('labels.comments.plural') + '...'"
                  rows="1"
                />
              </div>
              <button class="form__btn" type="submit">
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
import ShortsCard from '@/components/ui/Shorts/ShortsCard.vue'
import ShortsBlockComments from '@/components/ui/Shorts/ShortsBlockComments.vue'
import BageIcon from '@/components/icons/BageIcon.vue'
import MenuBlackDetailsIcon from '@/components/icons/MenuBlackDetailsIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/SmallLoveIcon.vue'
import LikeIcon from '@/components/icons/reactions/men/small/SmallLikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/SmallDislikeIcon.vue'
import HeartIcon from '@/components/icons/shorts/HeartIcon.vue'
import ShareIcon from '@/components/icons/shorts/ShareIcon.vue'
import SendIcon from '@/components/icons/shorts/SendIcon.vue'

const emit = defineEmits(['handleClickOutside'])

const closeDropdown = () => {
  emit('handleClickOutside')
}
</script>

<style lang="scss">
.shorts {
  &__modal {
    max-width: 1015px;
    width: 100%;
    background: var(--color-white);
    max-height: 916px;
    height: 100%;
    display: grid;
    grid-template-columns: 515px 500px;
    &--overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($color: #000000, $alpha: 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }
  }

  &__user {
    &--wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
  }
}
@media (max-width: 1850px) {
  .parent {
    max-height: 95vh;
    position: relative;
    .video {
      max-height: 95vh;
    }

    .bottom {
      position: static;
      .shorts__comment--form {
        padding-left: 18px;
        padding-right: 18px;
        padding-bottom: 14px;
      }
    }
  }
}
</style>

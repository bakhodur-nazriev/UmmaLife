<template>
  <MainLayout>
    <div class="detail">
      <div class="detail__wrapper">
        <div class="detail__main">
          <div class="detail__video">
            <VideoPlayer
              src="/video/video.mp4"
              poster="/images/message/video-poster.jpg"
              controls
              :volume="1"
            >
              <template v-slot="{ player, state }">
                <div class="custom-player-controls">
                  <div
                    v-if="!state.playing"
                    @click="state.playing ? player.pause() : player.play()"
                    class="play-button"
                  >
                    <VideoPlayIcon class="play-icon__button-icon-big" />
                    <SmallVideoPlayIcon class="play-icon__button-icon-small" />
                  </div>
                </div>
              </template>
            </VideoPlayer>
          </div>
          <div class="detail__info">
            <div class="detail__info--top">
              <div class="detail__info--title">Название видео, которое вы просматриваете</div>
              <div class="detail__info--wrapper">
                <div class="detail__info--left">
                  <div class="detail__author">
                    <img src="/images/users/jeff.png" alt="jeff" class="detail__author--img" />
                    <div class="detail__author--info">
                      <div class="detail__author--name">Максуд Максудов</div>
                      <div class="detail__author--subs">49,5 тыс. подписчиков</div>
                    </div>
                  </div>
                  <SampleButton title="Подписаться" width="152px" padding="13px" :size="14" />
                </div>
                <div class="detail__info--right">
                  <SampleButton
                    title="Поделиться"
                    width="156px"
                    padding="12px"
                    :size="14"
                    icon="true"
                    color="default_flex"
                  >
                    <ShareMenuIcon color="#1f1f1f" width="16" height="16" />
                  </SampleButton>
                  <SampleButton
                    title="Сохранить"
                    width="156px"
                    padding="12px"
                    :size="14"
                    icon="true"
                    color="default_flex"
                  >
                    <BookmarkIcon color="#1f1f1f" />
                  </SampleButton>
                </div>
              </div>
            </div>
            <div class="detail__views">349 просмотров - 1 час назад</div>
            <div class="detail__reactions">
              <PostReactions />
            </div>
            <div class="detail__desc">
              <p :class="isNotShort ? '' : 'short'">
                Далеко-далеко за, словесными горами в стране гласных и согласных живут рыбные
                тексты. Там вдали ему не сих собрал своих своего до, злых что напоивший, однажды
                реторический силуэт парадигматическая снова текстами семантика единственное?
                Далеко-далеко за, словесными горами в стране гласных и согласных живут рыбные
                тексты. Там вдали ему не сих собрал своих своего до, злых что напоивший, однажды
                реторический силуэт парадигматическая снова текстами семантика единственное?
                Далеко-далеко за, словесными горами в стране гласных и согласных живут рыбные
                тексты. Там вдали ему не сих собрал своих своего до, злых что напоивший, однажды
                реторический силуэт парадигматическая снова текстами семантика единственное?
              </p>
              <span @click="isNotShort = !isNotShort">
                {{ isNotShort ? 'развернуть' : 'ещё' }}
              </span>
            </div>
            <div class="detail__comments">
              <div class="detail__comments--top">
                <div class="detail__comments--length">
                  <p>Комментарии</p>
                  <span>5</span>
                </div>
                <div class="detail__comments--sort"><CommentFilter /> <span>Сортировка</span></div>
              </div>
              <div
                ref="commentForm"
                :class="['main__comment--form', isFormOpen ? 'main__comment--form--shown' : '']"
              >
                <ReplyCommentForm @close-comment-window="isFormOpen = !isFormOpen" />

                <div class="enter-comment__form">
                  <CommentForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail__aside">
          <AsideVideoDetail v-for="index in 10" :index="index" :key="index" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { VideoPlayer } from '@videojs-player/vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import ShareMenuIcon from '@/components/icons/MenuDetails/ShareMenuIcon.vue'
import BookmarkIcon from '@/components/icons/BookmarkIcon.vue'
import AsideVideoDetail from '@/components/video/AsideVideoDetail.vue'
import PostReactions from '@/components/ui/Post/PostReactions.vue'
import ReplyCommentForm from '@/components/ui/Comment/ReplyCommentForm.vue'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import CommentFilter from '@/components/ui/MenuDetails/CommentFilter.vue'

import { ref } from 'vue'

const isNotShort = ref(false)
const isFormOpen = ref(false)
</script>

<style lang="scss">
.detail {
  max-width: 1727px;
  width: 100%;
  padding: 0 45px 0 80px;
  margin: 20px auto;
  @media (max-width: 1727px) {
    padding: 0 24px;
  }
  &__wrapper {
    display: flex;
    gap: 20px;
  }
  &__main {
    max-width: 1280px;
    width: 100%;
  }
  &__aside {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 427px;
    width: 100%;
  }
  &__video {
    width: 100%;
    height: 720px;
    @media (max-width: 1800px) {
      height: 600px;
    }
    @media (max-width: 1600px) {
      height: 520px;
    }
    @media (max-width: 1500px) {
      height: 450px;
    }
    .video-js {
      width: 100% !important;
      height: 100% !important;
      display: block;
      background: transparent;
      .vjs-poster img {
        object-fit: cover;
      }
      .vjs-tech {
        object-fit: cover !important;
        object-position: center !important;
        overflow: hidden;
      }
      .vjs-big-play-button {
        display: none !important;
      }
    }
  }
  &__info {
    background-color: var(--color-white);
    padding: 22px 24px 0 24px;
    &--title {
      font-size: 20px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 16px;
    }
    &--wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    &--left {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    &--right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
  &__author {
    display: flex;
    align-items: center;
    gap: 8px;
    &--img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
    }
    &--name {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 4px;
    }
    &--subs {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-gray);
    }
  }
  &__views {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-gray);
    margin-bottom: 8px;
  }
  &__reactions {
    padding-bottom: 20px;
  }
  &__desc {
    background-color: var(--color-gallery-first);
    padding: 12px 16px;
    border-radius: 10px;
    position: relative;

    p {
      &.short {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
      }
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
      color: var(--color-mine-shaft);
    }
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: 140%;
      color: var(--color-green);
      cursor: pointer;
      position: absolute;
      bottom: 13px;
      right: 3px;
    }
  }
  &__comments {
    &--top {
      display: flex;
      align-items: center;
      gap: 40px;
      padding: 20px 0;
      border-bottom: 1px solid var(--color-gallery-first);
      margin-bottom: 20px;
    }
    &--length {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-gray);
      }
    }
    &--sort {
      display: flex;
      align-items: center;
      gap: 8px;
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
}
</style>

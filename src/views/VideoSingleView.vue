<template>
  <div class="video__single">
    <div class="video__single--container">
      <div class="muvi__mobile--nav white" v-if="width < 767">
        <div class="library__actions--btn" @click="$router.go(-1)">
          <ArrowLeftIcon />
        </div>
        <div class="muvi__mobile--nav-title">{{ $t('video.video_page') }}</div>
        <div class="left"></div>
      </div>
      <div class="video__single--block">
        <div class="video__page--card">
          <div class="video__page--card__img">
            <img :src="videoCard.img" :alt="videoCard.name" />
          </div>
          <div class="video__page--card__info">
            <div class="video__page--card__top">
              <div class="video__page--card__name">{{ videoCard.name }}</div>
              <div class="video__page--card__right">
                <div
                  class="video__page--card__saved"
                  @click.stop="videoCard.isSaved = !videoCard.isSaved"
                >
                  <BookmarkFilledIcon v-if="videoCard.isSaved" />
                  <BookmarkIcon v-else />
                </div>
                <div class="video__page--card__rating"><StarIcon /> {{ videoCard.rating }}</div>
              </div>
            </div>
            <ul class="video__page--card__list">
              <li>
                <span>{{ $t('video.parametrs.country') }}:</span>
                <p>{{ videoCard.country }}</p>
              </li>
              <li>
                <span>{{ $t('video.parametrs.year') }}:</span>
                <p>{{ videoCard.year }}</p>
              </li>
              <li>
                <span>{{ $t('video.parametrs.genre') }}:</span>
                <p>{{ videoCard.genre }}</p>
              </li>
              <li>
                <span>{{ $t('video.parametrs.creator') }}:</span>
                <p>{{ videoCard.creator }}</p>
              </li>
              <li>
                <span>{{ $t('video.parametrs.duration') }}:</span>
                <p>{{ videoCard.duration }} {{ $t('video.parametrs.minut') }}</p>
              </li>
              <li>
                <span>{{ $t('video.parametrs.views') }}:</span>
                <p>1748</p>
              </li>
            </ul>
            <div class="library__detail__main--social">
              <div class="library__detail__main--social-title">Поделиться в:</div>
              <div class="library__detail__main--social-wrapper">
                <a href="#" class="library__detail__main--social-link"
                  ><img src="@/assets/images/social/facebook.png" alt="facebook" /></a
                ><a href="#" class="library__detail__main--social-link"
                  ><img src="@/assets/images/social/twitter.png" alt="twitter" /></a
                ><a href="#" class="library__detail__main--social-link"
                  ><img src="@/assets/images/social/telegram.png" alt="telegram" /></a
                ><a href="#" class="library__detail__main--social-link"
                  ><img src="@/assets/images/social/whatsapp.png" alt="whatsapp"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="detail__video video__single--video">
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
        <div class="video__single--description">
          <h3>{{ $t('library.description') }}:</h3>
          <span class="video__page--card__description--text">
            {{
              !videoCard.isExtended && videoCard.description.length > 450
                ? videoCard.description.slice(0, 450) + '...'
                : videoCard.description
            }}
          </span>
          <span
            class="video__page--card__read"
            v-if="!videoCard.isExtended && videoCard.description.length > 450"
            @click="videoCard.isExtended = true"
            >{{ $t('video.read_more') }}</span
          >
        </div>
        <LibrayMobileReccomended title="video.related_movies" />
        <div class="detail__comments video__single--comments">
          <div class="detail__comments--top">
            <div class="detail__comments--length">
              <p>{{ $t('library.comments') }}</p>
              <span>5</span>
            </div>
            <div class="detail__comments--sort">
              <CommentFilter :isFilterWindowOpen="isFilterWindowOpen" />
              <span>{{ $t('library.sort') }}</span>
            </div>
          </div>
          <div
            ref="commentForm"
            :class="[
              'main__comment--form book__comment',
              isFormOpen ? 'main__comment--form--shown' : ''
            ]"
          >
            <ReplyCommentForm @close-comment-window="isFormOpen = !isFormOpen" />

            <div class="enter-comment__form">
              <CommentForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { VideoPlayer } from '@videojs-player/vue'

import BookmarkIcon from '@/components/icons/BookmarkIcon.vue'
import BookmarkFilledIcon from '@/components/icons/BookmarkFilledIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import LibrayMobileReccomended from '@/components/library/LibrayMobileReccomended.vue'
import CommentFilter from '@/components/ui/MenuDetails/CommentFilter.vue'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import ReplyCommentForm from '@/components/ui/Comment/ReplyCommentForm.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'

const { width } = useWindowSize()
const isFormOpen = ref(false)
const isFilterWindowOpen = ref(false)

const videoCard = ref({
  id: 1,
  img: '/images/books/book1.jpg',
  name: 'Мухаммад Фатих',
  country: 'Турция',
  year: '2015',
  genre: 'Исторические',
  creator: 'Хэйтем Али',
  duration: 148,
  rating: 4.9,
  isSaved: false,
  isExtended: false,
  description:
    'Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Агентство, наш. Букв lorem гор свою, дал всеми даль пустился встретил безопасную не, журчит над о он домах там пунктуация по всей продолжил речью себя но послушавшись строчка, рыбными запятых. Безопасную, дал. Заголовок даже деревни, это до текста лучше маленький, жаренные толку свой коварных своего ему бросил назад сих. Ведущими повстречался гор города? Диких, снова. Назад, одна продолжил. Гор, оксмокс предупредила но все взгляд безорфографичный путь последний продолжил напоивший своих подпоясал силуэт повстречался вопроса рекламных свою предупреждал! Текст текстов по всей пояс ipsum заглавных, вопрос строчка океана если грамматики парадигматическая маленькая повстречался! Последний наш всемогущая lorem путь имеет использовало! Lorem ты не все вдали сих, вскоре до необходимыми вопрос запятой меня последний назад дал грамматики злых продолжил приставка, безорфографичный путь знаках себя? Дал безорфографичный приставка одна алфавит то подпоясал реторический по всей пунктуация гор наш дорогу силуэт живет, вершину власти которое, повстречался курсивных.'
})
</script>

<style lang="scss" scoped>
.video__single {
  width: 100%;
  &--container {
    max-width: 938px;
    width: 100%;
    padding: 0 16px;
    margin: 24px auto;
    @media (max-width: 767px) {
      margin: 0;
      max-width: 100%;
      padding: 0;
    }
  }
  &--block {
    background-color: var(--color-white);
    border-radius: 20px;
    padding: 24px;
    padding-bottom: 0;
    @media (max-width: 767px) {
      padding: 20px 16px 64px;
    }
  }
  .video__page--card__list {
    li {
      span {
        max-width: 190px;
      }
    }
  }
  .video__page--card {
    padding: 0;
    margin-bottom: 36px;
    @media (max-width: 767px) {
      gap: 16px;
    }
    &__img {
      @media (max-width: 767px) {
        max-width: 140px;
        width: 100%;
        margin: 0 auto;
        height: 201px;
      }
    }
    &__top {
      @media (max-width: 767px) {
        flex-direction: column;
        align-items: center;
      }
    }
    &__saved,
    &__rating {
      @media (max-width: 767px) {
        position: static;
        background-color: var(--color-seashell);
      }
    }
    &__list {
      @media (max-width: 767px) {
        display: flex;
      }
    }
  }
  .detail__video {
    height: 484px;
  }
  &--video {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    @media (max-width: 767px) {
      border-radius: 0;
      height: 210px !important;
      width: calc(100% + 32px);
      margin-left: -16px;
    }
  }
  &--description {
    margin-bottom: 40px;
    h3 {
      font-size: 18px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      margin: 0 0 12px;
      padding: 0;
      color: var(--color-mine-shaft);
    }
    p {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      color: var(--color-mine-shaft);
      padding: 0;
      margin: 0;
    }
  }
  &--comments {
    margin-top: 20px;
    border-top: 1px solid var(--color-gallery-first);
  }
}
</style>

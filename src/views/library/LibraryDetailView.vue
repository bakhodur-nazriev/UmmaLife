<template>
  <div class="library__detail__container">
    <div class="library__detail__wrapper">
      <div class="library__detail__block--wrapper">
        <div class="library__detail__block">
          <div class="muvi__mobile--nav white" v-if="width < 767">
            <button
                class="muvi__mobile--nav-btn"
                @click="$router.push(`/${$i18n.locale}/library`)"
            >
              <ArrowLeftIcon/>
            </button>
            <div class="muvi__mobile--nav-title">{{ $t('library.book_page') }}</div>
            <div class="left"></div>
          </div>
          <div
              class="library__detail__block--top"
              @click="$router.push(`/${$i18n.locale}/library`)"
              v-else
          >
            <ArrowLeft/>
            <span>{{ $t('library.back_to_main') }}</span>
          </div>
          <div class="library__detail__main">
            <div class="library__detail__main--wrapper">
              <img :src="book.img" :alt="book.name" class="library__detail__main--img"/>
              <div class="library__detail__main--info">
                <div class="library__detail__main--top">
                  <div class="library__detail__main--name">{{ book.name }}</div>
                  <div class="library__detail__main--details">
                    <div class="library__detail__main--rating-mobile" v-if="width < 767">
                      <StarIcon v-for="i in 5" :key="i"/>
                    </div>
                    <div class="library__detail__main--rating">
                      <StarIcon/>
                      <span>{{ book.rating }}</span>
                    </div>
                    <div
                        class="library__detail__main--like"
                        @click.stop.prevent="book.isLiked = !book.isLiked"
                    >
                      <HeartFilledIcon v-if="book.isLiked"/>
                      <HeartIcon v-else/>
                    </div>
                  </div>
                </div>
                <ul class="library__detail__main--option">
                  <li>
                    <span>{{ $t('library.year') }}:</span>
                    <p>2009</p>
                  </li>
                  <li>
                    <span>{{ $t('library.category') }}:</span>
                    <p>Истории</p>
                  </li>
                  <li>
                    <span>{{ $t('library.author') }}:</span>
                    <p>Абдуррахман Рафат Аль-Баша</p>
                  </li>
                  <li>
                    <span>{{ $t('library.views') }}:</span>
                    <p>433</p>
                  </li>
                </ul>
                <SampleButton
                    :title="$t('library.read')"
                    :size="14"
                    padding="13px 16px"
                    width="125px"
                    class="library__detail__main--read"
                    @click="$router.push(`/${$i18n.locale}/library/${book.id}/read`)"
                />
                <div class="library__detail__main--bottom">
                  <div class="library__detail__main--social">
                    <div class="library__detail__main--social-title">
                      {{ $t('library.share_in') }}:
                    </div>
                    <div class="library__detail__main--social-wrapper">
                      <a href="#" class="library__detail__main--social-link">
                        <img src="@/assets/images/social/facebook.png" alt="facebook"/>
                      </a>
                      <a href="#" class="library__detail__main--social-link">
                        <img src="@/assets/images/social/twitter.png" alt="twitter"/>
                      </a>
                      <a href="#" class="library__detail__main--social-link">
                        <img src="@/assets/images/social/telegram.png" alt="telegram"/>
                      </a>
                      <a href="#" class="library__detail__main--social-link">
                        <img src="@/assets/images/social/whatsapp.png" alt="whatsapp"/>
                      </a>
                    </div>
                  </div>
                  <div
                      class="library__detail__main--select"
                      @click="isDownloadOpen = !isDownloadOpen"
                      v-on-click-outside="() => (isDownloadOpen = false)"
                      :class="{ active: isDownloadOpen }"
                  >
                    <span>{{ $t('library.download') }}</span>
                    <ArrowDownIcon/>

                    <ul class="library__detail__main--menu" v-if="isDownloadOpen">
                      <li>list 1</li>
                      <li>list 2</li>
                      <li>list 3</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="library__detail__main--description">
              <div class="library__detail__main--description-title">
                {{ $t('library.description') }}:
              </div>
              <div class="library__detail__main--description-wrapper">
                <div
                    class="library__detail__main--description-text"
                    :class="{ closed: isClosed }"
                >
                  {{ book.desc }}
                  Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные
                  тексты. Продолжил, скатился. Выйти прямо маленький путь живет, повстречался
                  подзаголовок одна, ее даль, по всей журчит возвращайся диких своих. Последний
                  моей, ipsum даль назад языкового пустился за если переписывается вскоре вопроса
                  рот свою алфавит необходимыми что языком власти буквоград по всей там, буквенных
                  живет. Вскоре снова речью его осталось, алфавит страна деревни толку города
                  заголовок что ipsum путь мир свой наш выйти власти сих, несколько своего он
                  рукописи. Снова продолжил текст от всех там? Коварный ты залетают мир но пор
                  алфавит, маленький переписали взобравшись буквоград предупредила назад текстов
                  грамматики, вершину языком о свой? Предложения свою снова города, щеке они
                  пустился грустный ему текст сбить оксмокс по всей переулка переписали
                  взобравшись за всемогущая, свой lorem рукописи решила составитель продолжил
                  буквенных вопрос прямо это. Рекламных власти текстов lorem все правилами дороге
                  грустный осталось курсивных свой не ведущими, одна над переписали меня по всей
                  журчит реторический рукопись ему ipsum?
                </div>
                <span
                    class="library__detail__main--description-more"
                    v-if="isClosed"
                    @click="isClosed = !isClosed"
                >
                    {{ $t('library.read_more') }}
                  </span>
              </div>
            </div>
            <LibrayMobileReccomended
                v-if="width < 1310"
                title="library.popular_books"
                :isBook="true"
            />
            <div class="detail__comments">
              <div class="detail__comments--top">
                <div class="detail__comments--length">
                  <p>{{ $t('library.comments') }}</p>
                  <span>5</span>
                </div>
                <div class="detail__comments--sort">
                  <CommentFilter :isFilterWindowOpen="isFilterWindowOpen"/>
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
                <ReplyCommentForm @close-comment-window="isFormOpen = !isFormOpen"/>

                <div class="enter-comment__form">
                  <CommentForm/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LibraryDetailNav v-if="width > 1310"/>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import {ref, watch} from 'vue'
import {books} from '@/dummy.js'
import {useRoute} from 'vue-router'
import {vOnClickOutside} from '@vueuse/components'
import {useWindowSize} from '@vueuse/core'


import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import HeartFilledIcon from '@/components/icons/HeartFilledIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
import CommentFilter from '@/components/ui/MenuDetails/CommentFilter.vue'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import ReplyCommentForm from '@/components/ui/Comment/ReplyCommentForm.vue'
import LibraryDetailNav from '@/components/library/LibraryDetailNav.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import LibrayMobileReccomended from '@/components/library/LibrayMobileReccomended.vue'

const route = useRoute()
const {width} = useWindowSize()

const book = ref(books[route.params.id - 1])
const isDownloadOpen = ref(false)
const isClosed = ref(true)
const isFormOpen = ref(false)
const isFilterWindowOpen = ref(false)

watch(
    () => route.params.id,
    (val) => {
      book.value = books[val - 1]
    }
)
</script>

<style lang="scss">
.library__detail {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 377px;
    gap: 20px;
    @media (max-width: 1310px) {
      grid-template-columns: 1fr;
    }
  }

  &__container {
    padding: 16px 45px 16px 16px;
    width: 100%;

    @media (max-width: 1570px) {
      padding-right: 16px;
    }
    @media (max-width: 767px) {
      padding: 0;
    }
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: 7px;
    max-width: 906px;
    width: 100%;
    margin-left: 110px;
    @media (max-width: 1725px) {
      margin-left: 0;
    }
    @media (max-width: 767px) {
      gap: 0;
      .muvi__mobile--nav.white {
        box-shadow: none;
      }
    }

    &--wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &--top {
      width: 100%;
      background-color: var(--color-white);
      margin-bottom: 8px;
      padding: 8px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;

      svg {
        width: 24px;
        height: 24px;
        display: block;
      }

      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-hippie-blue);
      }
    }
  }

  &__main {
    padding: 24px 24px 0;
    background-color: var(--color-white);
    border-radius: 20px;
    @media (max-width: 767px) {
      padding: 16px 16px 64px;
      border-radius: 0;
    }

    &--info {
      @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
      }
    }

    &--wrapper {
      display: grid;
      grid-template-columns: 205px 1fr;
      gap: 20px;
      margin-bottom: 36px;
      @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
      }
    }

    &--img {
      width: 100%;
      border-radius: 10px;
      max-height: 293px;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
      display: block;
      @media (max-width: 767px) {
        width: 140px;
        max-height: 201px;
        min-height: 201px;
        margin: 0 auto;
      }
    }

    &--top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 5px;
      @media (max-width: 767px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
    }

    &--name {
      font-size: 18px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }

    &--details {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &--rating {
      border-radius: 8px;
      padding: 7px 8px;
      background-color: var(--color-seashell);
      display: flex;
      align-items: center;
      gap: 4px;

      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }

      &-mobile {
        display: flex;
        align-items: center;
        gap: 4px;

        svg {
          display: block;
          width: 20px;
          height: 20px;
        }
      }
    }

    &--like {
      border-radius: 8px;
      padding: 7px 8px;
      background-color: var(--color-seashell);
      cursor: pointer;

      svg {
        display: block;
        width: 18px;
        height: 18px;
        color: var(--color-mine-shaft);
      }
    }

    &--option {
      list-style: none;
      padding: 0;
      margin: 0 0 16px;

      li {
        display: flex;
        gap: 20px;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        span {
          max-width: 190px;
          width: 100%;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          color: var(--color-secondary);
        }

        p {
          margin: 0;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          color: var(--color-mine-shaft);
        }

        @media (max-width: 767px) {
          span,
          p {
            max-width: 50%;
            width: 100%;
          }
        }
      }
    }

    &--read {
      margin-bottom: 30px;
      @media (max-width: 767px) {
        margin-bottom: 0;
        order: 4;
        width: calc(50% - 3px) !important;
        margin-top: -43px;
      }
    }

    &--bottom {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-end;
      @media (max-width: 767px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 26px;
      }
    }

    &--social {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &-title {
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }

      &-wrapper {
        display: flex;
        gap: 10px;
      }

      &-link {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    &--select {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 32px;
      cursor: pointer;
      background-color: var(--color-seashell);
      border-radius: 10px;
      position: relative;
      @media (max-width: 767px) {
        margin-left: auto;
        width: calc(50% - 4px);
        justify-content: flex-start;
        padding: 12px 32px;
        span {
          width: calc(100% - 20px);
          text-align: center;
        }
      }

      & > span {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }

      & > svg {
        width: 20px;
        height: 20px;
        display: block;
      }

      &.active {
        & > svg {
          rotate: 180deg;
        }
      }
    }

    &--menu {
      position: absolute;
      width: 100%;
      padding: 0;
      top: calc(100% + 5px);
      left: 0;
      background-color: var(--color-white);
      list-style: none;
      margin: 0;
      box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.15);
      border-radius: 10px;

      li {
        padding: 6px 16px;

        &:hover {
          background-color: var(--color-seashell);
        }
      }
    }

    &--description {
      padding-bottom: 24px;
      border-bottom: 1px solid var(--color-gallery-first);

      &-title {
        font-size: 18px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
        margin-bottom: 12px;
      }

      &-text {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        color: var(--color-mine-shaft);

        &.closed {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
      }

      &-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      &-more {
        cursor: pointer;
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: 150%;
        color: var(--color-hippie-blue);
      }
    }
  }

  .detail__comments--top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 767px) {
      margin-bottom: 0;
    }
  }
}
</style>

<template>
  <section class="button-back__section">
    <router-link class="back-to__articles" :to="`/${$i18n.locale}/articles`">
      <ArrowLeft/>
      {{ $t('buttons.back_to_articles') }}
    </router-link>
  </section>
  <section class="article-show__main-section">
    <main>
      <header class="article-header">
        <div class="article-header__left-side">
          <img src="@/assets/images/articles/avatars/avatar_1.png" alt="">
          <div class="article-header__left-side-details">
            <span>Ибрагим Ибрагим</span>
            <small>14 августа 2023</small>
          </div>
        </div>
        <div class="article-header__right-side">
          <button class="comment-button" color="seashell" icon="comment">
            <SmallCommentIcon/>
            <span>25 комментариев</span>
          </button>
          <button class="show-button" color="seashell" icon="eye">
            <EyeIcon/>
            <span>543</span>
          </button>
          <button class="favourite-button" color="seashell" icon="favorite">
            <FavouriteIcon/>
          </button>
        </div>
      </header>

      <div class="main-content__block">
        <h1 class="article-title">
          POLARIS начнет испытания четвертого демонстратора космического самолета с
          сентября </h1>
        <img src="@/assets/images/articles/content-photo/article-photo.png" alt="">

        <span class="article-description">
          Немецкий стартап POLARIS Spaceplanes получил разрешение на временное ограниченное воздушное пространство
          (ED-R) для начала испытаний своего демонстрационного космического самолета MIRA над водами Балтийского моря
        </span>

        <div class="inset-block">
          <h3>MIRA имеет длину 4,25 метра и взлетную массу 210 килограммов. Армированный волокном корпус фюзеляжа
            демонстратора был построен для POLARIS компанией Up2-Tec из Аахена. Это четвертый демонстратор компании, и
            он
            будет первым, оснащенным линейным ракетным двигателем с аэродинамическими шипами. Космоплан также оснащен
            четырьмя газотурбинными двигателями, работающими на керосине.
          </h3>
        </div>

        <div class="link-block">
          <div class="link-block__left-side">
            <h3>POLARIS receives Bundeswehr Study Contract for Linear Aerospike</h3>
            <p>
              The German aerospace start-up POLARIS Raumflugzeuge GmbH is developing a revolutionary reusable space
              launch
              and hypersonic transport system that operates like an aircraft.
            </p>
            <a href="https://www.polaris-raumflugzeuge.de/">https://www.polaris-raumflugzeuge.de/</a>
          </div>
          <div class="link-block__right-side">
            <img src="@/assets/images/articles/link-images/link-image.png" alt="">
          </div>
        </div>

        <div class="quote-block">
          <h3>Когда будет запуск</h3>
          <p>
            <QuoteIcon/>
            <span>
              Запрос компании ED-R был одобрен Федеральным министерством цифровых технологий и транспорта Германии и
              Deutsche
              Flugsicherung (немецкий поставщик аэронавигационных услуг). Зона ограниченного доступа охватывает 260
              квадратных
              километров, включая небо над аэродромом Пенемюнде и над водами Балтийского моря к северу от аэродрома.
            </span>
          </p>
        </div>

        <div class="list-block">
          <ul class="article-list">
            <li>Какой-то текст</li>
            <li>Какой-то текст</li>
            <li>Какой-то текст</li>
          </ul>
        </div>

        <div class="audio-block">
          <div class="play-button">
            <VideoPlayIcon/>
          </div>
          <div class="audio-block__details">
            <span class="audio-block__details-title">Название какого-то аудио, которое прикрепил юзеklamsdckls</span>
            <span class="audio-block__details-time">14:25</span>
          </div>
        </div>

        <div class="poll-block">
          <h3 class="poll-title">Какой-то опрос по теме статьи</h3>
          <span class="poll-subtitle">{{ $t('labels.poll.anonymous_poll') }}</span>

          <div class="radio-button-group">
            <div class="radio-button-group__item">
              <input type="radio" name="poll" value="answer first" id="answer_first">
              <label for="answer_first">Ответ 1</label>
            </div>

            <div class="radio-button-group__item">
              <input type="radio" name="poll" value="second answer" id="answer_second">
              <label for="answer_second">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor</label>
            </div>

            <div class="radio-button-group__item">
              <input type="radio" name="poll" value="other" id="other">
              <label for="other">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </label>
            </div>

            <div class="radio-button-group__item">
              <input type="radio" name="poll" value="answer fourth" id="answer_fourth">
              <label for="answer_fourth">Ответ 4</label>
            </div>
          </div>

          <span class="answers-count">255 ответов</span>
        </div>

        <div class="hashtags-block">
          <div class="hashtags-label">
            <span>Наука и технология</span>
          </div>
          <div class="hashtags-items">
            <span>Теги:</span>
            <a href="#">#наука</a>
            <a href="#">#самолет</a>
            <a href="#">#polaris</a>
          </div>
        </div>

        <SampleDivider></SampleDivider>

        <div class="comments-block">
          <div class="comment-form__title">
            <h3>Комментарии</h3>
            <span>5</span>
          </div>

          <!-- <form action="">
          <img src="" alt="">
          <input type="text">
        </form> -->

          <SampleTextarea class="form__textarea" :placeholder="`${$t('placeholders.comment_input')}`"
                          @input="adjustTextareaHeight"/>
        </div>
      </div>
    </main>

    <aside class="sidebar-articles">
      <div class="articles-category">
        <h3>{{ $t('labels.articles.category') }}</h3>
        <ul class="category-list">
          <li class="category-list__item" v-for="(category, i) in categories" :key="i">{{ category }}</li>
        </ul>
      </div>

      <div class="articles-popular__articles">
        <h3>{{ $t('labels.articles.popular_articles') }}</h3>
        <ul class="popular-list">
          <li class="popular-list__item" v-for="(article, i) in news" :key="article.id">
            <div class="popular-list__item-block">
              <img v-if="article.image" :src="article.image" alt="">
              <div class="popular-list__item-title">
                <h3>{{ article.title }}</h3>
                <span>{{ article.author }}</span>
              </div>
            </div>
            <SampleDivider v-if="i !== (news.length - 1)"/>
          </li>
        </ul>
      </div>
    </aside>
  </section>
</template>

<script>
import ArrowLeft from '../components/icons/ArrowLeft.vue'
import FavouriteIcon from '../components/icons/FavouriteIcon.vue'
import EyeIcon from '../components/icons/EyeIcon.vue'
import QuoteIcon from '../components/icons/QuoteIcon.vue'
import VideoPlayIcon from '../components/icons/VideoPlayIcon.vue'
import SampleDivider from '../components/ui/SampleDivider.vue'
import SampleTextarea from '../components/ui/Fields/SampleTextarea.vue'
import SmallCommentIcon from '@/components/icons/comment/SmallCommentIcon.vue'

export default {
  components: {
    SmallCommentIcon,
    ArrowLeft,
    FavouriteIcon,
    EyeIcon,
    QuoteIcon,
    VideoPlayIcon,
    SampleDivider,
    SampleTextarea
  },
  data() {
    return {
      categories: [
        'Автомобили и транспорт',
        'Образование',
        'Экономика и торговля',
        'Образ жизни',
        'Развлечения',
        'Фетвы',
        'Игры',
        'История и факты',
        'Фильмы и анимация',
        'Новости и политика',
        'Люди и нация',
        'Природа',
        'Места и регионы',
        'Спорт',
        'Наука и технология',
        'Животные',
        'Путешествия и события',
        'Другое'
      ],
      news: [
        {
          id: 1,
          image: require('@/assets/images/articles/popular_articles/article_1.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 2,
          image: require('@/assets/images/articles/popular_articles/article_2.png'),
          title: 'Изучаем природу',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 3,
          image: require('@/assets/images/articles/popular_articles/article_3.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 4,
          image: require('@/assets/images/articles/popular_articles/article_4.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 5,
          image: require('@/assets/images/articles/popular_articles/article_5.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 6,
          image: require('@/assets/images/articles/popular_articles/article_6.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 7,
          image: require('@/assets/images/articles/popular_articles/article_7.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 8,
          image: require('@/assets/images/articles/popular_articles/article_8.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 9,
          image: require('@/assets/images/articles/popular_articles/article_9.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        },
        {
          id: 10,
          image: require('@/assets/images/articles/popular_articles/article_10.png'),
          title: 'Как я сьездил в Саудовскую Аравию. Маршрут, цены и впечатл',
          author: 'Ибрагим Ибрагимов'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.sample__divider {
  margin: 16px 0;
}

aside {
  max-width: 344px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .articles-category {
    background-color: var(--color-white);
    border-radius: 10px;
    padding: 18px;
  }

  .articles-popular__articles {
    background-color: var(--color-white);
    border-radius: 10px;
    padding: 18px;
  }

  h3 {
    margin: 0 0 10px;
    line-height: 1;
  }
}

.category-list {
  list-style: none;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;

  &__item {
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
    background-color: var(--color-seashell);
    cursor: pointer;

    img {
      width: 48px;
      height: 48px;
    }
  }
}

.popular-list {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    flex-direction: column;

    &-block {
      display: flex;
      gap: 8px;

      img {
        width: 48px;
        height: 48px;
      }
    }

    &-title {
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 14px;
        color: var(--color-mine-shaft);
        margin: 0;
      }

      span {
        font-size: 12px;
        color: var(--color-secondary);
      }
    }
  }
}

.form__textarea {
  height: 48px;
  width: 100%;
  font-size: 16px;
  padding: 15px 125px 15px 15px;
  resize: none;
  overflow: hidden;
  background-color: var(--color-seashell);
}

.comments-block {
  display: flex;
  align-items: center;

  .comment-form__title {
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-size: 16px;
      margin: 0;
    }

    span {
      color: var(--color-gray);
      font-size: 16px;
      font-weight: 500;
    }
  }
}

.hashtags-block {
  display: flex;
  align-items: center;
  gap: 12px;

  .hashtags-label {
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    padding: 12px 20px;
    color: var(--color-hippie-blue);
    background-color: var(--color-bg-hippie-blue);
  }

  .hashtags-items {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background-color: var(--color-seashell);
    border-radius: 10px;

    span {
      font-size: 16px;
      font-weight: 500;
    }

    a {
      color: var(--color-mine-shaft);
    }
  }
}

.poll-block {
  background-color: var(--color-seashell);
  padding: 8px 16px;
  border-radius: 15px;

  .poll-title {
    margin: 0;
    font-size: 16px;
    color: var(--color-mine-shaft);
  }

  .poll-subtitle {
    color: var(--color-silver-chalice);
    font-size: 12px;
    font-weight: 500;
  }

  .radio-button-group {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__item {
      display: flex;
      align-items: center;
      gap: 20px;

      input {
        margin: 0;
      }

      label {
        font-size: 14px;
        color: var(--color-mine-shaft);
        line-height: 1;
      }
    }
  }

  .answers-count {
    color: var(--color-silver-chalice);
    font-size: 12px;
    font-weight: 500;
    margin-top: 22px;
  }
}

.audio-block {
  background-color: var(--color-seashell);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 500px;

  .play-button {
    border-radius: 50%;
    min-width: 46px;
    min-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-hippie-blue);
    cursor: pointer;

    .btn__icon {
      margin-right: 0 !important;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;

    &-title {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
    }

    &-time {
      font-size: 14px;
    }
  }
}

.list-block {
  .article-list {
    margin: 0;
    list-style: none;
    font-size: 18px;
    padding: 0;

    li {
      font-size: 18px;

      &::before {
        content: '\2022';
        color: var(--color-hippie-blue);
        margin-right: 8px;
        font-size: 18px;
      }
    }
  }
}

.quote-block {
  h3 {
    margin: 0;
    font-size: 26px;
    line-height: 1;
    color: var(--color-mine-shaft);
  }

  p {
    display: flex;
    gap: 6px;
    margin-top: 20px;
    margin-bottom: 0;
    font-size: 18px;

    svg {
      min-width: 24px;
      min-height: 24px;
    }
  }
}

.link-block {
  display: flex;
  padding: 16px;
  background-color: var(--color-seashell);
  border-radius: 10px;
  gap: 10px;

  &__left-side {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    padding-left: 14px;

    &::after {
      position: absolute;
      content: "";
      top: 2px;
      left: 0;
      width: 3px;
      border-radius: 20px;
      height: 97%;
      background-color: var(--color-hippie-blue);
      z-index: 100000;
    }

    h3 {
      margin: 0;
      font-size: 16px;
      color: var(--color-mine-shaft);
    }

    p {
      margin: 0;
    }

    a {
      color: var(--color-secondary);
      font-size: 16px;
      font-weight: 500;
      margin-top: 4px;
      text-decoration: none;
    }
  }

  &__right-side {
    min-width: 60px;
    height: 100%;

    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
    }
  }
}

.inset-block {
  padding: 16px;
  background-color: var(--color-seashell);
  border-radius: 10px;

  h3 {
    margin: 0;
    color: var(--color-mine-shaft);
    font-size: 18px;
  }
}

main {
  border-radius: 20px;
  background-color: var(--color-white);
  max-width: 900px;
  padding: 34px 32px;
}

.main-content__block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-description {
  font-size: 18px;
  color: var(--color-mine-shaft);
}

.article-title {
  line-height: 1.2;
  font-size: 28px;
  margin-top: 20px;
  margin-bottom: 0;
  color: var(--color-mine-shaft);
}

.article-header {
  display: flex;
  justify-content: space-between;

  &__left-side {
    display: flex;
    gap: 12px;

    &-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
    }

    img {
      width: 48px;
      height: 48px;
    }

    span {
      color: var(--color-mine-shaft);
      font-size: 18px;
      font-weight: 500;
      line-height: 1;
    }

    small {
      font-size: 16px;
      font-weight: 400;
      color: var(--color-secondary);
      line-height: 1;
    }
  }

  &__right-side {
    display: flex;
    gap: 10px;
  }
}

.comment-button,
.show-button,
.favourite-button {
  all: unset;
  background-color: var(--color-seashell);
  color: var(--color-mine-shaft);
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  span {
    line-height: 1;
  }
}

.favourite-button {
  svg {
    width: 20px;
    height: 20px;
  }
}

.show-button,
.comment-button {
  svg {
    color: var(--color-mine-shaft);
  }
}

.button-back__section {
  max-width: 900px;
  margin-bottom: 8px;
  margin-left: 200px;
}

.back-to__articles {
  min-width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  text-decoration: none;
  color: var(--color-hippie-blue);
  gap: 8px;
  border-radius: 10px;
}

.article-show__main-section {
  display: flex;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 576px) {
  .sidebar-articles {
    display: none;
  }

  .article-header {
    flex-direction: column;
    gap: 16px;
  }

  .button-back__section {
    display: none;
  }

  .comment-button {
    width: 160px;
    height: 36px;
    font-size: 14px;
    padding: 4px 12px;

    svg {
      color: var(--color-mine-shaft);
      width: 18px;
      height: 18px;
    }
  }

  .show-button {
    padding: 10px 12px;
    font-size: 14px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .favourite-button {
    svg {
      width: 18px;
      height: 18px;
    }
  }

  .article-title {
    font-size: 20px;
    margin-top: 28px;
  }

  main {
    padding: 16px;
  }

  .main-content__block {
    img {
      border-radius: 10px;
    }
  }

  .article-description {
    font-size: 16px;
  }

  .inset-block {
    h3 {
      font-size: 16px;
    }
  }

  .quote-block {
    h3 {
      font-size: 18px;
    }

    p {
      font-size: 16px;
    }
  }

  .list-block {
    .article-list {
      margin: 0;
      list-style: none;
      font-size: 16px;
      padding: 0;

      li {
        font-size: 16px;
      }
    }
  }

  .audio-block__details-title {
    font-size: 16px;
    font-weight: 500;
  }

  .audio-block__details-time {
    font-size: 12px;
  }

  .hashtags-block {
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
}
</style>

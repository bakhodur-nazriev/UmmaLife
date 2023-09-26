<template>
  <section class="button-back__section">
    <router-link class="back-to__articles" :to="`/${$i18n.locale}/articles`">
      <ArrowLeft />
      {{ $t('buttons.back_to_articles') }}
    </router-link>
  </section>

  <section class="article-show__main-section">
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
          <CommentIcon />
          <span>25 комментариев</span>
        </button>
        <button class="show-button" color="seashell" icon="eye">
          <EyeIcon />
          <span>543</span>
        </button>
        <button class="favourite-button" color="seashell" icon="favorite">
          <FavouriteIcon />
        </button>
      </div>
    </header>

    <main>
      <h1 class="article-title">POLARIS начнет испытания четвертого демонстратора космического самолета с сентября </h1>
      <img src="@/assets/images/articles/content-photo/article-photo.png" alt="">

      <span class="article-description">
        Немецкий стартап POLARIS Spaceplanes получил разрешение на временное ограниченное воздушное пространство
        (ED-R) для начала испытаний своего демонстрационного космического самолета MIRA над водами Балтийского моря
      </span>

      <div class="inset-block">
        <h3>MIRA имеет длину 4,25 метра и взлетную массу 210 килограммов. Армированный волокном корпус фюзеляжа
          демонстратора был построен для POLARIS компанией Up2-Tec из Аахена. Это четвертый демонстратор компании, и он
          будет первым, оснащенным линейным ракетным двигателем с аэродинамическими шипами. Космоплан также оснащен
          четырьмя газотурбинными двигателями, работающими на керосине.
        </h3>
      </div>

      <div class="link-block">
        <div class="link-block__left-side">
          <h3>POLARIS receives Bundeswehr Study Contract for Linear Aerospike</h3>
          <p>
            The German aerospace start-up POLARIS Raumflugzeuge GmbH is developing a revolutionary reusable space launch
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
          <QuoteIcon />
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
          <VideoPlayIcon />
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
            <label for="other">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip </label>
          </div>

          <div class="radio-button-group__item">
            <input type="radio" name="poll" value="answer fourth" id="answer_fourth">
            <label for="answer_fourth">Ответ 4</label>
          </div>
        </div>

        <span class="answers-count">255 ответов</span>
      </div>

      <div class="hashtags-block">
        <div>Наука и технология</div>
        <div>
          <span>Теги:</span>
          <a href="">#наука</a>
          <a href="">#самолет</a>
          <a href="">#polaris</a>
        </div>
      </div>

      <div class="comments-block">
        <h3>Комментарии</h3>
      </div>
    </main>
  </section>
</template>

<script>
import ArrowLeft from '../components/icons/ArrowLeft.vue'
import FavouriteIcon from '../components/icons/FavouriteIcon.vue'
import EyeIcon from '../components/icons/EyeIcon.vue'
import CommentIcon from '../components/icons/CommentIcon.vue'
import QuoteIcon from '../components/icons/QuoteIcon.vue'
import VideoPlayIcon from '../components/icons/VideoPlayIcon.vue'

export default {
  components: {
    ArrowLeft,
    FavouriteIcon,
    EyeIcon,
    CommentIcon,
    QuoteIcon,
    VideoPlayIcon
  }
}
</script>

<style scoped lang="scss">
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
  border-radius: 20px;
  background-color: var(--color-white);
  max-width: 900px;
  padding: 34px 32px;
  margin-left: 200px;
}
</style>

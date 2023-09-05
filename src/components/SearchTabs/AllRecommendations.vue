<template>
  <div class="all-comment__main-block">
    <section class="recent-section">
      <div class="recent-section__labels">
        <h3>{{ $t('labels.search.recent') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="recent-list">
        <li class="recent-list__item">
          <div class="recent-list__item-left-block">
            <img src="@/assets/images/navbar/recent_1.png" alt="">
            <div>
              <p>Мухаммад Мухаммадов</p>
              <span>Istanbul, 24 года</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
        <li class="recent-list__item">
          <div class="recent-list__item-left-block">
            <img src="@/assets/images/navbar/recent_2.png" alt="">
            <div>
              <p>Архитектура и дизайн</p>
              <span>15896 подписчиков</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
        <li class="recent-list__item">
          <div class="recent-list__item-left-block">
            <img src="@/assets/images/navbar/recent_3.png" alt="">
            <div>
              <p>Айжан Тумухамбетова</p>
              <span>Мадрид, 28 лет</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
      </ul>
    </section>
    <SampleDivider/>

    <section class="people-section">
      <div class="people-section__labels">
        <h3>{{ $t('labels.search.people') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="people-list">
        <li class="people-list__item">
          <div class="people-list__item-left-block">
            <img src="@/assets/images/navbar/people_1.png" alt="">
            <div>
              <p>Мухаммад Мухаммадов</p>
              <span>Istanbul, 24 года</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
        <li class="people-list__item">
          <div class="people-list__item-left-block">
            <img src="@/assets/images/navbar/people_2.png" alt="">
            <div>
              <p>Магомед Оздоев</p>
              <span>Грузия, 27 лет</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
        <li class="people-list__item">
          <div class="people-list__item-left-block">
            <img src="@/assets/images/navbar/people_3.png" alt="">
            <div>
              <p>Айжан Тумухамбетова</p>
              <span>Мадрид, 28 лет</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
      </ul>
    </section>
    <SampleDivider/>

    <section class="groups-section">
      <div class="groups-section__labels">
        <h3>{{ $t('tabs.search.groups') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="groups-list">
        <li class="groups-list__item">
          <div class="groups-list__item-left-block">
            <img src="@/assets/images/navbar/people_1.png" alt="">
            <div>
              <p>Мухаммад Мухаммадов</p>
              <span>Istanbul, 24 года</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
        <li class="groups-list__item">
          <div class="groups-list__item-left-block">
            <img src="@/assets/images/navbar/people_2.png" alt="">
            <div>
              <p>Магомед Оздоев</p>
              <span>Грузия, 27 лет</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
        <li class="groups-list__item">
          <div class="groups-list__item-left-block">
            <img src="@/assets/images/navbar/people_3.png" alt="">
            <div>
              <p>Айжан Тумухамбетова</p>
              <span>Мадрид, 28 лет</span>
            </div>
          </div>
          <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
        </li>
      </ul>
    </section>
    <SampleDivider/>

    <section class="muvi-section">
      <div class="muvi-section__labels">
        <h3>{{ $t('tabs.search.muvi') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="muvi-list">
        <li class="muvi-list__item">
          <div class="muvi-list__item-image">
            <img src="@/assets/images/search/muvi_1.png" alt="">
          </div>
          <div class="muvi-list__item-details">
            <EyeIcon/>
            <span>147 просмотров</span>
          </div>
        </li>
        <li class="muvi-list__item">
          <div class="muvi-list__item-image">
            <img src="@/assets/images/search/muvi_2.png" alt="">
          </div>
          <div class="muvi-list__item-details">
            <EyeIcon/>
            <span>147 просмотров</span>
          </div>
        </li>
        <li class="muvi-list__item">
          <div class="muvi-list__item-image">
            <img src="@/assets/images/search/muvi_3.png" alt="">
          </div>
          <div class="muvi-list__item-details">
            <EyeIcon/>
            <span>147 просмотров</span>
          </div>
        </li>
        <li class="muvi-list__item">
          <div class="muvi-list__item-image">
            <img src="@/assets/images/search/muvi_4.png" alt="">
          </div>
          <div class="muvi-list__item-details">
            <EyeIcon/>
            <span>147 просмотров</span>
          </div>
        </li>
      </ul>
    </section>
    <SampleDivider/>

    <section class="article-section">
      <div class="article-section__labels">
        <h3>{{ $t('tabs.search.article') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="article-list">
        <li class="article-list__item">
          <div class="article-header">
            <img src="@/assets/images/navbar/people_1.png" alt="">
            <div class="article-header__details">
              <h3>Ибрагим Алиев</h3>
              <small>15 минут назад</small>
            </div>
          </div>
          <div class="article-body">
            <div class="article-body__views-block">
              <img src="@/assets/images/search/article_1.png" alt="">
              <div class="article-body__views">
                <EyeIcon/>
                <span>413</span>
              </div>
            </div>
            <div class="article-body__details">
              <h3>Название статьи, которое не поместилось на одну строку и переодну строку и пере</h3>
              <p>Аль-Ула - город, полный археологических чудес.
                провинции Медина,провинции Медина,</p>
            </div>
          </div>
        </li>
        <li class="article-list__item">
          <div class="article-header">
            <img src="@/assets/images/navbar/people_1.png" alt="">
            <div class="article-header__details">
              <h3>Ибрагим Алиев</h3>
              <small>15 минут назад</small>
            </div>
          </div>
          <div class="article-body">
            <div class="article-body__views-block">
              <img src="@/assets/images/search/article_1.png" alt="">
              <div class="article-body__views">
                <EyeIcon/>
                <span>413</span>
              </div>
            </div>
            <div class="article-body__details">
              <h3>Название статьи, которое не поместилось на одну строку и переодну строку и пере</h3>
              <p>Аль-Ула - город, полный археологических чудес. Расположенный на северо-западе Саудовской Аравии в
                провинции Медина,провинции Медина,</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <SampleDivider/>

    <section class="video-section">
      <div class="video-section__labels">
        <h3>{{ $t('tabs.search.video') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="video-list">
        <li class="video-list__item">
          <div class="video-list__item-header">
            <img src="@/assets/images/navbar/people_2.png" alt="">
            <div class="video-list__item-header__details">
              <h3>Ибрагим Алиев</h3>
              <small>15 минут назад</small>
            </div>
          </div>
          <div class="custom-video__container">
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
                    <SmallVideoPlayIcon/>
                  </div>
                </div>
              </template>
            </VideoPlayer>
          </div>
          <div class="video-list__item-details">
            <h3>Название статьи, которое не поместилось на одну строку и перена одну строку и пере</h3>
            <span>20.08.2022 - 1 тыс. просмотров</span>
          </div>
        </li>
        <li class="video-list__item">
          <div class="video-list__item-header">
            <img src="@/assets/images/navbar/people_2.png" alt="">
            <div class="video-list__item-header__details">
              <h3>Ибрагим Алиев</h3>
              <small>15 минут назад</small>
            </div>
          </div>
          <div class="custom-video__container">
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
                    <SmallVideoPlayIcon/>
                  </div>
                </div>
              </template>
            </VideoPlayer>
          </div>
          <div class="video-list__item-details">
            <h3>Название статьи, которое не поместилось на одну строку и перепоместилось на одну строку и пере</h3>
            <span>20.08.2022 - 1 тыс. просмотров</span>
          </div>
        </li>
      </ul>
    </section>
    <SampleDivider/>

    <section class="audio-section">
      <div class="audio-section__labels">
        <h3>{{ $t('tabs.search.audio') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="audio-list">
        <li class="audio-list__item"></li>
        <li class="audio-list__item"></li>
        <li class="audio-list__item"></li>
      </ul>
    </section>
    <SampleDivider/>

    <section class="hashtags-section">
      <div class="hashtags-section__labels">
        <h3>{{ $t('tabs.search.hashtags') }}</h3>
        <a href="">{{ $t('labels.search.see_all') }}</a>
      </div>
      <ul class="hashtags-list">
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#напи</p>
            <span>94 тыс. просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#написанн</p>
            <span>94 тыс. просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#написанноеслово</p>
            <span>94 тыс. просмотров</span>
          </div>
        </li>
      </ul>
    </section>
    <SampleDivider/>
  </div>
</template>
<script>
import EyeIcon from '@/components/icons/EyeIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import HashtagIcon from '@/components/icons/navbar/small-display/HashtagIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import { VideoPlayer } from '@videojs-player/vue'

export default {
  components: {
    VideoPlayer,
    SmallVideoPlayIcon,
    HashtagIcon,
    EyeIcon,
    SampleButton,
    SampleDivider
  }
}
</script>

<style scoped lang="scss">
.all-comment__main-block {
  background-color: var(--color-white);
  border-radius: 20px;
  width: 700px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.muvi-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;

  &__item {
    display: flex;
    position: relative;

    &-details {
      position: absolute;
      bottom: 12px;
      left: 8px;
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--color-white);
      font-size: 14px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}

.recent-list,
.people-list,
.groups-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left-block {
      display: flex;
      align-items: center;
      gap: 12px;

      p {
        margin: 0;
      }
    }
  }
}

.subscribe-button {
  padding: 10px 24px;
}

.recent-section__labels,
.people-section__labels,
.groups-section__labels,
.muvi-section__labels,
.article-section__labels,
.video-section__labels,
.audio-section__labels,
.hashtags-section__labels {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    line-height: 1;
    margin: 0;
    font-size: 18px;
    font-weight: 500;
  }

  a {
    text-decoration: none;
    color: var(--color-hippie-blue);
  }
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  gap: 12px;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

.article-body {
  background-color: var(--color-seashell);
  border-radius: 10px;

  &__details {
    padding: 12px;
    max-width: 320px;

    h3 {
      margin: 0;
      line-height: 1.2;
      font-size: 16px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 0;
      font-size: 14px;
      color: var(--color-gray);
    }
  }

  &_main-block {
    position: relative;
  }

  &__views-block {
    position: relative;
    height: 186px;
  }

  &__views {
    position: absolute;
    right: 10px;
    bottom: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--color-white);
    background: rgba(31, 31, 31, 0.50);
    backdrop-filter: blur(10px);
    border-radius: 4px;
    padding: 6px 8px;

    span {
      line-height: 1;
      font-size: 12px;
    }
    svg {
      width: 12px;
      height: 12px;
    }
  }
}

.article-header {
  display: flex;
  gap: 8px;

  img {
    width: 40px;
    height: 40px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 4px;

    h3 {
      margin: 0;
      font-weight: 500;
      font-size: 16px;
      line-height: 1;
    }

    small {
      color: var(--color-secondary);
      line-height: 1;
    }
  }
}

.video-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;

  .custom-video__container {
    width: 320px;
    height: 186px;
  }

  .custom-player-controls .play-button {
    width: 40px;
    height: 40px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 320px;

    &-header {
      display: flex;
      gap: 8px;

      &__details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;

        h3 {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          line-height: 1;
        }

        small {
          line-height: 1;
          color: var(--color-secondary);
        }
      }

      img {
        width: 40px;
        height: 40px;
      }
    }

    &-details {
      h3 {
        margin: 0;
        line-height: 1;
        font-size: 16px;
        font-weight: 500;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      span {
        color: var(--color-secondary);
        font-size: 14px;
      }
    }
  }

}

.hashtags-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;

    &-title {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    p {
      margin: 0;
      line-height: 1;
    }

    span {
      font-size: 14px;
      color: var(--color-secondary);
      line-height: 1;
    }
  }
}

.hashtag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-seashell);

  svg {
    width: 20px;
    height: 20px;
  }
}

.recent-section,
.people-section,
.groups-section,
.muvi-section,
.article-section,
.video-section,
.audio-section,
.hashtags-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

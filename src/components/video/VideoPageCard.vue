<template>
  <div class="video__page--card">
    <router-link :to="`/${$i18n.locale}/video-page/${videoCard.id}`" class="video__page--card__img">
      <img :src="videoCard.img" :alt="videoCard.name" />
    </router-link>
    <div class="video__page--card__info">
      <div class="video__page--card__top">
        <router-link
          :to="`/${$i18n.locale}/video-page/${videoCard.id}`"
          class="video__page--card__name"
          >{{ videoCard.name }}</router-link
        >
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
      </ul>
      <div class="video__page--card__description">
        <span class="video__page--card__description--text">
          {{
            !videoCard.isExtended && videoCard.description.length > 250
              ? videoCard.description.slice(0, 250) + '...'
              : videoCard.description
          }}
        </span>
        <span
          class="video__page--card__read"
          v-if="!videoCard.isExtended && videoCard.description.length > 250"
          @click="videoCard.isExtended = true"
          >{{ $t('video.read_more') }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookmarkIcon from '@/components/icons/BookmarkIcon.vue'
import BookmarkFilledIcon from '@/components/icons/BookmarkFilledIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

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

<style lang="scss">
.video__page--card {
  background-color: var(--color-white);
  padding: 16px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 205px 1fr;
  gap: 20px;
  @media (max-width: 767px) {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    width: 100%;
  }
  &__img {
    width: 100%;
    height: 293px;
    border-radius: 12px;
    overflow: hidden;
    @media (max-width: 767px) {
      height: 239px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }
  }
  &__top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
  }
  &__name {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    text-decoration: none;
  }
  &__right {
    display: flex;
    gap: 8px;
  }
  &__saved {
    padding: 7px;
    border-radius: 8px;
    background-color: var(--color-seashell);
    cursor: pointer;
    color: var(--color-mine-shaft);
    user-select: none;
    @media (max-width: 767px) {
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: var(--color-white);
    }
    svg {
      display: block;
      width: 18px;
      height: 18px;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 7px;
    border-radius: 8px;
    background-color: var(--color-seashell);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    user-select: none;
    @media (max-width: 767px) {
      position: absolute;
      top: 199px;
      right: 8px;
      background-color: var(--color-white);
    }
    svg {
      display: block;
      width: 18px;
      height: 18px;
    }
  }
  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0 0 15px;
    @media (max-width: 767px) {
      display: none;
    }
    li {
      display: flex;
      align-items: center;
      gap: 20px;
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-secondary);
        max-width: 160px;
        width: 100%;
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
  &__description {
    @media (max-width: 767px) {
      display: none;
    }
    &--text {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      color: var(--color-mine-shaft);
    }
  }
  &__read {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: 150%;
    color: var(--color-hippie-blue);
    cursor: pointer;
  }
}
</style>

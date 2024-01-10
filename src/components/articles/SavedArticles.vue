<template>
  <section class="search-articles__section">
    <div class="search-articles__block">
      <LoupeIcon />
      <input
        type="text"
        class="search-articles__input"
        :placeholder="$t('placeholders.search_articles')"
      />
    </div>
  </section>
  <div class="articles-main__block">
    <section>
      <ul class="articles-list">
        <li class="articles-list__item">
          <div class="articles-image__section">
            <img src="@/assets/images/articles/articles_1.png" alt="" />
            <div class="favourite-icon__block">
              <FavouritedIcon />
            </div>
            <div class="watched-icon__block">
              <EyeIcon />
              <span>145</span>
            </div>
          </div>
          <div class="articles-description__section">
            <div class="articles-category">
              <span>Автомобили и транспорт</span>
              <small>20.08.2022</small>
            </div>
            <h3 class="articles-description">
              Название очень интересной статьи, которую опубликовал пользователь
            </h3>
            <div class="articles-description__author">
              <img src="@/assets/images/navbar/people_1.png" alt="" />
              <span>Абдуллах Хамхоев</span>
            </div>
          </div>
        </li>
        <li class="articles-list__item">
          <div class="articles-image__section">
            <img src="@/assets/images/articles/articles_2.png" alt="" />
            <div class="favourite-icon__block">
              <FavouritedIcon />
            </div>
            <div class="watched-icon__block">
              <EyeIcon />
              145
            </div>
          </div>
          <div class="articles-description__section">
            <div class="articles-category">
              <span>Автомобили и транспорт</span>
              <small>20.08.2022</small>
            </div>
            <h3 class="articles-description">
              Название очень интересной статьи, которую опубликовал пользователь
            </h3>
            <div class="articles-description__author">
              <img src="@/assets/images/navbar/people_2.png" alt="" />
              <span>Абдуллах Хамхоев</span>
            </div>
          </div>
        </li>
        <li class="articles-list__item">
          <div class="articles-image__section">
            <img src="@/assets/images/articles/articles_3.png" alt="" />
            <div class="favourite-icon__block">
              <FavouritedIcon />
            </div>
            <div class="watched-icon__block">
              <EyeIcon />
              145
            </div>
          </div>
          <div class="articles-description__section">
            <div class="articles-category">
              <span>Автомобили и транспорт</span>
              <small>20.08.2022</small>
            </div>
            <h3 class="articles-description">
              Название очень интересной статьи, которую опубликовал пользователь
            </h3>
            <div class="articles-description__author">
              <img src="@/assets/images/navbar/people_3.png" alt="" />
              <span>Абдуллах Хамхоев</span>
            </div>
          </div>
        </li>
        <li class="articles-list__item">
          <div class="articles-image__section">
            <img src="@/assets/images/articles/articles_4.png" alt="" />
            <div class="favourite-icon__block">
              <FavouritedIcon />
            </div>
            <div class="watched-icon__block">
              <EyeIcon />
              145
            </div>
          </div>
          <div class="articles-description__section">
            <div class="articles-category">
              <span>Автомобили и транспорт</span>
              <small>20.08.2022</small>
            </div>
            <h3 class="articles-description">
              Название очень интересной статьи, которую опубликовал пользователь
            </h3>
            <div class="articles-description__author">
              <img src="@/assets/images/navbar/people_5.png" alt="" />
              <span>Абдуллах Хамхоев</span>
            </div>
          </div>
        </li>
        <li class="articles-list__item">
          <div class="articles-image__section">
            <img src="@/assets/images/articles/articles_5.png" alt="" />
            <div class="favourite-icon__block">
              <FavouritedIcon />
            </div>
            <div class="watched-icon__block">
              <EyeIcon />
              145
            </div>
          </div>
          <div class="articles-description__section">
            <div class="articles-category">
              <span>Автомобили и транспорт</span>
              <small>20.08.2022</small>
            </div>
            <h3 class="articles-description">
              Название очень интересной статьи, которую опубликовал пользователь
            </h3>
            <div class="articles-description__author">
              <img src="@/assets/images/navbar/people_4.png" alt="" />
              <span>Абдуллах Хамхоев</span>
            </div>
          </div>
        </li>
        <li class="articles-list__item">
          <div class="articles-image__section">
            <img src="@/assets/images/articles/articles_6.png" alt="" />
            <div class="favourite-icon__block">
              <FavouritedIcon />
            </div>
            <div class="watched-icon__block">
              <EyeIcon />
              145
            </div>
          </div>
          <div class="articles-description__section">
            <div class="articles-category">
              <span>Автомобили и транспорт</span>
              <small>20.08.2022</small>
            </div>
            <h3 class="articles-description">
              Название очень интересной статьи, которую опубликовал пользователь
            </h3>
            <div class="articles-description__author">
              <img src="@/assets/images/navbar/people_3.png" alt="" />
              <span>Абдуллах Хамхоев</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <aside>
      <div class="filter_block">
        <h3>Категории</h3>
        <ul class="category-list">
          <li class="category-list__item">Автомобили и транспорт</li>
          <li class="category-list__item">Образование</li>
          <li class="category-list__item">Экономика и торговля</li>
          <li class="category-list__item">Образ жизни</li>
          <li class="category-list__item">Развлечения</li>
          <li class="category-list__item">Фетвы</li>
          <li class="category-list__item">Игры</li>
          <li class="category-list__item">История и факты</li>
          <li class="category-list__item">Фильмы и анимация</li>
          <li class="category-list__item">Новости и политика</li>
          <li class="category-list__item">Люди и нация</li>
          <li class="category-list__item">Природа</li>
          <li class="category-list__item">Места и регионы</li>
          <li class="category-list__item">Спорт</li>
          <li class="category-list__item">Наука и технология</li>
          <li class="category-list__item">Животные</li>
          <li class="category-list__item">Путешествия и события</li>
          <li class="category-list__item">Другое</li>
        </ul>
      </div>
      <SampleButton class="clear-filter__button" :title="$t('buttons.reset_filter')" />
    </aside>
  </div>
</template>

<script>
import LoupeIcon from '@/components/icons/navbar/small-display/LoupeIcon.vue'
import FavouritedIcon from '@/components/icons/FavouritedIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: {
    SampleButton,
    EyeIcon,
    FavouritedIcon,
    LoupeIcon
  }
}
</script>

<style scoped lang="scss">
aside {
  max-width: 344px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.clear-filter__button {
  padding: 12px 16px;
  width: max-content;
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
  }
}

.articles-main__block {
  display: flex;
  gap: 22px;
}

.filter_block {
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 18px;

  h3 {
    margin: 0 0 10px;
    line-height: 1;
  }
}

.search-articles__section {
  margin-bottom: 20px;
}

.search-articles__block {
  display: flex;
  align-items: flex-start;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 18px 32px;
  max-width: 800px;
  gap: 16px;

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-secondary);
  }

  .search-articles__input {
    all: unset;
    font-size: 16px;
    color: var(--color-secondary);
    line-height: 1;
    width: 100%;

    &::placeholder {
      color: var(--color-secondary);
    }
  }
}

.articles-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  &__item {
    max-width: 380px;
    background-color: var(--color-white);
    padding: 8px;
    border-radius: 15px;
  }
}

.articles-image__section {
  position: relative;
}

.favourite-icon__block {
  border-radius: 6px;
  background: rgba(31, 31, 31, 0.5);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.watched-icon__block {
  border-radius: 6px;
  background: rgba(31, 31, 31, 0.5);
  backdrop-filter: blur(10px);
  position: absolute;
  bottom: 18px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  padding: 4px 10px;
  font-size: 16px;
  gap: 4px;

  svg {
    width: 18px;
    height: 18px;
  }
}

.articles-category {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 14px;
    padding: 4px 10px;
    color: var(--color-mine-shaft);
    border-radius: 8px;
    background-color: var(--color-seashell);
  }

  small {
    font-size: 14px;
    color: var(--color-silver-chalice);
  }
}

.articles-description__section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
}

.articles-description {
  font-size: 16px;
  line-height: 1.2;
  margin: 0;
  color: var(--color-mine-shaft);
}

.articles-description__author {
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 14px;
    color: var(--color-secondary);
    line-height: 1;
  }
}

@media (max-width: 576px) {
  .watched-icon__block {
    font-size: 12px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  .articles-category {
    small {
      font-size: 12px;
    }
  }

  .articles-description {
    font-size: 14px;
  }

  .articles-list {
    grid-template-columns: repeat(1, 1fr);
  }

  aside {
    display: none;
  }

  .search-articles__section {
    display: none;
  }

  .articles-description__author {
    img {
      width: 22px;
      height: 22px;
    }
  }

  .articles-main__block {
    position: relative;
    top: 80px;
    padding: 0 20px;
  }

  .articles-list__item {
    padding: 0;
  }

  .articles-list {
    gap: 20px;
    margin-bottom: 80px;
  }
}

@media (min-width: 1920px) {
  .articles-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

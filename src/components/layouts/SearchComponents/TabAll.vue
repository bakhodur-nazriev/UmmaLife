<template>
  <div>
    <div class="recent-title">
      <span>{{ $t('labels.search.recent') }}</span>
      <router-link :to="`/${$i18n.locale}/search-all-recommendations`">{{ $t('labels.search.see_all') }}</router-link>
    </div>

    <ul class="recent-list">
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/recent_1.png" alt="">
        <div class="recent-list-item-title">
          <p>Графический дизайн</p>
          <span>Сообщество</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/recent_2.png" alt="">
        <div class="recent-list-item-title">
          <p>Алексей Иванов</p>
          <span>Пользователь</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/recent_3.png" alt="">
        <div class="recent-list-item-title">
          <p>Графический дизайн</p>
          <span>Сообщество</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/recent_4.png" alt="">
        <div class="recent-list-item-title">
          <p>Графический дизайн</p>
          <span>Сообщество</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/recent_5.png" alt="">
        <div class="recent-list-item-title">
          <p>Алексей Иванов</p>
          <span>Пользователь</span>
        </div>
      </li>
    </ul>
  </div>

  <SampleDivider />

  <div>
    <div class="recent-title">
      <span>{{ $t('labels.search.people') }}</span>
      <router-link :to="`/${$i18n.locale}/search-people`">{{ $t('labels.search.see_all') }}</router-link>
    </div>

    <ul class="recent-list">
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_1.png" alt="">
        <div class="recent-list-item-title">
          <p>Алексей Иванов</p>
          <span>Пользователь</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_2.png" alt="">
        <div class="recent-list-item-title">
          <p>Андрей Андрей</p>
          <span>Пользователь</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_3.png" alt="">
        <div class="recent-list-item-title">
          <p>Азамат Азаматалиев</p>
          <span>Пользователь</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_4.png" alt="">
        <div class="recent-list-item-title">
          <p>Курбан Гаджимагомедов</p>
          <span>Пользователь</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_5.png" alt="">
        <div class="recent-list-item-title">
          <p>Дмитрий Дмитриев</p>
          <span>Пользователь</span>
        </div>
      </li>
    </ul>
  </div>

  <SampleDivider />

  <div>
    <div class="recent-title">
      <span>{{ $t('labels.search.communities') }}</span>
      <router-link :to="`/${$i18n.locale}/search-groups`">{{ $t('labels.search.see_all') }}</router-link>
    </div>

    <ul class="recent-list">
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_1.png" alt="">
        <div class="recent-list-item-title">
          <p>юикс/юай</p>
          <span>1234 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_2.png" alt="">
        <div class="recent-list-item-title">
          <p>Venom Foundation</p>
          <span>3214 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_3.png" alt="">
        <div class="recent-list-item-title">
          <p>Islamic Coin</p>
          <span>4325 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_4.png" alt="">
        <div class="recent-list-item-title">
          <p>Кулинария</p>
          <span>345 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_5.png" alt="">
        <div class="recent-list-item-title">
          <p>Qatar University <span><VerifyIcon /></span></p>
          <span>5421 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
    </ul>
  </div>

  <SampleDivider />

  <div>
    <div class="recent-title">
      <span>{{ $t('labels.search.muvi') }}</span>
      <router-link :to="`/${$i18n.locale}/search-muvi`">{{ $t('labels.search.see_all') }}</router-link>
    </div>

    <ul class="muvi-list">
      <li class="muvi-list__item">
        <div class="muvi-list__item-block">
          <img src="@/assets/images/navbar/muvi_1.png" alt="">

          <div class="muvi-list__item-block__author">
            <img src="@/assets/images/navbar/muvi_author_avatar.png" alt="">
            <span class="muvi-list__item-block__author-name">alexaliev</span>
            <VerifyIcon />
          </div>

        </div>
        <h3 class="muvi-list__item-title">Наша поездка в Саудию в марте. Как это было Как это было</h3>
        <div class="muvi-list__item-subtitle">
          <span>02.03.2023</span>
          <span class="muvi-item__watched"><EyeIcon/> 17,8k</span>
        </div>

      </li>
      <li class="muvi-list__item">
        <div class="muvi-list__item-block">
          <img src="@/assets/images/navbar/muvi_2.png" alt="">

          <div class="muvi-list__item-block__author">
            <img src="@/assets/images/navbar/muvi_author_avatar.png" alt="">
            <span class="muvi-list__item-block__author-name">alexaliev</span>
            <VerifyIcon />
          </div>

        </div>
        <h3 class="muvi-list__item-title">Наша поездка в Саудию в марте. Как это было...</h3>
        <div class="muvi-list__item-subtitle">
          <span>02.03.2023</span>
          <span class="muvi-item__watched"><EyeIcon/> 17,8k</span>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import VerifyIcon from '@/components/icons/VerifyIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'

export default {
  components: {
    EyeIcon,
    SampleDivider,
    VerifyIcon
  }
}
</script>

<style scoped lang="scss">
.recent-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin: 0 0 18px;

  &-item {
    display: flex;
    gap: 12px;
    align-items: center;

    &-title {
      display: flex;
      flex-direction: column;
    }

    p {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 0;
      line-height: 1;
      margin-bottom: 4px;
      font-size: 16px;

      span {
        display: flex;
      }
    }

    span {
      color: var(--color-secondary);
      font-size: 14px;
    }
  }
}

.recent-title {
  display: flex;
  justify-content: space-between;
  line-height: 1;
  margin: 20px 0;

  span {
    color: var(--color-mine-shaft);
    font-weight: 500;
  }

  a {
    text-decoration: none;
    color: var(--color-hippie-blue);
  }
}

.muvi-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  row-gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    max-width: 166px;

    &-title {
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      line-height: 1.2;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &-subtitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: var(--color-gray);
      line-height: 1;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__item-block {
    display: flex;
    position: relative;

    &__author {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      color: var(--color-white);

      svg {
        width: 12px;
        height: 12px;
      }

      &-name {
        font-size: 12px;
      }
    }
  }
}
</style>

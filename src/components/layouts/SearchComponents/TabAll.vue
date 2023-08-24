<template>
  <div>
    <div class="recent-title">
      <span>{{ $t('labels.search.recent') }}</span>
      <router-link to="" >{{ $t('labels.search.see_all') }}</router-link>
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
      <router-link to="" >{{ $t('labels.search.see_all') }}</router-link>
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
      <router-link to="" >{{ $t('labels.search.see_all') }}</router-link>
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
      <router-link to="" >{{ $t('labels.search.see_all') }}</router-link>
    </div>
  </div>
</template>

<script>
import VerifyIcon from '@/components/icons/VerifyIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'

export default {
  components: { SampleDivider, VerifyIcon }

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
</style>

<template>
  <div>
    <div class="recent-title">
      <span>{{ $t('labels.search.people') }}</span>
      <router-link to="" >{{ $t('labels.search.see_all') }}</router-link>
    </div>

    <ul class="recent-list">
      <li class="recent-list-item">
        <div class="recent-list-item-avatar">
          <img src="@/assets/images/navbar/people_1.png" alt="">
        </div>
        <div class="recent-list-item-title">
          <p>Мухаммад абу Абдуллах</p>
          <span>Доха, 27 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_2.png" alt="">
        <div class="recent-list-item-title">
          <p>Алексей Иванов</p>
          <span>Астана , 35 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_3.png" alt="">
        <div class="recent-list-item-title">
          <p>Андрей Андрей</p>
          <span>Москва, 52 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <div class="recent-list-item-avatar">
          <img src="@/assets/images/navbar/people_4.png" alt="">
        </div>
        <div class="recent-list-item-title">
          <p>Азамат Азаматалиев</p>
          <span>Магас, 31 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_5.png" alt="">
        <div class="recent-list-item-title">
          <p>Курбан Гаджимагомедов <span><VerifyIcon /></span></p>
          <span>Стамбул, 43 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <div class="recent-list-item-avatar">
          <img src="@/assets/images/navbar/people_1.png" alt="">
        </div>
        <div class="recent-list-item-title">
          <p>Мухаммад абу Абдуллах</p>
          <span>Доха, 27 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_2.png" alt="">
        <div class="recent-list-item-title">
          <p>Алексей Иванов</p>
          <span>Астана , 35 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_3.png" alt="">
        <div class="recent-list-item-title">
          <p>Андрей Андрей</p>
          <span>Москва, 52 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <div class="recent-list-item-avatar">
          <img src="@/assets/images/navbar/people_4.png" alt="">
        </div>
        <div class="recent-list-item-title">
          <p>Азамат Азаматалиев</p>
          <span>Магас, 31 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_5.png" alt="">
        <div class="recent-list-item-title">
          <p>Курбан Гаджимагомедов <span><VerifyIcon /></span></p>
          <span>Стамбул, 43 {{ $t('tabs.search.age.plural') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import VerifyIcon from '@/components/icons/VerifyIcon.vue'

export default {
  components: { VerifyIcon }
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

    &-avatar {
      display: flex;
      background-color: var(--color-hippie-blue);
      padding: 2px;
      border-radius: 50%;
      width: 40px;
      height: 40px;

      img  {
        padding: 1px;
        background-color: var(--color-white);
        border-radius: 50%;
      }
    }

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

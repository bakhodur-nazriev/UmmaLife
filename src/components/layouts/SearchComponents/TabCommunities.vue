<template>
  <div>
    <div class="recent-title">
      <span>{{ $t('labels.search.communities') }}</span>
      <router-link to="" >{{ $t('labels.search.see_all') }}</router-link>
    </div>

    <ul class="recent-list">
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_1.png" alt="">
        <div class="recent-list-item-title">
          <p>юикс/юай <span><VerifyIcon /></span></p>
          <span>3215 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_2.png" alt="">
        <div class="recent-list-item-title">
          <p>Venom Foundation</p>
          <span>54781{{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_3.png" alt="">
        <div class="recent-list-item-title">
          <p>Islamic Coin <span><VerifyIcon /></span></p>
          <span>98573 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_4.png" alt="">
        <div class="recent-list-item-title">
          <p>Кулинария</p>
          <span>908513 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_5.png" alt="">
        <div class="recent-list-item-title">
          <p>Qatar University</p>
          <span>34815 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_1.png" alt="">
        <div class="recent-list-item-title">
          <p>Графический дизайн</p>
          <span>7845671 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_2.png" alt="">
        <div class="recent-list-item-title">
          <p>#frontendCommunity <span><VerifyIcon /></span></p>
          <span>987431 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_3.png" alt="">
        <div class="recent-list-item-title">
          <p>Автоблог</p>
          <span>908341 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_4.png" alt="">
        <div class="recent-list-item-title">
          <p>Дневник Мусульманина #muslimdiary</p>
          <span>128974 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_5.png" alt="">
        <div class="recent-list-item-title">
          <p>Tooba</p>
          <span>98341 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_4.png" alt="">
        <div class="recent-list-item-title">
          <p>byQuran</p>
          <span>897431 {{ $t('labels.subscribers.plural') }}</span>
        </div>
      </li>
      <li class="recent-list-item">
        <img src="@/assets/images/navbar/people_5.png" alt="">
        <div class="recent-list-item-title">
          <p>cryptonews</p>
          <span>8975481 {{ $t('labels.subscribers.plural') }}</span>
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
</style>

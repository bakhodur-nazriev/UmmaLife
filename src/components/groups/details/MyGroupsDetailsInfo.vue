<template>
  <div class="profile">
    <div class="profile__inner">
      <div class="profile__top">
        <div class="profile__top--img">
          <img src="@/assets/images/ProfilePic.png" alt="Article_Author" />
        </div>
        <div class="profile__top--info">
          <div class="profile__top--name">Первый технологичный</div>
          <div class="profile__top--account">@abrahamavich</div>
        </div>
      </div>
      <button class="profile__edit">Вступить в группу</button>
      <div class="profile__block profile__info">
        <ul class="profile__top-list">
          <li class="profile__top-list--item">
            <ProfileIcon />
            <span>Доступность:</span>
            <p>Открытая группа</p>
          </li>
          <li class="profile__top-list--item">
            <CalendarIcon />
            <span>Категория:</span>
            <p>Наука и технологии</p>
          </li>
          <li class="profile__top-list--item">
            <GlobalSilverIcon />
            <span>Страна:</span>
            <p>Россия</p>
          </li>
        </ul>
      </div>
      <div class="profile__block profile__about">
        <div class="profile__about--title">О группе</div>
        <div class="profile__about--text">
          Не заходи без шапочки из фольги и пары надежных проксей. Интернет, уязвимости, полезные
          сервисы и IT-безопасность.
        </div>
      </div>
      <div class="profile__stats">
        <router-link :to="{ name: 'my-groups-users' }" class="profile__stats--item">
          <span>Участники</span>
          <p>1032</p>
        </router-link>
        <a href="#" class="profile__stats--item">
          <span>Аудио</span>
          <p>1011</p>
        </a>
        <a href="#" class="profile__stats--item">
          <span>Посты</span>
          <p>2064</p>
        </a>
        <a href="#" class="profile__stats--item">
          <span>Фото</span>
          <p>15586</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileIcon from '@/components/icons/profile/ProfileIcon.vue'
import CalendarIcon from '@/components/icons/profile/CalendarIcon.vue'
import GlobalSilverIcon from '@/components/icons/profile/GlobalSilverIcon.vue'
</script>

<style lang="scss" scoped>
.profile {
  &__inner {
    padding: 16px;
    border-radius: 20px;
    background-color: var(--color-white);
    height: fit-content;
  }
  &__top {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 16px;
    &--img {
      width: 100px;
      height: 100px;
      position: relative;
      & > img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
      }
    }
    &--camera {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-seashell);
      background: var(--color-white);
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      img {
        width: 18px;
        height: 18px;
      }
    }
    &--info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    &--name {
      color: var(--color-mine-shaft);
      font-size: 24px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
    }
    &--account {
      color: var(--color-deep-cerulean);
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
    }

    &-list {
      list-style: none;
      margin: 0;
      padding: 0;
      &--item {
        display: flex;
        align-items: center;
        gap: 8px;
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        svg {
          width: 13px;
          height: 13px;
          display: block;
        }
        span,
        p,
        a {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          color: var(--color-mine-shaft);
        }
        span {
          color: var(--color-silver-chalice);
        }
      }
    }
  }
  &__edit {
    width: 100%;
    color: var(--color-white);
    padding: 14px 14px 12px;
    border-radius: 20px;
    background-color: var(--color-green);
    cursor: pointer;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    margin-bottom: 24px;
  }
  &__block {
    border-top: 1px solid var(--color-seashell);
    padding: 24px 0 24px;
  }
  &__about {
    border-bottom: 1px solid var(--color-seashell);
    &--title {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-silver-chalice);
      margin-bottom: 16px;
    }
    &--text {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      color: var(--color-mine-shaft);
    }
  }
  &__stats {
    list-style: none;
    padding: 24px 0 12px;
    margin: 0;
    &--item {
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      &:not(:last-child) {
        margin-bottom: 24px;
      }
      span {
        width: 100px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-silver-chalice);
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
}
</style>

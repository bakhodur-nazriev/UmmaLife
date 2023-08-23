<template>
  <div class="profile">
    <div class="profile__inner">
      <div class="profile__top">
        <div class="profile__top--img">
          <img src="@/assets/images/ProfilePic.png" alt="Article_Author" />
          <button class="profile__top--camera">
            <img src="@/assets/images/camera.svg" alt="camera" />
          </button>
        </div>
        <div class="profile__top--info">
          <div class="profile__top--name">Абрахам Арахамович</div>
          <div class="profile__top--account">@abrahamavich</div>
        </div>
      </div>
      <button class="profile__edit">{{ $t('profile.edit') }}</button>
      <div class="profile__block profile__info">
        <ul class="profile__top-list">
          <li class="profile__top-list--item">
            <ProfileIcon />
            <span>{{ $t('profile.gender') }}:</span>
            <p>Male</p>
          </li>
          <li class="profile__top-list--item">
            <CalendarIcon />
            <span>{{ $t('profile.dob') }}:</span>
            <p>22.01.86</p>
          </li>
          <li class="profile__top-list--item">
            <GlobalSilverIcon />
            <span>{{ $t('profile.country') }}:</span>
            <p>Canada</p>
          </li>
          <li class="profile__top-list--item">
            <StudyIcon />
            <span>{{ $t('profile.study') }}:</span>
            <p>Harvard University</p>
          </li>
          <li class="profile__top-list--item">
            <LinkIcon />
            <span>{{ $t('profile.site') }}:</span>
            <a href="https://ummalife.com/" target="_blank">https://ummalife.com/</a>
          </li>
        </ul>
      </div>
      <div class="profile__block profile__about">
        <div class="profile__about--title">{{ $t('profile.about') }}</div>
        <div class="profile__about--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </div>
      </div>
      <ul class="profile__stats">
        <li class="profile__stats--item">
          <p>1032</p>
          <span>{{ $t('profile.following') }}</span>
        </li>
        <li class="profile__stats--item">
          <p>12</p>
          <span>{{ $t('profile.subscribes') }}</span>
        </li>
        <li class="profile__stats--item">
          <p>144</p>
          <span>Публикации</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import ProfileIcon from '@/components/icons/profile/ProfileIcon.vue'
import CalendarIcon from '@/components/icons/profile/CalendarIcon.vue'
import GlobalSilverIcon from '@/components/icons/profile/GlobalSilverIcon.vue'
import StudyIcon from '@/components/icons/profile/StudyIcon.vue'
import LinkIcon from '@/components/icons/profile/LinkIcon.vue'
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
    border-radius: 10px;
    background-color: var(--color-green);
    cursor: pointer;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    margin-bottom: 4px;
  }
  &__block {
    border-top: 1px solid var(--color-seashell);
    padding: 16px 0;
  }
  &__info {
    border-top: none;
  }
  &__about {
    border-bottom: 1px solid var(--color-seashell);
    &--title {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 12px;
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
    padding: 16px 0 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;
      min-width: 100px;
      padding: 0 30px;
      span {
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

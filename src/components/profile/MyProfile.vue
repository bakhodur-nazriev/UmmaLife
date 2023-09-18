<template>
  <div class="profile">
    <div class="profile__inner">
      <MobileProfileTopActions v-if="screenWidth < 575" />
      <div class="profile__cover">
        <img
          :src="coverImage ? coverImage : require('@/assets/images/profile-img.png')"
          alt="profile-img"
          class="profile__cover--img"
        />
        <div class="profile__cover--actions">
          <button class="profile__cover--btn profile__cover--change">
            <EditImageIcon />
            <span>Изменить обложку</span>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              class="profile__cover--input"
              @change="inputHandler($event, 'cover')"
            />
          </button>
          <button class="profile__cover--btn profile__cover--delete">
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div class="profile__wrapper">
        <div class="profile__top">
          <div class="profile__top--img" @click="clickImageHandler">
            <img
              :src="profileImage ? profileImage : require('@/assets/images/ProfilePic.png')"
              alt="Article_Author"
            />
            <CameraIcon :white="true" />
          </div>
          <ImageDropdown
            v-if="isDropdownOpen"
            @closeDropdown="closeDropdown"
            @changeProfile="changeProfile"
            @inputHandler="inputHandler"
          />
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </div>
        </div>
        <div class="profile__block profile__investor">
          <p>Статус инвестора:</p>
          <div class="profile__investor--status blue">
            <!-- blue | purple -->
            <StatusInvestorIcon />
            <span>UMMA TOKEN INVESTOR</span>
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
  </div>
</template>

<script setup>
import ProfileIcon from '@/components/icons/profile/ProfileIcon.vue'
import CalendarIcon from '@/components/icons/profile/CalendarIcon.vue'
import GlobalSilverIcon from '@/components/icons/profile/GlobalSilverIcon.vue'
import StudyIcon from '@/components/icons/profile/StudyIcon.vue'
import LinkIcon from '@/components/icons/profile/LinkIcon.vue'
import StatusInvestorIcon from '@/components/icons/StatusInvestorIcon.vue'
import DeleteIcon from '@/components/icons/message/DeleteIcon.vue'
import EditImageIcon from '@/components/icons/EditImageIcon.vue'
import CameraIcon from '@/components/icons/CameraIcon.vue'
import ImageDropdown from '@/components/profile/ImageDropdown.vue'
import MobileProfileTopActions from './MobileProfileTopActions.vue'

import { useWindowSize } from '@vueuse/core'
import { ref, computed } from 'vue'

const screenWidth = computed(() => {
  const { width } = useWindowSize()
  return width.value
})

const profileImage = ref('')
const coverImage = ref('')
const file = ref(null)
const isDropdownOpen = ref(false)
const isChangeClicked = ref(false)

const inputHandler = (event, type) => {
  isDropdownOpen.value = false
  file.value = event.target.files[0]
  if (!file.value) return
  const image = URL.createObjectURL(file.value)
  if (type === 'cover') {
    coverImage.value = image
  } else {
    profileImage.value = image
  }
}

const changeProfile = () => {
  isChangeClicked.value = true
}

const clickImageHandler = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
  isChangeClicked.value = false
}
</script>

<style lang="scss" scoped>
.profile {
  @media (max-width: 575px) {
    position: relative;
    background-color: var(--color-white);
    box-shadow: 10px 0 40px 0px rgba(108, 108, 108, 0.15);
    border-radius: 0 0 20px 20px;
    overflow: hidden;
  }
  &__cover {
    width: 100%;
    height: 218px;
    position: relative;
    overflow: hidden;
    @media (max-width: 575px) {
      border-radius: 0;
      height: 170px;
    }
    img {
      object-fit: cover;
      object-position: center;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  &__wrapper {
    background-color: var(--color-white);
  }
  &__inner {
    border-radius: 20px;
    background-color: var(--color-white);
    height: fit-content;
    min-width: 480px;
    overflow: hidden;

    @media (max-width: 768px) {
      min-width: 100%;
    }
    @media (max-width: 575px) {
      border-radius: 0;
    }
  }
  &__top {
    display: flex;
    align-items: flex-end;
    margin-bottom: 16px;
    padding: 0 16px;
    gap: 15px;
    margin-top: -16px;
    position: relative;
    @media (max-width: 575px) {
      background-color: var(--color-white);
      flex-direction: column;
      align-items: center;
      border-radius: 20px;
    }
    &--img {
      width: 80px;
      height: 80px;
      position: relative;
      border: 2px solid var(--color-white);
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      @media (max-width: 575px) {
        margin-top: -40px;
        border-color: transparent;
      }
      & > img {
        width: 100%;
        height: 100%;
        display: block;

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
      gap: 6px;
      @media (max-width: 575px) {
        align-items: center;
      }
    }
    &--name {
      color: var(--color-mine-shaft);
      font-size: 24px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
    }
    &--account {
      color: var(--color-silver-chalice);
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
    width: calc(100% - 32px);
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
    margin: 0 16px 4px;
    &:hover {
      background-color: var(--color-deep-cerulean);
      color: var(--color-white);
      transition: all 0.15s ease-in-out;
    }
  }
  &__investor {
    padding: 6px 6px 6px 16px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-seashell);
    border: none !important;
    border-radius: 10px;
    margin-bottom: 16px !important;
    p {
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &--status {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 9px 12px;
      border-radius: 6px;
      svg {
        width: 12px;
        height: 12px;
      }
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-white);
      }
      &.blue {
        background: linear-gradient(110deg, #066d86 11.09%, #00a3c8 83.59%);
      }

      &.purple {
        background: linear-gradient(127deg, #9945da 18.23%, #812bc5 92.42%);
      }
    }
  }
  &__block {
    border-top: 1px solid var(--color-seashell);
    padding: 16px 0;
    margin: 0 16px;
    width: calc(100% - 32px);
  }
  &__info {
    border-top: none;
  }
  &__about {
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
    padding: 16px 0;
    margin: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color-seashell);
    width: calc(100% - 32px);
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

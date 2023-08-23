<template>
  <div class="profile">
    <div class="profile__inner">
      <div class="profile__box">
        <div class="profile__top">
          <div class="profile__top--img">
            <img src="@/assets/images/ProfilePic.png" alt="Article_Author" />
          </div>
          <div class="profile__top--info">
            <div class="profile__top--name">Первый технологичный</div>
            <div class="profile__top--account">@abrahamavich</div>
          </div>
        </div>
        <button class="profile__edit" @click="$router.push(`/my-groups/settings`)">
          Редактировать группу
        </button>
        <div class="profile__block profile__info no-border">
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
            <p>1032</p>
            <span>Участники</span>
          </router-link>
          <a href="#" class="profile__stats--item">
            <p>12</p>
            <span>Подписчики</span>
          </a>
          <a href="#" class="profile__stats--item">
            <p>90</p>
            <span>Публикации</span>
          </a>
        </div>
      </div>

      <section class="profile__recommendations">
        <div class="aside__title--section">
          <h3 class="text-1 medium">{{ $t('sections_title.recommended_groups') }}</h3>
          <router-link class="link" to="#">{{ $t('links.all_groups') }}</router-link>
        </div>
        <hr class="divider__line" />
        <div class="group__section">
          <div class="group__right--side" v-for="(group, index) in recommendedGroups" :key="index">
            <router-link class="group__link" to="#">
              <img src="@/assets/images/Ellipse.png" alt="" />
              <div class="group__info">
                <span>{{ group.name }}</span>
                <small>{{ group.members }}</small>
              </div>
            </router-link>
            <SampleButton icon="plus" color="primary" :title="`${$t('buttons.join')}`" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProfileIcon from '@/components/icons/profile/ProfileIcon.vue'
import CalendarIcon from '@/components/icons/profile/CalendarIcon.vue'
import GlobalSilverIcon from '@/components/icons/profile/GlobalSilverIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
export default {
  components: { ProfileIcon, CalendarIcon, GlobalSilverIcon, SampleButton },
  computed: {
    recommendedGroups() {
      return [
        { name: 'Мы Мусульмане', members: 4560 + ' ' + this.$t('labels.members.plural') },
        { name: 'Big Kahuna BuLtd.', members: 21260 + ' ' + this.$t('labels.members.plural') },
        { name: 'Binford Ltd.', members: 33241 + ' ' + this.$t('labels.members.plural') },
        { name: 'Biffco EnterpriLtd.', members: 445100 + ' ' + this.$t('labels.members.plural') },
        { name: 'Acme Co.', members: 987654 + ' ' + this.$t('labels.members.plural') }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  &__box {
    margin-bottom: 8px;
    padding: 16px;
    border-radius: 20px;
    background-color: var(--color-white);
    height: fit-content;
  }
  &__recommendations {
    background-color: var(--color-white);
    color: var(--color-silver-chalice);
    border-radius: 15px;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    .person__info,
    .group__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .person__info span,
    .group__info span {
      color: var(--color-mine-shaft);
    }

    .person__info small,
    .group__info small {
      color: var(--color-silver-chalice);
    }

    .person__right--side,
    .group__right--side {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .aside__title--section {
      display: flex;
      justify-content: space-between;
    }

    .person__link,
    .group__link,
    .actions__link {
      display: flex;
      width: 100%;
      text-decoration: none;
      align-items: center;
    }

    .person__link img,
    .group__link img,
    .actions__link img {
      margin-right: 8px;
      width: 56px;
      height: 56px;
    }

    .actions__section span {
      color: var(--color-mine-shaft);
    }

    .person__section,
    .group__section,
    .actions__section {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }

    .divider__line {
      height: 1px;
      margin: 16px 0;
      border: 0;
      background-color: var(--color-alto-second);
    }

    .section__last--actions,
    .section__recommended--groups,
    .section__recommended--people {
      background-color: var(--color-white);
      color: var(--color-silver-chalice);
      border-radius: 15px;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
    }

    .aside__publications {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
    }

    @media (min-width: 768px) {
    }

    @media (min-width: 1280px) {
      .aside__publications {
        min-width: 350px;
      }

      .person__right--side button,
      .group__right--side button {
        height: 34px;
        padding: 8px 10px;
        font-size: 14px;
        min-width: 110px;
        max-width: 110px;
      }
    }

    @media (min-width: 1920px) {
      .person__right--side button,
      .group__right--side button {
        height: 34px;
        padding: 8px 32px;
        font-size: 14px;
        min-width: 153px;
        max-width: 153px;
      }
    }
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
  }
  &__block {
    border-top: 1px solid var(--color-seashell);
    padding: 24px 0 24px;
    .no-border {
      border-top: none;
    }
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
    padding: 16px 0 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-decoration: none;
      padding: 0 25px;
      align-items: center;
      span {
        width: 100px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-silver-chalice);
        text-align: center;
      }
      p {
        margin: 0 auto;
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

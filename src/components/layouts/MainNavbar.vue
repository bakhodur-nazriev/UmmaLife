<template>
  <header class="navbar-header">
    <nav class="navbar">
      <div class="right__nav--side">
        <button type="button" class="menu__button" @click="toggleSidebar">
          <MenuIcon/>
        </button>
        <MainPageLogo class="main__logo"/>
      </div>
      <div class="main__nav--side">
        <SampleButton class="create__button" :title="`${$t('buttons.create')}`"/>
        <SearchInput
            @open-search-input="isSearchInputOpen = true"
            :placeholder="$t('placeholders.search_input')"
        />
      </div>
      <div class="left__nav--side">
        <ul class="navbar__right--buttons">
          <li class="music__button" :class="{ active: isPlayerOpen }" @click="playerClickHandler">
            <MusicIcon/>
          </li>
          <li class="email__button">
            <EmailIcon/>
          </li>
          <li
              class="notification__button"
              @click="isNotificationOpen = !isNotificationOpen"
              :class="{ active: isNotificationOpen }"
          >
            <NotificationIcon/>
          </li>
          <router-link :to="`/${$i18n.locale}/settings`">
            <li class="settings__button">
              <SettingIcon/>
            </li>
          </router-link>
        </ul>
        <div class="user__menu--block">
          <div class="profile__image" @click="toggleProfile">
            <img :src="user.avatar" alt="avatar-logo"/>
          </div>
          <ArrowIcon class="dropdown__icon"/>
        </div>
      </div>

      <Transition name="bounce">
        <div class="modal-profile" v-if="isProfileOpen">
          <ul class="menu-list">
            <li class="menu-list__item">
              <a href="/profile" class="user-item">
                <span class="user-name">{{ user.name }}</span>
                <img :src="user.avatar" alt="">
              </a>
            </li>
            <li class="menu-list__item">
              <a href="/profile">{{ $t('links.requests') }}</a>
            </li>
            <li class="menu-list__item">
              <a href="/settings">{{ $t('links.settings') }}</a>
            </li>
            <li class="menu-list__item">
              <button
                  type="submit"
                  class="logout-button"
                  @click="logout"
              >
                {{ $t('links.logout') }}
              </button>
            </li>
          </ul>
          <div class="profile-wallet">
            <div class="profile-wallet__first-item">
              <WalletSmallIcon/>
              <span>{{ $t('profile.wallet.title') }}</span>
              <span>$0.00</span>
            </div>
            <div class="profile-wallet__second-item">
              <span>0x1276...5c9c</span>
              <CopyWalletIcon/>
            </div>
            <div class="profile-wallet__third-item">
              <span>0.00</span>
              <span>umma</span>
            </div>
            <div class="bg-wallet">
              <WalletBgIcon/>
            </div>
          </div>
        </div>
      </Transition>

    </nav>
    <nav class="small-nav">
      <div class="top__nav">
        <ul class="top__nav--list">
          <li class="top__nav--left-item">
            <router-link v-if="!isSearchForm" to="/news">
              <SmallLogo/>
            </router-link>
            <button
                v-if="isSearchForm"
                type="button"
                @click="isSearchFormClose"
                class="close-search__form"
            >
              <ArrowLeftIcon/>
            </button>
          </li>
          <li class="top__nav--search-item" v-if="isSearchForm">
            <div class="main__search--block">
              <LoupeInputIcon class="search__icon"/>
              <input class="base__search--input" :placeholder="$t('placeholders.search_input')"/>
            </div>
          </li>
          <li class="top__nav--right-item" v-if="!isSearchForm">
            <div v-if="!isSearchForm" @click="isSearchFormOpen">
              <LoupeIcon/>
            </div>
            <div>
              <SmallMenuIcon/>
            </div>
          </li>
        </ul>
      </div>
      <SearchTab :tabs="tabData" v-if="isSearchForm">
        <template v-for="(tab, i) in tabData" v-slot:[tab.label]="" :key="i">
          <TabAll v-if="i === 0"/>
          <TabPeople v-if="i === 1"/>
          <TabCommunities v-if="i === 2"/>
          <TabMUVI v-if="i === 3"/>
          <TabArticle v-if="i === 4"/>
          <TabVideo v-if="i === 5"/>
          <TabAudio v-if="i === 6"/>
          <TabHashtags v-if="i === 7"/>
        </template>
      </SearchTab>
      <div class="bottom__nav">
        <ul class="bottom__nav--list">
          <li class="bottom__nav--item">
            <router-link to="to">
              <NewsIcon/>
            </router-link>
          </li>
          <li class="bottom__nav--item">
            <router-link to="">
              <MessagesIcon/>
            </router-link>
          </li>
          <li class="bottom__nav--item">
            <router-link :to="`/${$i18n.locale}/muvi`">
              <MuviNavIcon/>
            </router-link>
          </li>
          <li class="bottom__nav--item">
            <router-link :to="`/${$i18n.locale}/notifications`">
              <BellIcon/>
            </router-link>
          </li>
          <li class="bottom__nav--item">
            <router-link :to="`/${$i18n.locale}/settings`">
              <MyPageIcon/>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="search-outside__block" v-if="isSearchInputOpen">
      <div class="search-inside__block">
        <section class="all-recommendation__block">
          <router-link :to="`/${$i18n.locale}/search-article`">
            {{ $t('labels.search.show_all_recommendation') }}
            <ArrowLeftIcon/>
          </router-link>
        </section>
        <SampleDivider/>

        <section class="recent-section">
          <div class="recent-section__labels">
            <h3>{{ $t('labels.search.recent') }}</h3>
            <router-link :to="`/${$i18n.locale}/search-article`">{{ $t('labels.search.see_all') }}</router-link>
          </div>
          <ul class="recent-list">
            <li class="recent-list__item">
              <div class="recent-list__item-left-block">
                <img src="@/assets/images/navbar/recent_1.png" alt=""/>
                <div>
                  <p>Мухаммад Мухаммадов</p>
                  <span>Istanbul, 24 года</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
            <li class="recent-list__item">
              <div class="recent-list__item-left-block">
                <img src="@/assets/images/navbar/recent_2.png" alt=""/>
                <div>
                  <p>Архитектура и дизайн</p>
                  <span>15896 подписчиков</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
            <li class="recent-list__item">
              <div class="recent-list__item-left-block">
                <img src="@/assets/images/navbar/recent_3.png" alt=""/>
                <div>
                  <p>Айжан Тумухамбетова</p>
                  <span>Мадрид, 28 лет</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
          </ul>
        </section>
        <SampleDivider/>

        <section class="people-section">
          <div class="people-section__labels">
            <h3>{{ $t('labels.search.people') }}</h3>
            <router-link :to="`/${$i18n.locale}/search-people`">{{ $t('labels.search.see_all') }}</router-link>
          </div>
          <ul class="people-list">
            <li class="people-list__item">
              <div class="people-list__item-left-block">
                <img src="@/assets/images/navbar/people_1.png" alt=""/>
                <div>
                  <p>Мухаммад Мухаммадов</p>
                  <span>Istanbul, 24 года</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
            <li class="people-list__item">
              <div class="people-list__item-left-block">
                <img src="@/assets/images/navbar/people_2.png" alt=""/>
                <div>
                  <p>Магомед Оздоев</p>
                  <span>Грузия, 27 лет</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
            <li class="people-list__item">
              <div class="people-list__item-left-block">
                <img src="@/assets/images/navbar/people_3.png" alt=""/>
                <div>
                  <p>Айжан Тумухамбетова</p>
                  <span>Мадрид, 28 лет</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
          </ul>
        </section>
        <SampleDivider/>

        <section class="groups-section">
          <div class="groups-section__labels">
            <h3>{{ $t('tabs.search.groups') }}</h3>
            <router-link :to="`/${$i18n.locale}/search-groups`">{{ $t('labels.search.see_all') }}</router-link>
          </div>
          <ul class="groups-list">
            <li class="groups-list__item">
              <div class="groups-list__item-left-block">
                <img src="@/assets/images/navbar/people_1.png" alt=""/>
                <div>
                  <p>Мухаммад Мухаммадов</p>
                  <span>Istanbul, 24 года</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
            <li class="groups-list__item">
              <div class="groups-list__item-left-block">
                <img src="@/assets/images/navbar/people_2.png" alt=""/>
                <div>
                  <p>Магомед Оздоев</p>
                  <span>Грузия, 27 лет</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
            <li class="groups-list__item">
              <div class="groups-list__item-left-block">
                <img src="@/assets/images/navbar/people_3.png" alt=""/>
                <div>
                  <p>Айжан Тумухамбетова</p>
                  <span>Мадрид, 28 лет</span>
                </div>
              </div>
              <SampleButton class="subscribe-button" :title="`${$t('buttons.subscribe')}`"/>
            </li>
          </ul>
        </section>
        <SampleDivider/>

        <section class="advanced-search__section">
          <router-link to="/search-all-recommendations">
            <div class="advanced-search__section-left">
              <LoupeInputIcon/>
              <span>{{ $t('labels.search.advanced_search') }}</span>
            </div>
            <ArrowLeftIcon/>
          </router-link>
        </section>
      </div>
    </div>
  </header>
  <teleport to="body">
    <NotificationContainer
        v-if="isNotificationOpen"
        @closeHandler="isNotificationOpen = false"
        :modal="true"
    />
  </teleport>
</template>

<script>
import SearchInput from '@/components/ui/SearchInput.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import MainPageLogo from '@/components/ui/Logo/MainPageLogo.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import MusicIcon from '@/components/icons/MusicIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import SettingIcon from '@/components/icons/SettingIcon.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import LoupeIcon from '@/components/icons/navbar/small-display/LoupeIcon.vue'
import LoupeInputIcon from '@/components/icons/LoupeIcon.vue'
import NewsIcon from '@/components/icons/navbar/small-display/NewsIcon.vue'
import MessagesIcon from '@/components/icons/navbar/small-display/MessagesIcon.vue'
import SmallMenuIcon from '@/components/icons/navbar/small-display/MenuIcon.vue'
import MyPageIcon from '@/components/icons/navbar/small-display/MyPageIcon.vue'
import SmallLogo from '@/components/ui/Logo/SmallPageLogo.vue'
import BellIcon from '@/components/icons/navbar/small-display/BellIcon.vue'
import ArrowLeftIcon from '@/components/icons/navbar/small-display/ArrowIcon.vue'
import SearchTab from '@/components/ui/SearchTab.vue'
import TabAll from '@/components/layouts/SearchComponents/TabAll.vue'
import TabPeople from '@/components/layouts/SearchComponents/TabPeople.vue'
import TabCommunities from '@/components/layouts/SearchComponents/TabCommunities.vue'
import TabMUVI from '@/components/layouts/SearchComponents/TabMUVI.vue'
import TabArticle from '@/components/layouts/SearchComponents/TabArticle.vue'
import TabVideo from '@/components/layouts/SearchComponents/TabVideo.vue'
import TabAudio from '@/components/layouts/SearchComponents/TabAudio.vue'
import TabHashtags from '@/components/layouts/SearchComponents/TabHashtags.vue'
import {mapState, mapMutations} from 'vuex'
import {audios} from '@/dummy'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import NotificationContainer from '@/components/notification/NotificationContainer.vue'
import MuviNavIcon from '@/components/icons/shorts/MuviNavIcon.vue'
import {getFormData} from '@/utils'
import axios from 'axios'
import CopyWalletIcon from '@/components/icons/profile/CopyWalletIcon.vue'
import WalletSmallIcon from '@/components/icons/profile/WalletSmallIcon.vue'
import WalletBgIcon from '@/components/icons/profile/WalletBgIcon.vue'

export default {
  emits: ['toggle-sidebar'],
  components: {
    WalletBgIcon,
    WalletSmallIcon,
    CopyWalletIcon,
    MuviNavIcon,
    SampleDivider,
    TabVideo,
    TabAudio,
    TabHashtags,
    TabArticle,
    TabMUVI,
    TabCommunities,
    TabPeople,
    TabAll,
    SearchTab,
    ArrowLeftIcon,
    BellIcon,
    SmallLogo,
    MenuIcon,
    MyPageIcon,
    MessagesIcon,
    NewsIcon,
    LoupeIcon,
    LoupeInputIcon,
    ArrowIcon,
    SettingIcon,
    NotificationIcon,
    EmailIcon,
    MusicIcon,
    SmallMenuIcon,
    SearchInput,
    SampleButton,
    MainPageLogo,
    NotificationContainer
  },
  data() {
    return {
      isMenuOpen: false,
      isSearchForm: false,
      isNotificationOpen: false,
      tabData: [
        {
          label: this.$t('tabs.search.all'),
          content: 'Content for Tab 1'
        },
        {
          label: this.$t('tabs.search.people'),
          content: 'Content for Tab 2'
        },
        {
          label: this.$t('tabs.search.communities'),
          content: 'Content for Tab 3'
        },
        {
          label: this.$t('tabs.search.muvi'),
          content: 'Content for Tab 4'
        },
        {
          label: this.$t('tabs.search.article'),
          content: 'Content for Tab 5'
        },
        {
          label: this.$t('tabs.search.video'),
          content: 'Content for Tab 6'
        },
        {
          label: this.$t('tabs.search.audio'),
          content: 'Content for Tab 7'
        },
        {
          label: this.$t('tabs.search.hashtags'),
          content: 'Content for Tab 8'
        }
      ],
      dummyAudios: audios,
      isSearchInputOpen: false,
      userId: localStorage.getItem('user_id'),
      user: JSON.parse(localStorage.getItem('user')) || {},
      isProfileOpen: false
    }
  },
  computed: {
    ...mapState('audio', ['audios', 'isPlayerOpen'])
  },
  methods: {
    ...mapMutations('audio', ['setIsPlayerOpen', 'setAudios', 'setIndex']),
    ...mapMutations(['setPlayerMargin']),
    toggleSidebar() {
      this.$emit('toggle-sidebar')
    },
    isSearchFormOpen() {
      this.isSearchForm = true
      this.isSearchInputOpen = true
    },
    isSearchFormClose() {
      this.isSearchForm = false
    },
    playerClickHandler() {
      if (this.audios.length === 0) {
        this.setIndex(0)
        this.setAudios(this.dummyAudios)
      }
      if (!this.isPlayerOpen) {
        this.audios = this.audios.forEach((a) => (a.isPlaying = false))
        this.setAudios(this.audios)
      } else {
        this.setPlayerMargin(0)
      }
      this.setIsPlayerOpen(!this.isPlayerOpen)
    },
    async getUser() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        user_id: this.userId
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        const response = await axios.post('/get-user-data', payload, {params, headers})
        if (response.data.api_status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data?.data))
        } else {
          this.$router.push({name: 'LoginByEmailView'})
        }
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY
      })

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      const headers = {'Content-Type': 'multipart/form-data'}

      try {
        const response = await axios.post('/delete-access-token', payload, {params, headers})
        if (response.data.api_status === 200) {
          localStorage.removeItem('access_token')
          this.$router.push({name: 'LoginByEmailView'})
        }
      } catch (error) {
        console.error(error)
      }
    },
    toggleProfile() {
      this.isProfileOpen = !this.isProfileOpen
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>
<style lang="scss">
.modal-profile {
  width: 260px;
  position: absolute;
  top: 70px;
  right: 45px;
  padding: 4px;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  background-color: var(--color-white);

  .menu-list {
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      padding: 12px;
      line-height: 1;

      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .user-name {
          font-weight: 600;
        }
      }

      a {
        text-decoration: none;
        color: var(--color-mine-shaft);
        font-size: 16px;
      }

      .logout-button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        font-size: 16px;
        cursor: pointer;
        color: var(--color-valencia);
      }
    }
  }

  .profile-wallet {
    position: relative;
    display: flex;
    flex-direction: column;
    background: linear-gradient(84deg, #0085A5 24.97%, #00A9CF 92.15%);
    border-radius: 10px;
    color: var(--color-white);
    padding: 12px;
    row-gap: 12px;
    line-height: 1;

    &__first-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    &__second-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      cursor: pointer;
    }

    &__third-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      gap: 5px;
    }

    .bg-wallet {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.bounce-enter-active {
  animation: scale-up-top-right 0.2s;
}

.bounce-leave-active {
  animation: scale-up-top-right 0.2s reverse;
}

@keyframes scale-up-top-right {
  0% {
    transform: scale(0.5);
    transform-origin: top right;
  }
  100% {
    transform: scale(1);
    transform-origin: top right;
  }
}

.navbar-header {
  position: relative;
}

.search-outside__block {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 700px;
  z-index: 200;

  .search-inside__block {
    width: 700px;
    background-color: var(--color-white);
    fill: var(--color-white);
    filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
    border-radius: 10px;
    height: 100%;
    padding: 24px;

    .recent-section,
    .people-section,
    .groups-section {
      display: flex;
      flex-direction: column;
      gap: 20px;

      &__labels {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          line-height: 1;
          margin: 0;
          font-size: 18px;
          font-weight: 500;
        }

        a {
          text-decoration: none;
          color: var(--color-hippie-blue);
        }
      }
    }
  }
}

.recent-list,
.people-list,
.groups-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left-block {
      display: flex;
      align-items: center;
      gap: 12px;

      p {
        margin: 0;
      }
    }
  }
}

.subscribe-button {
  padding: 10px 24px;
}

.all-recommendation__block {
  cursor: pointer;
  margin-bottom: 16px;

  svg {
    all: unset;
    color: transparent;
    transform: rotate(-180deg);
    width: 22px;
    height: 22px;
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-mine-shaft);
    line-height: 1;
    font-size: 18px;
    font-weight: 400;
    text-decoration: none;
  }
}

.advanced-search__section {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    all: inherit;
    cursor: pointer;
    margin-top: 0;
  }

  svg {
    all: unset;
    transform: rotate(-180deg);
    color: var(--color-secondary);
    width: 22px;
    height: 22px;
  }

  &-left {
    display: flex;
    align-items: center;
    gap: 12px;

    span {
      font-size: 18px;
      color: var(--color-secondary);
      line-height: 1;
    }

    svg {
      width: 18px;
      height: 18px;
      transform: rotate(0);
      color: var(--color-secondary);
    }
  }
}

.base__search--input {
  border-radius: 10px;
  background-color: var(--color-seashell);
  color: var(--color-mine-shaft);
  border: none;
  outline: none;
  font-size: 16px;
  padding: 12px 12px 12px 48px;

  &::placeholder {
    color: var(--color-silver-chalice);
  }
}

.main__search--block {
  position: relative;
  display: flex;
  align-items: center;

  .search__icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    display: flex;
  }
}

.bottom__nav--item {
  a {
    display: flex;
    align-items: center;
  }
}

.small-nav {
  display: none;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  height: 80px;
  top: 0;
  width: 100%;
  transform: translateY(0);
  transition: transform 0.3s ease;
  background-color: var(--color-white);
  z-index: 100;
}

.right__nav--side,
.left__nav--side {
  display: flex;
  align-items: center;
}

.right__nav--side {
  gap: 20px;
  padding-left: 20px;
}

.main__nav--side {
  display: flex;
  gap: 50px;
}

.navbar__right--buttons {
  display: flex;
  align-items: center;
  padding: 0;

  .router-link-active .settings__button {
    background-color: var(--color-hippie-blue);
    transition: all 0.15s ease-in-out;

    svg {
      color: var(--color-white);
    }
  }

  .music__button,
  .email__button,
  .notification__button,
  .settings__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-seashell);
    border-radius: 50px;
    width: 40px;
    height: 40px;
    margin: 0 6px;

    &.active,
    &:hover {
      background-color: var(--color-hippie-blue);
      transition: all 0.15s ease-in-out;

      svg {
        color: var(--color-white);
      }
    }

    svg {
      color: var(--color-hippie-blue);
      transition: all 0.15s ease-in-out;
    }
  }
}

.menu__button,
.music__button,
.email__button,
.notification__button,
.settings__button {
  display: flex;
  border: none;
  outline: none;
  cursor: pointer;
}

.menu__button {
  background-color: var(--color-white);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  &:hover {
    transition: all 0.15s ease-in-out;
    background-color: var(--color-seashell);
  }
}

.main__logo {
  min-width: 151px;
}

.create__button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  width: 159px;
  max-height: 40px;
}

.user__menu--block {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 65px;
  margin-right: 45px;
}

.profile__image {
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  width: 48px;
  height: 48px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  &:hover {
    img {
      transition: all 0.15s ease-in-out;
      opacity: 0.5;
    }

    opacity: 1;
    background-color: var(--color-white);
  }
}

.dropdown__icon {
  position: absolute;
  bottom: 0;
  right: 0;
}

.top__nav--right-item {
  display: flex;
  gap: 20px;

  div {
    display: flex;
  }

  svg {
    color: var(--color-hippie-blue);
  }
}

.top__nav--left-item {
  .close-search__form {
    all: unset;
    color: transparent;
    display: flex;
  }
}

@media (max-width: 576px) {
  .top__nav--search-item {
    width: 100%;
  }
  .base__search--input {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .top__nav--list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    position: fixed;
    top: 0;
    height: 64px;
    width: 100%;
    list-style: none;
    padding: 0 16px;
    background-color: var(--color-white);
    box-shadow: 0 2px 3px rgba(141, 152, 180, 0.3);
    margin: 0;
    z-index: 50;
  }
  .bottom__nav--list {
    box-shadow: 0 -2px 3px rgba(141, 152, 180, 0.3);
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    height: 64px;
    width: 100%;
    list-style: none;
    padding: 0 32px;
    background-color: var(--color-white);
    margin: 0;
    z-index: 5;
  }
  .bottom__nav--item {
    display: flex;
  }
  .small-nav {
    display: flex;
  }
  .navbar {
    display: none;
  }
  .user__menu--block {
    margin-right: 24px;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .small-nav {
    display: none;
  }
  .navbar {
    display: flex;
  }
  .user__menu--block {
    margin-right: 45px;
    margin-left: 64px;
  }
}
</style>

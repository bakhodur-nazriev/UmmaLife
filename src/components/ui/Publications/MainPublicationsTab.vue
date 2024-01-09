<template>
  <div class="tabs">
    <div class="tabs-bg" ref="publicationBackground"></div>
    <div class="tabs-header" ref="publicationTabsHeader">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs-header__item', { 'active': activeTab === index }]"
        @click="changeTab(index)"
      >
        <span class="tabs-header__title">{{ tab.title }}</span>
        <CheckMarkSmallIcon v-if="index === activeTab"/>
      </div>
    </div>
    <div
      class="tabs-content"
      v-for="(tab, i) in tabs"
      :key="i"
      v-show="activeTab === i"
      ref="tabsContent"
      @scroll="loadMoreData"
    >
      <template v-if="isLoading">
        <PulseLoader color="#49a399" size="12px" class="speener-block"/>
      </template>
      <template v-else>
        <PublicationTab v-if="i === 0" :posts="posts"/>
        <ArticleTab v-if="i === 1" :articles="articles"/>
        <PhotoTab v-if="i === 2" :photos="photos"/>
        <VideoTab v-if="i === 3" :video="video"/>
        <AudioTab v-if="i === 4" :audio="audio"/>
      </template>
    </div>
  </div>
</template>

<script>
import PublicationTab from '@/components/ui/Publications/PublicationTab.vue'
import ArticleTab from '@/components/ui/Publications/ArticleTab.vue'
import PhotoTab from '@/components/ui/Publications/PhotoTab.vue'
import VideoTab from '@/components/ui/Publications/VideoTab.vue'
import AudioTab from '@/components/ui/Publications/AudioTab.vue'
import CheckMarkSmallIcon from '@/components/icons/CheckMarkSmallIcon.vue'
import {getFormData} from '@/utils'
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    CheckMarkSmallIcon,
    PublicationTab,
    AudioTab,
    VideoTab,
    PhotoTab,
    ArticleTab,
    PulseLoader
  },
  props: {
    tabsArray: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tabMethods: {
        0: 'getPublications',
        1: 'getArticles',
        2: 'getPhoto',
        3: 'getVideo',
        4: 'getAudio'
      },
      activeTab: 0,
      tabs: [],
      tabIndex: 0,
      isMenuOpen: false,
      posts: [],
      articles: [],
      photos: [],
      video: [],
      audio: [],
      isLoading: true,
      page: 1,
      loadingMore: false
    }
  },
  methods: {
    changeTab(index) {
      this.$store.commit('setPublicationTabs', this.tabs[index].title)
      this.activeTab = index;
      const methodName = this.tabMethods[index];
      if (methodName && typeof this[methodName] === 'function') {
        this[methodName]();
      }
      sessionStorage.setItem('activePublicationTab', index.toString())
    },
    async getPublications() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        page: this.page
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        this.isLoading = true;
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.isLoading = false;
          this.posts = response.data?.data
        } else {
          console.log('error')
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getArticles() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        post_type: 'text',
        page: 1
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        this.isLoading = true;
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.isLoading = false
          this.articles = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getPhoto() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        post_type: 'photos',
        page: 1
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        this.isLoading = true
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.isLoading = false
          this.photos = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getVideo() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        post_type: 'video',
        page: 1
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        this.isLoading = true;
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.isLoading = false;
          this.video = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getAudio() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        post_type: 'music',
        page: 1
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        this.isLoading = true;
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.isLoading = false;
          this.audio = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  computed: {
    shouldChangeTabStyle() {
      return this.$store.getters.shouldChangeTabStyle
    }
  },
  watch: {
    shouldChangeTabStyle(newValue) {
      const tabsHeader = this.$refs.publicationTabsHeader
      const tabBackground = this.$refs.publicationBackground

      if (newValue) {
        tabsHeader.style.display = 'flex'
        tabBackground.style.display = 'flex'
      } else {
        tabsHeader.style.display = 'none'
        tabBackground.style.display = 'none'
      }
    }
  },
  mounted() {
    const savedTab = sessionStorage.getItem('activePublicationTab')
    if (savedTab) {
      this.activeTab = parseInt(savedTab)
    }
    this.tabs = this.tabsArray.map((title) => ({
      title
    }))

    if (savedTab) {
      this.activeTab = parseInt(savedTab);
      const methodName = this.tabMethods[this.activeTab];
      if (methodName && typeof this[methodName] === 'function') {
        this[methodName]();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.speener-block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.tabs {
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background-color: var(--color-white);
    border-radius: 15px;
    overflow: hidden;
    padding: 0 32px;

    &__title {
      &:hover {
        color: var(--color-mine-shaft);
        transition: all .15s ease-in-out;
      }
    }

    &__item {
      display: flex;
      cursor: pointer;
      padding: 16px 0;
      color: var(--color-silver-chalice);
      font-weight: 500;
      font-size: 16px;
      user-select: none;

      &.active {
        position: relative;
        color: var(--color-mine-shaft);
        padding-bottom: 16px;
        font-weight: 600;
        z-index: 5;

        svg {
          display: none;
        }

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: var(--color-deep-cerulean);
          border-radius: 2px 2px 0 0;
        }
      }
    }

    &__label-title {
      color: var(--color-silver-chalice);
      font-weight: 500;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 576px) {
  .tabs {
    position: relative;

    &-bg {
      display: none;
      content: "";
      background: rgba(0, 0, 0, .4);
      position: fixed;
      height: 100vh;
      width: 100%;
      pointer-events: none;
      z-index: 9;
    }

    &-header {
      display: none;
      z-index: 20;
      position: fixed;
      top: 124px;
      flex-direction: column;
      width: 100%;
      border-radius: 0;
      gap: 10px;
      padding: 20px 32px;

      &__title {
        font-weight: 400;
      }

      &__item {
        width: 100%;
        padding: 0;
        font-weight: 400;
        color: var(--color-mine-shaft);

        &.active {
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-hippie-blue);

          svg {
            display: block;
          }

          &::after {
            display: none;
          }
        }
      }
    }

    &-content {
      position: relative;
      top: 59px;
    }
  }
}

@media (min-width: 768px) {
}

@media (min-width: 1280px) {
}
</style>

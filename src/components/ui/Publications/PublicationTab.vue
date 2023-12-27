<template>
  <article class="post__block" v-for="(item, i) in posts" :key="i">
    <PostHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
      :publisher="item.publisher"
      :time="item.date_create"
      @translate-request="handleTranslation(item)"
      @show-orignal="item.publisher"
      :translated="translated[item.publisher.id]"
    />

    <PublicationContent
      :post-content="item.Orginaltext"
      :reactions="item.reaction"
    />

    <SampleDivider class="divider"/>

    <PostFooter
      :postsItem="item"
      :is-reaction-window-open="isReactionWindowOpen"
      :is-share-window-open="isShareWindowOpen"
      :reactions="item.reaction"
    />
  </article>
</template>

<script>
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PublicationContent from '@/components/ui/Publications/Publication/PublicationContent.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import {getFormData} from '@/utils'
import axios from 'axios'
import { reactive } from 'vue'

export default {
  components: {
    PostFooter,
    PostHeader,
    PublicationContent,
    SampleDivider
  },
  props: {
    posts: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false,
      postContent: null,
      translated: {}
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    async translatePost(text) {
      return await this.fetchTranslation(text);
    },
    async fetchTranslation(text) {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        text: text
      })

      const headers = {'Content-Type': 'multipart/form-data'}
      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        const response = await axios.post('/translate', payload, {params, headers})
        if (response.data.api_status === 200) {
          return response.data?.data
        }
      } catch (error) {
        console.error(error)
      }
    },
    async handleTranslation(item) {
      item.Orginaltext = await this.translatePost(item.Orginaltext);
      this.$set(this.translated, item.publisher.id, !!item.Orginaltext);
    }
  }
}
</script>

<style scoped lang="scss">
.profile__news.post__block {
  border: 1px solid var(--color-seashell);
}

.post__block {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 10px;
  border-radius: 15px;
  row-gap: 8px;
  background-color: var(--color-white);
}

.divider {
  margin: 2px;
}
</style>

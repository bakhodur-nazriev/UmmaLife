<template>
  <article class="post__block" v-for="(item, i) in posts" :key="i">
    <PostHeader
      :is-menu-open="isMenuOpen"
      @toggle-menu="toggleMenu"
      :publisher="item.publisher"
      :time="item.post_time"
    />

    <PublicationContent
      :post-content="item.Orginaltext"
      :reactions="item.reaction"
    />

    <SampleDivider class="divider"/>

    <PostFooter
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

export default {
  components: {
    PostFooter,
    PostHeader,
    PublicationContent,
    SampleDivider
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false,
      postContent: null,
      posts: []
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    async getPost() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        page: 1
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.posts = response.data?.data
        } else {
          console.log('error')
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getPost()
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

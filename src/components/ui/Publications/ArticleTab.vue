<template>
  <div class="article-block">
    <article class="article-block__article" v-for="(item, i) in articles" :key="i">
      <PostHeader
          :is-menu-open="isMenuOpen"
          @toggle-menu="toggleMenu"
          :publisher="item.publisher"
          :time="item.date_create"
      />

      <ArticleContent
          :post-content="item"
      />

      <SampleDivider class="divider"/>

      <PostFooter
          :is-reaction-window-open="isReactionWindowOpen"
          :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import SampleDivider from '@/components/ui/SampleDivider.vue'
import ArticleContent from '@/components/ui/Publications/Article/ArticleContent.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import {getFormData} from '@/utils'
import axios from 'axios'

export default {
  components: {
    PostFooter,
    PostHeader,
    ArticleContent,
    SampleDivider
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false,
      articles: []
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
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
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.articles = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
  mounted() {
    this.getArticles()
  }
}
</script>

<style scoped lang="scss">
.article-block {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__article {
    display: flex;
    flex-direction: column;
    padding: 24px 24px 10px;
    border-radius: 15px;
    row-gap: 8px;
    background-color: var(--color-white);
  }
}

.divider {
  margin: 2px;
}

@media (max-width: 576px) {
  .article-block__article {
    border-radius: 0;
    padding: 10px 16px;
  }
}
</style>

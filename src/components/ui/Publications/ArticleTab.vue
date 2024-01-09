<template>
  <div class="article-block">
    <article
      class="article-block__article"
      v-for="(item, i) in articles"
      :key="i"
    >
      <PostHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
        :publisher="item.publisher"
        :time="item.date_create"
        @translate-request="handleTranslation(item)"
        :post-id="item.post_id"
      />

      <ArticleContent
        :post-content="item"
        :article-reactions="item.reaction"
      />

      <SampleDivider class="divider"/>

      <PostFooter
        :posts-item="item"
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
import {getFormData} from "@/utils";
import axios from "axios";

export default {
  components: {
    PostFooter,
    PostHeader,
    ArticleContent,
    SampleDivider
  },
  props: {
    articles: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false,
      // articles: []
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
    }
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

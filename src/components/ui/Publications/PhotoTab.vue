<template>
  <div class="photo-block">
    <article class="photo-block__article" v-for="(item, i) in photos" :key="i">
      <PostHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
        :publisher="item.publisher"
        :time="item.date_create"
        @translate-request="handleTranslation(item)"
        :post-id="item.post_id"
      />

      <PhotoContent :photo-content="item" :photo-reactions="item.reaction" />

      <SampleDivider class="divider" />

      <PostFooter
        :posts-item="item"
        :is-reaction-window-open="isReactionWindowOpen"
        :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import PhotoContent from '@/components/ui/Publications/Photo/PhotoContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import { getFormData } from '@/utils'
import axios from 'axios'

export default {
  components: {
    PostHeader,
    PostFooter,
    SampleDivider,
    PhotoContent
  },
  props: {
    photos: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    async translatePost(text) {
      return await this.fetchTranslation(text)
    },
    async fetchTranslation(text) {
      const payload = getFormData({
        server_key: import.meta.env.VITE_SERVER_KEY,
        text: text
      })

      const headers = { 'Content-Type': 'multipart/form-data' }
      const accessToken = localStorage.getItem('access_token')
      const params = { access_token: accessToken }

      try {
        const response = await axios.post('/translate', payload, { params, headers })
        if (response.data.api_status === 200) {
          return response.data?.data
        }
      } catch (error) {
        console.error(error)
      }
    },
    async handleTranslation(item) {
      item.Orginaltext = await this.translatePost(item.Orginaltext)
    }
  }
}
</script>

<style scoped lang="scss">
.photo-block {
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
  .photo-block__article {
    border-radius: 0;
  }
}
</style>

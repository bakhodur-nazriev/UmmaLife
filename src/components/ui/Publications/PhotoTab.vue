<template>
  <div class="photo-block">
    <article class="photo-block__article" v-for="(item, i) in photos" :key="i">
      <PostHeader
          :is-menu-open="isMenuOpen"
          @toggle-menu="toggleMenu"
          :publisher="item.publisher"
          :time="item.date_create"
      />

      <PhotoContent :photo-content="item"/>

      <SampleDivider class="divider"/>

      <PostFooter
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
import {getFormData} from "@/utils";
import axios from "axios";

export default {
  components: {
    PostHeader,
    PostFooter,
    SampleDivider,
    PhotoContent
  },
  data() {
    return {
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      isMenuOpen: false,
      photos: []
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    async getPhotos() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        post_type: 'photos',
        page: 1
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.photos = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getPhotos()
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

<template>
  <div class="video-block">
    <article
        class="video-block__article"
        v-for="(item, i) in video"
        :key="i"
    >
      <PostHeader
          :is-menu-open="isMenuOpen"
          @toggle-menu="toggleMenu"
          :publisher="item.publisher"
          :time="item.date_create"
      />

      <VideoContent :video-content="item"/>

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
import VideoContent from '@/components/ui/Publications/Video/VideoContent.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import {getFormData} from '@/utils'
import axios from 'axios'

export default {
  components: {
    PostFooter,
    PostHeader,
    VideoContent,
    SampleDivider
  },
  data() {
    return {
      isMenuOpen: false,
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      video: []
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
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
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          this.video = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getVideo()
  }
}
</script>

<style scoped lang="scss">
.video-author__section {
  display: flex;
  flex-direction: column;
}

.video-block {
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

.description__video--section {
  display: flex;
  flex-direction: column;
  row-gap: 6px;

  .video__title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.2;
  }
}

.video__main--section {
  position: relative;
  display: flex;

  .video__image {
    width: 100%;
  }

  .menu__detail--button {
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    padding: 2px;
    border: none;
    background-color: rgba(0, 0, 0, 0.2)
  }

  .video__time {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: var(--color-white);
    padding: 4px 6px;
    background-color: var(--color-mine-shaft);
    backdrop-filter: blur(20px);
    border-radius: 5px;
    font-size: 12px;
  }
}

.video__date--section {
  color: var(--color-gray);
}

.author__video--section {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--color-gray);
}

.divider {
  margin: 2px;
}

@media (max-width: 576px) {
  .video-block__article {
    padding: 24px 16px;
    border-radius: 0;
  }
}
</style>

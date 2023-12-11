<template>
  <div class="audio-block">
    <article
        class="audio-block__article"
        v-for="(item, i) in audio"
        :key="i"
    >
      <PostHeader
          :is-menu-open="isMenuOpen"
          @toggle-menu="toggleMenu"
          :publisher="item.publisher"
          :time="item.post_time"
      />

      <AudioContent :audio-content="item"/>

      <SampleDivider class="divider"/>

      <PostFooter
          :is-reaction-window-open="isReactionWindowOpen"
          :is-share-window-open="isShareWindowOpen"
      />
    </article>
  </div>
</template>

<script>
import AudioContent from '@/components/ui/Publications/Audio/AudioContent.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import PostHeader from '@/components/ui/Post/PostHeader.vue'
import PostFooter from '@/components/ui/Post/PostFooter.vue'
import {getFormData} from '@/utils'
import axios from 'axios'

export default {
  components: {
    PostFooter,
    PostHeader,
    SampleDivider,
    AudioContent
  },
  data() {
    return {
      isMenuOpen: false,
      isReactionWindowOpen: false,
      isShareWindowOpen: false,
      audio: []
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
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
        const response = await axios.post('/posts', payload, {params, headers})
        if (response.data.api_status === 200) {
          console.log(response.data?.data)
          this.audio = response.data?.data
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getAudio()
  }
}
</script>

<style scoped lang="scss">
.audio-block {
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
  .audio-block__article {
    border-radius: 0;
  }
}
</style>

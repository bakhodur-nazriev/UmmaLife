<template>
  <section class="audio-content__section">
    <div class="audio-content__section-item">
      <div class="audio-content__left-side">
        <div class="play-button">
          <SmallVideoPlayIcon/>
          <!--          <audio controls>-->
          <!--            <source :src="audioContent.postFileArray[0].filename" type="">-->
          <!--          </audio>-->
        </div>
        <div class="audio-content__right-side">
          <p class="audio-title" v-if="audioContent.Orginaltext">{{ audioContent.Orginaltext }}</p>
          <h3 class="author-name">{{ audioContent.postFileArray[0].name }}</h3>
        </div>
      </div>

      <div class="audio-content__audio-time">
        <span>{{ audioFormattedDuration }}</span>
      </div>
    </div>

    <div class="audio-content__reactions">
      <PostReactions :reaction="audioContent.reaction"/>
    </div>
  </section>
</template>
<script>
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import PostReactions from '@/components/ui/Post/PostReactions.vue'
import {getFormData} from '@/utils'
import axios from 'axios'

export default {
  components: {
    PostReactions,
    SmallVideoPlayIcon
  },
  props: ['audioContent'],
  computed: {
    audioFormattedDuration() {
      const duration = this.audioContent.postFileArray[0].duration

      if (!duration || duration === "") {
        return ""
      }

      const timeArray = duration.split("T")[1].split(":")
      const hours = parseInt(timeArray[0])
      const minutes = parseInt(timeArray[1])
      const seconds = parseInt(timeArray[2])

      let formattedDuration = ""

      if (hours > 0) {
        formattedDuration += hours.toString().padStart(2, "0") + ":"
      }

      formattedDuration += minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")

      return formattedDuration
    }
  },
  methods: {
    async toggleReactions() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        post_id: '',
        action: 'reaction',
        reaction: 1
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      const accessToken = localStorage.getItem('access_token')
      const params = {access_token: accessToken}

      try {
        const response = await axios.post('/post-actions', payload, {params, headers})
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    // console.log(this.audioContent)
  }
}
</script>

<style scoped lang="scss">
.audio-content {
  &__reactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;

      .play-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: var(--color-hippie-blue);
        min-width: 40px;
        height: 40px;
      }
    }
  }

  &__audio-time {
    color: var(--color-silver-chalice);
  }

  &__left-side {
    display: flex;
    align-items: center;
    gap: 12px;

    .audio-title,
    .author-name {
      margin: 0;
      line-height: 1;
    }
  }

  &__right-side {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 400px;
    position: relative;

    &::after {
      content: "...";
      position: absolute;
      right: -15px;
      bottom: 0;
      line-height: 1;
    }

    .audio-title {
      font-size: 16px;
      color: var(--color-mine-shaft);
    }

    .author-name {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-mine-shaft);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}

@media (max-width: 576px) {
  .audio-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .audio-content__audio-time {
    span {
      font-size: 14px;
    }
  }

  .audio-content__right-side {
    .author-name {
      font-size: 14px;
    }
  }
}
</style>

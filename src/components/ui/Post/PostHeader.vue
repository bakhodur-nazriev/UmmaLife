<template>
  <header class="post__header">
    <router-link
      v-if="author"
      class="post__author"
      to="#"
    >
      <img
        width="56"
        height="56"
        :src="author.avatar"
        :alt="author.name"
      />
      <div class="author-info">
        <span class="author-info__name">{{ author.name }}</span>
        <span class="author-info__time">{{ formattedDate }}</span>
      </div>
    </router-link>
    <div class="menu__button">
      <SampleMenuDetailsButton
        :is-menu-open="isMenuOpen"
        @toggle-menu="$emit('toggle-menu')"
      />
    </div>
  </header>
</template>
<script>
import SampleMenuDetailsButton from '@/components/ui/MenuDetails/SampleMenuDetailsButton.vue'

export default {
  components: {
    SampleMenuDetailsButton
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      timestamp: this.time,
      formattedDate: '',
      timeAgo: ''
    }
  },
  mounted() {
    if (this.time && this.author && this.author.name) {
      this.convertTimestamp()
      this.calculateTimeAgo()
    }
  },
  methods: {
    convertTimestamp() {
      const date = new Date(this.timestamp * 1000)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      this.formattedDate = `${year}-${month}-${day}`
    },
    calculateTimeAgo() {
      const currentTime = Math.floor(Date.now() / 1000);
      const difference = currentTime - this.timestamp;

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
      };

      let timeAgo = ''

      for (const interval in intervals) {
        const value = Math.floor(difference / intervals[interval]);
        if (value > 0) {
          timeAgo += `${value} ${interval}${value > 1 ? 's' : ''} ago`
          break
        }
      }

      if (timeAgo === '') {
        timeAgo = 'Just now'
      }

      this.timeAgo = timeAgo
    }
  }
}
</script>

<style scoped lang="scss">
.post__author {
  display: flex;
  text-decoration: none;

  img {
    border-radius: 50%;
    margin-right: 8px;
  }
}

.post__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 8px 0;
}

.menu__button {
  cursor: pointer;
  height: 20px;
  width: 35px;
  border-radius: 20px;

  svg {
    color: var(--color-silver-chalice);
  }
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__time {
    color: var(--color-silver-chalice);
    font-size: 14px;
  }

  &__name {
    color: var(--color-mine-shaft);
    font-size: 18px;
  }
}

@media (max-width: 576px) {
  .post__author {
    img {
      width: 40px;
      height: 40px;
    }
  }

  .author-info {
    gap: 4px;

    &__name {
      line-height: 1;
      font-size: 16px;
      font-weight: 500;
    }

    &__time {
      line-height: 1;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <header class="post__header">
    <div class="post__header-left">
      <UserInfo
        :username="publisher.name"
        :avatar="publisher.avatar"
        :status="{
          is_investor: publisher?.isInvestor || false,
          verified: publisher?.verified || '0',
          is_premium: publisher?.is_premium || '0'
        }"
        size="large"
        :no-name="true"
        :id="publisher.username"
      />
      <div class="author-info">
        <span class="author-info__name">
          <router-link :to="publisher.username">
            {{ publisher.name }}
            <BageIcon v-if="publisher.verified === '1'"/>
          </router-link>
        </span>
        <div class="author-info__time-translate">
          <span class="author-info__time">{{ multiFormatDateString(time) }}</span>
          <button class="author-info__translate-button" @click="$emit('translateRequest')">
            <GlobeIcon/>
            {{ $t('buttons.translate') }}
          </button>
          <button
            v-if="translated"
            class="author-info__original-button"
            @click="showOriginalRequest"
          >
            <GlobeIcon/>
            {{ $t('buttons.show_original') }}
          </button>
        </div>
      </div>
    </div>
    <div class="menu__button">
      <PostsMenuDetailsButton
        :is-menu-open="isMenuOpen"
        :post-id="postId"
        @toggle-menu="toggleMenuHandler"
      />
    </div>
  </header>
</template>
<script>
import VerifyIcon from '@/components/icons/VerifyIcon.vue'
import PremiumIcon from '@/components/icons/PremiumIcon.vue'
import GlobeIcon from '@/components/icons/GlobeIcon.vue'
import UserInfo from '@/components/ui/UserInfo.vue'
import {timeFormat} from '@/mixins/timeFormat'
import {getFormData} from '@/utils'
import axios from 'axios'
import PostsMenuDetailsButton from "@/components/ui/MenuDetails/PostsMenuDetailsButton.vue";
import BageIcon from "@/components/icons/BageIcon.vue";

export default {
  mixins: [timeFormat],
  components: {
    BageIcon,
    PostsMenuDetailsButton,
    UserInfo,
    GlobeIcon,
    PremiumIcon,
    VerifyIcon
  },
  props: {
    publisher: {
      type: Object,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    translated: {
      type: Boolean,
      required: true
    },
    postId: {
      type: String
    }
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenuHandler() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    showOriginalRequest() {
      if (this.translated) {
        this.$emit('show-original', this.publisher);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.post__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 8px 0;

  &-left {
    display: flex;
    align-items: center;
    gap: 8px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
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
  color: var(--color-silver-chalice);
  font-size: 14px;

  &__name {
    color: var(--color-mine-shaft);
    font-size: 18px;
  }

  &__time-translate {
    display: flex;
    align-items: center;
    gap: 10px;

    .author-info__translate-button,
    .author-info__original-button {
      display: flex;
      align-items: center;
      background: none;
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      cursor: pointer;
      color: var(--color-silver-chalice);
      gap: 4px;
      transition: .2s all ease-in-out;

      &:hover {
        color: var(--color-deep-cerulean);
      }
    }
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

    &__time-and-translate {
      line-height: 1;
      font-size: 12px;
    }
  }
}
</style>

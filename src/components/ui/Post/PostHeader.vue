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
        </router-link>
      </span>
        <div class="author-info__time-translate">
          <span class="author-info__time">{{ multiFormatDateString(time) }}</span>
          <div class="author-info__translate">
            <GlobeIcon/>
            <button @click="$emit('translateRequest')">{{ $t('buttons.translate') }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="menu__button">
      <PostsMenuDetailsButton
          :is-menu-open="isMenuOpen"
          @toggle-menu="$emit('toggle-menu')"
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

export default {
  mixins: [timeFormat],
  components: {
    PostsMenuDetailsButton,
    UserInfo,
    GlobeIcon,
    PremiumIcon,
    VerifyIcon
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    },
    publisher: {
      type: Object,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
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

    .author-info__translate {
      display: flex;
      align-items: center;

      button {
        background: none;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        cursor: pointer;
        color: var(--color-silver-chalice);

        &:hover {
          color: var(--color-deep-cerulean);
        }
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

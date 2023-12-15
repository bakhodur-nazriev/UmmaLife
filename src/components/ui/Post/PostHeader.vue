<template>
  <header class="post__header">
    <router-link
        v-if="publisher"
        class="post__author"
        to="#"
    >
      <PremiumIcon :is_investor="publisher.is_premium"/>
      <div class="author-image__block">
        <img
            width="56"
            height="56"
            :src="publisher.avatar"
            :alt="publisher.name"
        />
      </div>

      <div class="author-info">
        <div class="author-info__inside">
          <span class="author-info__name">{{ publisher.name }}</span>
          <VerifyIcon v-if="verifiedUser"/>
        </div>
        <span class="author-info__time">{{ time }}</span>
        <button @click="translatePost">{{ $t('buttons.translate') }}</button>
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
import VerifyIcon from '@/components/icons/VerifyIcon.vue'
import PremiumIcon from '@/components/icons/PremiumIcon.vue'

export default {
  components: {
    PremiumIcon,
    VerifyIcon,
    SampleMenuDetailsButton
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
  methods: {
    translatePost() {

    }
  },
  computed: {
    verifiedUser() {
      return this.publisher && this.publisher.verified === "1";
    },
    premiumAccount() {
      return this.publisher && this.publisher.is_premium === "1";
    }
  }
}
</script>

<style scoped lang="scss">
.author-image__block {
  display: flex;
}

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

  &__inside {
    display: flex;
    align-items: center;
    gap: 4px;
  }

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

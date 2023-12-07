<template>
  <header class="post__header">
    <router-link
      v-if="publisher"
      class="post__author"
      to="#"
    >
      <img
        width="56"
        height="56"
        :src="publisher.avatar"
        :alt="publisher.name"
      />
      <div class="author-info">
        <span class="author-info__name">{{ publisher.name }}</span>
        <span class="author-info__time">{{ time }}</span>
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
  mounted() {},
  methods: {}
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

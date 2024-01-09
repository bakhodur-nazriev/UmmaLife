<template>
  <div class="publication-content">
    <p
      class="publication-content__paragraph"
      :class="{ 'show-all-content': isOpenReadMore }"
      ref="content"
    >
      {{ contentWithoutHashtags }}
    </p>
    <div v-if="hashtags.length > 0" class="hashtags">
      <a
        v-for="(tag, index) in hashtags"
        :key="index"
        :href="`hashtag/${tag.substring(1)}`"
        class="hashtag"
      >
        {{ tag }}
      </a>
    </div>
    <button
      v-if="isOverflown"
      class="read-more__button"
      type="button"
      @click="toggleReadMore"
    >
      {{ isOpenReadMore ? $t('buttons.read_less_post') : $t('buttons.read_more_post') }}
    </button>
    <div class="publication-content__reactions">
      <PostReactions :reactions="postReactions"/>
    </div>
  </div>
</template>

<script>
import PostReactions from '@/components/ui/Post/PostReactions.vue'

export default {
  components: {
    PostReactions
  },
  props: {
    postContent: {
      type: String
    },
    postReactions: {
      type: Object
    }
  },
  data: () => ({
    isOpenReadMore: false,
    isOverflown: false,
    hashtags: [],
    contentWithoutHashtags: ''
  }),
  methods: {
    toggleReadMore() {
      this.isOpenReadMore = !this.isOpenReadMore
    },
    checkOverflow() {
      const content = this.$refs.content;
      if (content) {
        this.isOverflown = content.scrollHeight > content.clientHeight;
      }
    },
    extractHashtags(text) {
      const regex = /#\w+/g;
      return text.match(regex) || [];
    }
  },
  mounted() {

    this.checkOverflow();
    window.addEventListener('resize', this.checkOverflow);

    if (this.postContent && typeof this.postContent === 'string') {
      this.hashtags = this.extractHashtags(this.postContent);

      if (this.hashtags && this.hashtags.length > 0) {
        this.contentWithoutHashtags = this.postContent.replace(/#\w+/g, '');
      } else {
        this.contentWithoutHashtags = this.postContent;
      }
    } else {
      this.contentWithoutHashtags = ''; // Если this.postContent не строка, задаем значение по умолчанию
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.checkOverflow);
  },
}
</script>

<style scoped lang="scss">
.hashtags {
  margin-top: 10px;

  .hashtag {
    text-decoration: none;
    color: var(--color-hippie-blue);
    margin-right: 8px;
  }
}

.read-more__button {
  background: none;
  color: var(--color-hippie-blue);
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 12px 0 0;
}

.publication-content {
  &__reactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0 0 0;
  }

  &__paragraph {
    margin: 0;
    color: var(--color-mine-shaft);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 15;
  }

  &__paragraph.show-all-content {
    -webkit-line-clamp: initial;
    max-height: none;
  }
}

@media (max-width: 576px) {
  .publication-content__paragraph {
    font-size: 14px;
  }
}

@media (min-width: 1280px) {
}

@media (min-width: 1920px) {
}
</style>

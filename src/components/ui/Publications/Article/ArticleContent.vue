<template>
  <section class="article-content__section">
    <div class="article-content__section-item">
      <div class="article-content__details-image">
        <img
            :src="postContent.blog.thumbnail"
            alt=""
            class="article-content__image"
        />
      </div>
      <div class="article-content__details-block">
        <h3 class="article-content__details-block-title">
          {{ postContent.blog.title }}
        </h3>
        <p class="article-content__details-block-paragraph">{{ postContent.blog.content }}</p>
        <span class="article-content__details-block-date">20.08.2022</span>
      </div>
    </div>

    <div class="article-content__reactions">
      <PostReactions/>
    </div>
  </section>
</template>

<script>
import PostReactions from '@/components/ui/Post/PostReactions.vue'

export default {
  props: ['postContent'],
  components: {
    PostReactions
  },
  data: () => ({}),
  mounted() {}
}
</script>

<style scoped lang="scss">
.article-content {
  &__details-block {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;

    &-title {
      color: var(--color-mine-shaft);
      font-size: 16px;
      margin-top: 0;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &-paragraph {
      color: var(--color-gray);
      font-size: 14px;
      margin: 0 0 5px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    &-date {
      color: var(--color-mine-shaft);
    }
  }

  &__details-image {
    display: flex;
    justify-content: center;

    .article-content__image {
      border-radius: 15px;
      height: 400px;
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-item {
      display: flex;
      flex-direction: column;
      background-color: var(--color-seashell);
      border-radius: 15px;
    }
  }

  &__reactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }
}

@media (max-width: 576px) {
  .article-content {
    &__details-block {
      &-title {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 1.2;
      }

      &-paragraph {
        margin-bottom: 6px;
        font-size: 14px;
      }

      &-date {
        font-size: 12px;
        color: var(--color-mine-shaft);
      }
    }

    &__reactions {
      padding: 0;
    }
  }
}
</style>

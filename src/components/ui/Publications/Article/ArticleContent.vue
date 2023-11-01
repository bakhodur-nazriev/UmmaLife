<template>
  <section class="article-content__section">
    <div class="article-content__section-item">
      <img
        src="@/assets/images/Post_1.png"
        alt=""
        class="article-content__image"
      >
      <div class="article-content__details-block">
        <h3 class="article-content__details-block-title">Название статьи, которое не поместилось на одну строку и переместилось на вторую строчку</h3>
        <p class="article-content__details-block-paragraph">Аль-Ула - город, полный археологических чудес. Расположенный на северо-западе Саудовской Аравии в провинции Медина, это популярное туристическое направление. Аль-Ула является первым объектом Всемирного наследия ЮНЕСКО в стране. Это место, изве...</p>
        <span class="article-content__details-block-date">20.08.2022</span>
      </div>
    </div>

    <div class="article-content__reactions">
      <PostReactions />
    </div>
  </section>
</template>

<script>
import PostReactions from '@/components/ui/Post/PostReactions.vue'
export default {
  components: {
    PostReactions
  },
  data: () => ({})
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
      line-clamp: 3 ;
      -webkit-box-orient: vertical;
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

  &__image {
    width: 100%;
    border-radius: 15px;
    height: 80%;
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

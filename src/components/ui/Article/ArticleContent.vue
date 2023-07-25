<template>
  <section class="article-content__section">
    <div class="article-content__section-item">
      <img
        src="@/assets/images/Post_1.png"
        alt=""
        class="article-content__image"
      >
      <div class="article-content__detail__block">
        <h3 class="article-content__detail__block-title">Название статьи, которое не поместилось на одну строку и переместилось на вторую строчку</h3>
        <p class="article-content__detail__block-paragraph">Аль-Ула - город, полный археологических чудес. Расположенный на северо-западе Саудовской Аравии в провинции Медина, это популярное туристическое направление. Аль-Ула является первым объектом Всемирного наследия ЮНЕСКО в стране. Это место, изве...</p>
      </div>
    </div>

    <div class="article-content__reactions">
      <div class="article-content__reactions-block">
        <div
          v-for="(reaction, index) in reactions"
          :key="index"
          class="reaction"
        >
          <component :is="reaction.icon"/>
          <span>{{ reaction.count }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
export default {
  data () {
    return {
      reactions: [
        { icon: LikeIcon, count: 1550 },
        { icon: DislikeIcon, count: 2351 },
        { icon: LoveIcon, count: 1987 },
        { icon: FireIcon, count: 2358 },
        { icon: AngryIcon, count: 7462 },
        { icon: ScaredIcon, count: 7894 },
        { icon: LaughIcon, count: 5671 },
        { icon: ThinkIcon, count: 9874 },
        { icon: SadIcon, count: 9876 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.article-content__detail__block {
  display: flex;
  flex-direction: column;
  padding: 20px;

  &-title {
    font-size: 16px;
    margin-top: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &-paragraph {
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3 ;
    -webkit-box-orient: vertical;
  }
}

.article-content__section {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &-item {
    display: flex;
    flex-direction: column;
    background-color: var(--color-seashell);
    border-radius: 15px;
  }
}

.article__content--image {
  width: 100%;
  border-radius: 15px;
  height: 80%;
}

.article-content__reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
}

.article-content__reactions-block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  .reaction {
    height: 32px;
    background: var(--color-seashell);
    border-radius: 50px;
    padding: 8px 12px;
    color: var(--color-silver-chalice);
    width: auto;
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 14px;
  }
}
</style>

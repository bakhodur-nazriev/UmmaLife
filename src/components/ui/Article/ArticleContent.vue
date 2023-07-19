<template>
  <section class="article__content--section">
    <div class="article__content--item">
      <img
        src="@/assets/images/post_image.png"
        alt=""
        class="article__content--image"
      >
      <div class="article__content--details">
        <div class="article__title--block">
          <h3 class="article__title">Название статьи, которое не поместилось на одну строку и переместилось на вторую</h3>
        </div>
        <div class="article__detail--block">
          <router-link
            to="#"
            class="read__more--link"
          >
            {{ $t('buttons.read_more') }}
          </router-link>
          <div class="stats__reposts">
            <span>155 {{ $t('labels.comments.plural') }}</span>
            <span class="stats__separator"> / </span>
            <span>35 {{ $t('labels.reposts.plural') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="article__content--reactions">
      <div class="reactions__block">
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
.article__content--item {
  position: relative;
  display: flex;

  &:before {
    display: flex;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    backdrop-filter: blur(8px);
    z-index: 1;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
}

.article__content--section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article__content--image {
  width: 100%;
  border-radius: 15px;
  height: 80%;
}

.article__content--details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 14px;
  position: absolute;
  bottom: 20px;
  padding: 0 18px;
  width: 100%;
  z-index: 10;
}

.article__title {
  margin: 0;
  color: var(--color-white);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.article__detail--block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.read__more--link {
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-white);
  background-color: var(--color-hippie-blue);
  padding: 12px 80px;
}

.stats__reposts {
  color: var(--color-white);
  display: flex;
  font-size: 16px;

  * {
    line-height: 1;
  }

  &__separator {
    margin: 0 8px;
  }
}

.article__content--reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
}

.reactions__block {
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

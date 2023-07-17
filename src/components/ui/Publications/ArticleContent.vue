<script setup>
/* eslint-disable */
import SampleMenuDetailsButton from '@/components/ui/MenuDetails/SampleMenuDetailsButton.vue'
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/small/AngryIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/small/LaughIcon.vue'
import SadIcon from '@/components/icons/reactions/men/small/SadIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/small/ThinkIcon.vue'
import FireIcon from '@/components/icons/reactions/men/small/FireIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/small/ScaredIcon.vue'
import SampleDivider from "@/components/ui/SampleDivider.vue";

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  }
})

const reactions = [
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
</script>

<template>
  <article v-for="i in 4" :key="i" class="article__block">
    <section class="article__header--section">
      <div class="author__avatar--name--time">
        <img
          src="../../../assets/images/Article_Author.png"
          alt="author"
          width="56"
          height="56"
        >
        <div class="author__name--time">
          <span>Абрахам Арахамович</span>
          <small>15 минут назад</small>
        </div>
      </div>
      <div>
        <SampleMenuDetailsButton
          :is-menu-open="isMenuOpen"
          @toggleMenu="$emit('toggle-menu')"
        />
      </div>
    </section>

    <section class="article__content--section">
      <div class="article__content--item">
        <img
          src="../../../assets/images/post_image.png"
          alt=""
          class="article__content--image"
        >
        <div class="article__content--details">
          <div class="article__title--block">
            <h3 class="article__title">Название статьи</h3>
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

    <sample-divider />

    <section class="article__footer--section">

    </section>
  </article>
</template>

<style scoped lang="scss">
.article__footer--section {}

.read__more--link {
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-white);
  background-color: var(--color-hippie-blue);
  padding: 12px 80px;
}

.article__title {
  margin: 0;
  color: var(--color-white);
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
}

.article__content--reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 14px 0;
}

.reactions__block {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

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

.stats__separator {
  margin: 0 8px;
}

.stats__reposts {
  color: var(--color-white);
  display: flex;
  font-size: 16px;

  * {
    line-height: 1;
  }
}

.article__content--section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article__block {
  max-width: 560px;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 24px;
}

.article__header--section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.author__avatar--name--time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author__name--time {
  display: flex;
  flex-direction: column;

  span {
    color: var(--color-mine-shaft);
    font-size: 18px;
  }

  small {
    color: var(--color-silver-chalice);
    font-size: 14px;
  }
}

.article__content--item {
  position: relative;
  display: flex;
}

.article__content--item::after {
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

.article__content--image {
  width: 100%;
  border-radius: 15px;
  height: 80%;
}

.article__content--details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  bottom: 24px;
  padding: 0 18px;
  width: 100%;
  z-index: 200;
}

.article__detail--block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 767px) {}

@media (min-width: 1200px) {
  .reactions__block {
    max-width: 560px;
  }
}

@media (min-width: 1920px) {
  .reactions__block {
    max-width: 100%;
  }
}
</style>

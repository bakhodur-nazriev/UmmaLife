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
  <article class="article__block">
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
      <div class="article__content--block">
        <div class="article__left--side" v-if="false">
          <img
            src="../../../assets/images/article_image.png"
            alt=""
            width="420"
            height="225"
          >
        </div>
        <div class="article__right--side">
          <h3 class="article__title">Название статьи</h3>
          <p class="article__body">The 29-year-old took more than a tenth of a second off a record that had stood for 16
            years, clocking 52.20
            seconds to beat Russian Yuliya Pechonkina's previous mark of 52.34.
            "I'm just shocked," said Muhammad.
            "I've been kind of hitting that time in practice and my coach was like 'there's no way you can't do it'."
            "I've been kind of hitting that time in practice and my coach was like 'there's no way you can't do
            it'.""I've
            been kind of hitting that time inat time in...
          </p>
          <span>
            <a type="button" href="#" class="link read__more--link">{{ $t('buttons.read_more') }}</a>
          </span>
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

        <div class="stats__reposts">
          <span>155 {{ $t('labels.comments.plural') }}</span>
          <span class="stats__separator"> / </span>
          <span>35 {{ $t('labels.reposts.plural') }}</span>
        </div>
      </div>
    </section>

    <sample-divider />

    <section>

    </section>
  </article>
</template>

<style scoped lang="scss">
.article__content--block {
  display: flex;
  gap: 16px;
}

.article__title {
  margin: 0;
}

.article__body {
  margin: 0;
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
  color: var(--color-silver-chalice);
  display: flex;
  font-size: 14px;
}

.article__content--section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article__block {
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 24px;
}

.article__header--section {
  display: flex;
  justify-content: space-between;
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

.article__right--side {
  display: flex;
  flex-direction: column;

  span {
    text-align: right;
  }
}

@media (max-width: 767px) {
  .article__left--side {
    width: 50%;
  }
}

@media (min-width: 1200px) {
  .article__left--side {
    min-width: 420px;
  }

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

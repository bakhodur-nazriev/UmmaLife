<template>
  <SearchMainLayout>
    <div class="main-hashtags__block">
      <ul class="hashtags-list">
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#н</p>
            <span>2 тыс. просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#на</p>
            <span>1 млн. просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#на</p>
            <span>1 млн. просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#нап</p>
            <span>144 тыс. просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#напи</p>
            <span>810 просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#напис</p>
            <span>500 просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#написанноеслово</p>
            <span>94 тыс. просмотров</span>
          </div>
        </li>
        <li class="hashtags-list__item">
          <div class="hashtag-icon">
            <HashtagIcon/>
          </div>
          <div class="hashtags-list__item-title">
            <p>#написанноеслово</p>
            <span>94 тыс. просмотров</span>
          </div>
        </li>
      </ul>
    </div>
  </SearchMainLayout>
</template>

<script>
import HashtagIcon from '@/components/icons/navbar/small-display/HashtagIcon.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import SearchMainLayout from '@/components/layouts/SearchMainLayout.vue'

export default {
  components: {
    SearchMainLayout,
    MainLayout,
    HashtagIcon
  }
}
</script>

<style scoped lang="scss">
.main-hashtags__block {
  background-color: var(--color-white);
  border-radius: 20px;
  width: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hashtags-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;

    &-title {
      display: flex;
      flex-direction: column;
      gap: 4px;

      p {
        margin: 0;
        line-height: 1;
      }

      span {
        font-size: 14px;
        color: var(--color-secondary);
        line-height: 1;
      }
    }
  }
}

.hashtag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-seashell);

  svg {
    width: 20px;
    height: 20px;
  }
}

@media (min-width: 1920px) {
  .main-hashtags__block {
    width: 700px;
  }
}
</style>

<template>
  <div class="hashtags-block">
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
</template>

<script>
import HashtagIcon from '@/components/icons/navbar/small-display/HashtagIcon.vue'

export default {
  components: {
    HashtagIcon
  }
}
</script>

<style scoped lang="scss">
.hashtags-block {
  padding: 20px 0;
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
    gap: 8px;

    &-title {
      display: flex;
      flex-direction: column;
    }

    p {
      margin: 0;
      line-height: 1;
    }

    span {
      font-size: 12px;
      color: var(--color-secondary);
    }
  }
}

.hashtag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-seashell);
}
</style>

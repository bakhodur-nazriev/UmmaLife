<template>
  <ArticlesMainTabs
    :tabsArray="[
      `${$t('tabs.articles_page.all_articles')}`,
      `${$t('tabs.articles_page.my_articles')}`,
      `${$t('tabs.articles_page.saved')}`,
      `${$t('tabs.articles_page.drafts')}`,
      `${$t('tabs.articles_page.create_new_article')}`
    ]"
  />

  <div class="create-button__block">
    <button type="button" class="create-button">
      <PlusIcon />
    </button>
  </div>
</template>

<script>
import ArticlesMainTabs from '@/components/articles/ArticlesMainTabs.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'

export default {
  components: {
    PlusIcon,
    ArticlesMainTabs
  }
}
</script>

<style scoped>
.create-button__block {
  display: none;
}

@media (max-width: 576px) {
  .create-button__block {
    display: block;
    position: absolute;
    bottom: 80px;
    width: 48px;
    height: 48px;
    right: 20px;
    z-index: 90;

    .create-button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      color: var(--color-white);
      font-size: 24px;
      width: 100%;
      height: 100%;
      background: var(--color-hippie-blue);
      box-shadow: 0 2px 10px rgba(73, 163, 153, 0.6);
      border-radius: 15px;
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>

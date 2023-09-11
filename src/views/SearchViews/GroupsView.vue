<template>
  <MainLayout>
    <SearchMainLayout>
      <div class="main-people__block">
        <ul class="people-list">
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_1.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>История и факты</h3>
                <span>20076 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_2.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Промышленный дизайн</h3>
                <span>1725 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_3.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Venom Foundation</h3>
                <span>11700 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_4.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Кулинария</h3>
                <span>912 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_5.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Космос</h3>
                <span>20076 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_6.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Путешествия Online</h3>
                <span>1725 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_7.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Tooba</h3>
                <span>11700 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_8.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Frontend developers</h3>
                <span>912 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_9.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>L0</h3>
                <span>11700 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/groups_10.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Интерьер домов</h3>
                <span>912 подписчиков</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
        </ul>
      </div>
    </SearchMainLayout>
  </MainLayout>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import SearchMainLayout from '@/components/layouts/SearchMainLayout.vue'

export default {
  components: {
    SearchMainLayout,
    MainLayout,
    SampleButton
  }
}
</script>

<style scoped lang="scss">
.main-people__block {
  background-color: var(--color-white);
  border-radius: 20px;
  width: 700px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subscribe-button {
  padding: 10px 24px;
}

.people-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-details {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        width: 40px;
        height: 40px;
      }

      &__titles {
        display: flex;
        flex-direction: column;
        gap: 4px;

        h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
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
}
</style>

<template>
  <MainLayout>
    <SearchMainLayout>
      <div class="main-people__block">
        <ul class="people-list">
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_1.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Мухаммад Мухаммадов</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_2.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Магомед Оздоев</h3>
                <span>Грузия, 27 лет</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_3.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Александр Сидоренко</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_4.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Айжан Тумухамбетова</h3>
                <span>Мадрид, 28 лет</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_5.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Патимат Нурмагомедова</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_6.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Патимат Нурмагомедова</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_7.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Тимур Алиев</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_8.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>muvahhid</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_9.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Azmi Omran</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_10.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Юнус Абу Рамазан</h3>
                <span>Istanbul, 24 года</span>
              </div>
            </div>
            <SampleButton class="subscribe-button" :title="`${ $t('buttons.subscribe') }`"/>
          </li>
          <li class="people-list__item">
            <div class="people-list__item-details">
              <img src="@/assets/images/search/people_11.png" alt="">
              <div class="people-list__item-details__titles">
                <h3>Alina Nikolaeva</h3>
                <span>Istanbul, 24 года</span>
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
    MainLayout,
    SampleButton,
    SearchMainLayout
  }
}
</script>

<style scoped lang="scss">
.main-people__block {
  background-color: var(--color-white);
  border-radius: 20px;
  width: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subscribe-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 136px;
  height: 36px;
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

@media (min-width: 1920px) {
  .main-people__block {
    width: 700px;
  }
}
</style>

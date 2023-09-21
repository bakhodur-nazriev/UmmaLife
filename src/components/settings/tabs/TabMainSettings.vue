<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <MainSettingsIcon />
      </template>
      <template #title> Основные настройки </template>
      <template #text>
        В разделе "Основные настройки" вы можете настроить основные параметры вашего профиля.
        Обновите свой логин, телефон, адрес электронной почты, дату рождения и страну проживания,
        чтобы ваш профиль на Umma Life был актуальным и полноценным.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__login create__group--form">
          <label for="login" class="create__group--label">Логин</label>
          <input
            type="text"
            name="login"
            class="create__group--input"
            placeholder="Логин..."
            value="ibragimumma"
          />
        </div>
        <div class="settings__show">
          <BaseCheckbox label="Отобразить в профиле" />
          <div class="settings__show--text">Отображать логин в профиле вместо имени и фамилии</div>
        </div>
        <div class="create__group--form">
          <label for="phone" class="create__group--label">Телефон</label>
          <div class="create__group--input-wrapper">
            <SampleSelectedCountry class="settings__phone" />
            <input
              type="text"
              name="phone"
              class="create__group--input"
              placeholder="Номер телефона"
            />
          </div>
        </div>
        <div class="create__group--form">
          <label for="email" class="create__group--label">Электронный адрес</label>
          <input
            type="email"
            name="email"
            class="create__group--input"
            placeholder="Email..."
            value="ummalife@umma.ru"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Страна</div>
          <BaseCustomSelect
            :options="['Турция', 'Россия']"
            :default="'Турция'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form">
          <label for="address" class="create__group--label">Адрес</label>
          <input
            type="text"
            name="address"
            class="create__group--input"
            placeholder="Введите адрес"
          />
        </div>
        <div class="settings__categories">
          <div class="create__group--label">Категории интересов</div>
          <div class="settings__categories--wrapper">
            <BaseCheckbox v-for="category in categories" :key="category" :label="category" />
          </div>
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import MainSettingsIcon from '@/components/icons/settings/MainSettingsIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import SampleSelectedCountry from '@/components/ui/SampleSelectedCountry.vue'
import { reactive } from 'vue'

const handleSelect = (event) => {
  // TODO
}

const categories = reactive([
  'Религия',
  'Психология',
  'Семья',
  'Работа',
  'Здоровье',
  'Учеба',
  'Путешествия',
  'Книги',
  'Наука',
  'Спорт',
  'Искусство',
  'Авто',
  'Еда',
  'Позитив',
  'Фитнес',
  'История',
  'Мода',
  'Архитектура',
  'Красота',
  'Воспитание',
  'Природа'
])
</script>

<style lang="scss">
.settings {
  &__form {
    .create__group--form {
      grid-template-columns: 282px 1fr;
      gap: 28px;
    }
    .create__group--label {
      font-weight: 550;
    }
  }
  &__phone {
    margin-right: 20px;
    .country-select-button {
      padding: 0 !important;
      background: transparent !important;
    }
  }
  &__login {
    padding: 0 !important;
    border-bottom: none !important;
    margin-bottom: 19px;
    .create__group--input {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      padding: 0;
    }
  }
  &__show {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-gallery-first);

    &--text {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;
      color: var(--color-secondary);
    }
  }
  &__categories {
    padding-top: 24px;
    &--wrapper {
      margin-top: 24px;
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>

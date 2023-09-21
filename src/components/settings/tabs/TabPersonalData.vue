<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <PersonalDataIcon />
      </template>
      <template #title>Личные данные</template>
      <template #text>
        В разделе "Личная информация" вы можете указать дополнительные данные о себе, чтобы другие
        пользователи могли лучше узнать вас. Заполните поля ФИО, расскажите немного о себе и укажите
        ваше место проживания. Это поможет создать более личное и индивидуальное представление о вас
        в сообществе Umma Life.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form pt-0">
          <label class="create__group--label">Имя</label>
          <input type="text" class="create__group--input pt-0" placeholder="Имя" value="Ибрагим" />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">Фамилия</label>
          <input type="text" class="create__group--input" placeholder="Фамилия" value="Ибрагимов" />
        </div>
        <div class="create__group--form create__group--form-text">
          <label class="create__group--label">Обо мне</label>
          <textarea
            class="create__group--input create__group--textarea"
            placeholder="Расскажите о себе..."
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Семейное положение</div>
          <BaseCustomSelect
            :options="['Не выбрано', 'Женат']"
            :default="'Не выбрано'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form create__group--form-text pb-0">
          <label for="address" class="create__group--label">Адрес</label>
          <input
            type="text"
            name="address"
            class="create__group--input pt-0 pb-0"
            placeholder="Введите адрес"
          />
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import PersonalDataIcon from '@/components/icons/settings/PersonalDataIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'

const handleSelect = (event) => {
  // TODO
}
</script>

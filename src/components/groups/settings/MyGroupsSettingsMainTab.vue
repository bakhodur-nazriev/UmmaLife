<template>
  <form class="create__group">
    <div class="create__group--block off-padding">
      <div class="create__group--form">
        <label for="name" class="create__group--label">Название группы</label>
        <input
          type="text"
          name="name"
          class="create__group--input"
          placeholder="Введите название..."
        />
      </div>
      <div class="create__group--form">
        <label for="url" class="create__group--label">URL-адрес</label>
        <div class="create__group--input-wrapper">
          <span>https://ummalife.com/</span>
          <input type="text" name="url" class="create__group--input" placeholder="Введите URL..." />
        </div>
      </div>
      <div class="create__group--form create__group--form-text">
        <label for="desc" class="create__group--label">Краткое описание</label>
        <textarea
          name="desc"
          class="create__group--input create__group--textarea"
          placeholder="Добавьте описание..."
        />
      </div>
      <div class="create__group--form">
        <div class="create__group--label">Страна</div>
        <BaseCustomSelect
          :options="['Россия', 'Турция']"
          :default="'Не выбрано'"
          @input="handleSelect"
        />
      </div>
      <div class="create__group--form">
        <div class="create__group--label">Категория</div>
        <BaseCustomSelect
          :options="[
            'Автомобили и транспорт',
            'Комедия',
            'Экономика и торговля',
            'Образование',
            'Развлечения',
            'Фильмы и анимация',
            'История и факты',
            'Образ жизни',
            'Природа',
            'Новости и политика'
          ]"
          :default="'Автомобили и транспорт'"
          @input="handleSelect"
        />
      </div>
      <div class="create__group--form">
        <div class="create__group--label">Удалить группу</div>
        <button type="button" class="create__group--btn create__group--delete">Удалить</button>
      </div>
    </div>
    <div class="create__group--actions">
      <button type="submit" class="create__group--btn submit">Сохранить</button>
      <button type="button" class="create__group--btn">Отменить</button>
    </div>
  </form>
</template>

<script>
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
export default {
  emits: ['closeCreate'],
  components: { BaseCustomSelect }
}
</script>

<style>
.off-padding {
  padding-top: 0 !important;
}
.create__group--delete {
  color: var(--color-valencia);
  background-color: var(--color-seashell);
}
</style>

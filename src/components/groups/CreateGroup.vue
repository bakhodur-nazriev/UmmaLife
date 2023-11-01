<template>
  <form class="create__group">
    <div class="create__group--block">
      <div class="create__group--title with-border">Создать новую группу</div>
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
        <div class="create__group--label">Тип группы</div>
        <BaseCustomSelect
          :options="['Открытая группа', 'Закрытая группа']"
          :default="'Открытая группа'"
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
        <div class="create__group--label">Кто может создавать публикации в группе?</div>
        <BaseCustomSelect
          :options="['Доступно всем', 'Только владелец']"
          :default="'Доступно всем'"
          @input="handleSelect"
        />
      </div>
    </div>
    <div class="create__group--block">
      <div class="create__group--title">Фото группы</div>
      <div class="create__group--drop" @dragover.prevent @dragleave.prevent @drop.prevent="drop">
        <input type="file" accept="image/png, image/jpg, image/jpeg" multiple />
        <GalleryAddIcon />
        <p>Нажмите или перетащите изображение</p>
        <span>Допустимые расширения jpeg, jpg, png</span>
      </div>
      <button type="button" class="create__group--drop-btn">Изменить</button>
    </div>
    <div class="create__group--block">
      <div class="create__group--title">Обложка группы</div>
      <div class="create__group--drop" @dragover.prevent @dragleave.prevent @drop.prevent="drop">
        <input type="file" accept="image/png, image/jpg, image/jpeg" multiple />
        <GalleryAddIcon />
        <p>Нажмите или перетащите изображение</p>
        <span>Допустимые расширения jpeg, jpg, png</span>
      </div>
      <button type="button" class="create__group--drop-btn">Изменить</button>
    </div>
    <div class="create__group--actions">
      <button type="submit" class="create__group--btn submit">Сохранить</button>
      <button type="button" class="create__group--btn" @click="$emit('closeCreate')">
        Отменить
      </button>
    </div>
  </form>
</template>

<script>
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import GalleryAddIcon from '@/components/icons/GalleryAddIcon.vue'
export default {
  emits: ['closeCreate'],
  components: { BaseCustomSelect, GalleryAddIcon },
  methods: {
    drop(event) {
      // TODO
    },
    handleSelect(event) {
      // TODO
    }
  }
}
</script>

<style lang="scss">
.create__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &--block {
    padding: 24px;
    background: var(--color-white);
    border-radius: 20px;
  }
  &--title {
    padding-bottom: 24px;
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: 150%;
    color: var(--color-mine-shaft);
    &.with-border {
      border-bottom: 1px solid var(--color-gallery-first);
    }
  }
  &--form {
    display: grid;
    grid-template-columns: 186px 1fr;
    gap: 24px;
    align-items: center;
    padding: 9px 0;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-gallery-first);
    }
    &-text {
      align-items: flex-start;
      padding-top: 24px;
    }
  }
  &--input {
    padding: 16px 0;
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    &::placeholder {
      color: var(--color-silver-chalice);
    }
    &-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
  &--textarea {
    resize: none;
    min-height: 87px;
    padding: 3px 0;
  }
  &--drop {
    border-radius: 10px;
    border: 2px dashed var(--color-silver-chalice);
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 20px;
    text-align: center;
    input[type='file'] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    svg {
      width: 60px;
      height: 60px;
      margin-bottom: 16px;
    }
    p {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      padding: 0;
      margin: 0 auto 8px;
      color: var(--color-silver-chalice);
      width: 263px;
    }
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-silver-chalice);
    }
    &-btn {
      padding: 15px;
      width: 216px;
      border: none;
      outline: none;
      cursor: pointer;
      background: var(--color-seashell);
      color: var(--color-silver-chalice);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      border-radius: 10px;
    }
  }
  &--label {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
  }
  &--actions {
    display: flex;
    gap: 12px;
    margin: 17px 0;
  }
  &--btn {
    width: 163px;
    border-radius: 10px;
    background: var(--color-alto-first);
    padding: 12px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    border: none;
    outline: none;
    cursor: pointer;
    &.submit {
      color: var(--color-white);
      background: var(--color-green);
      &:hover {
        background-color: var(--color-deep-cerulean);
        color: var(--color-white);
        transition: all 0.15s ease-in-out;
      }
    }
  }
}
</style>

<template>
  <div class="audio__page--container">
    <form class="download__audio">
      <div class="download__audio--left">
        <div class="download__audio--box">
          <div class="download__audio--title">Добавить аудио</div>
          <div
            class="create__group--drop"
            @dragover.prevent
            @dragleave.prevent
            @drop.prevent="drop"
          >
            <input type="file" accept="audio/mp3" multiple />
            <AudioDropdownIcon />
            <p>Нажмите или перетащите аудио</p>
            <span>Допустимые расширения mp3</span>
          </div>
        </div>
        <div class="download__audio--box">
          <div class="download__audio--title secondary">Создать альбом</div>
          <div class="download__audio--subtitle">
            Для создания альбома необходимо заполнить поля ниже
          </div>

          <div class="album__form--wrapper">
            <div class="album__form--file">
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                multiple
                @change="inputHandler"
              />
              <CameraIcon />
            </div>
            <input class="album__form--input" type="text" placeholder="Добавить название альбома" />
          </div>
          <textarea
            class="album__form--input album__form--textarea"
            type="text"
            placeholder="Добавить описание альбома"
          />
        </div>
      </div>
      <div class="download__audio--right">
        <div class="download__audio--box full">
          <div class="download__audio--title">
            Все аудио для загрузки
            <span>3 файла</span>
          </div>
          <div class="download__state">
            <div class="download__state--name">Название аудиофайла56kbpr_....mp3</div>
            <div class="download__state--status success">Загрузка завершена</div>
            <CloseCircle class="download__state--close" />
          </div>
          <div class="download__state">
            <div class="download__state--name">Название аудиофайла56kbpr_....mp3</div>
            <div class="download__state--status waiting">
              <WaitingYellowIcon />
              Ожидание
            </div>
            <CloseCircle class="download__state--close" />
          </div>
          <div class="download__state">
            <div class="download__state--name">Название аудиофайла56kbpr_....mp3</div>
            <div class="download__state--status alert">Ошибка загрузки</div>
            <CloseCircle class="download__state--close" />
          </div>
        </div>
        <div class="download__audio--actions">
          <button type="submit" class="download__audio--btn primary">Загрузить в плейлист</button>
          <button type="button" class="download__audio--btn secondary">Создать как альбом</button>
          <button type="button" class="download__audio--btn default">Отменить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AudioDropdownIcon from '@/components/icons/audio/AudioDropdownIcon.vue'
import CameraIcon from '@/components/icons/CameraIcon.vue'
import CloseCircle from '@/components/icons/CloseCircle.vue'
import WaitingYellowIcon from '@/components/icons/WaitingYellowIcon.vue'
export default {
  components: { AudioDropdownIcon, CameraIcon, CloseCircle, WaitingYellowIcon },
  methods: {
    drop(event) {
      // TODO
    }
  }
}
</script>

<style lang="scss">
.download__audio {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 25px;

  &--box {
    background-color: var(--color-white);
    border-radius: 15px;
    padding: 24px;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    &.full {
      height: calc(100% - 72px);
    }
  }
  &--title {
    font-size: 20px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 20px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-silver-chalice);
    }
    &.secondary {
      margin-bottom: 4px;
    }
  }
  &--subtitle {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-silver-chalice);
    margin-bottom: 16px;
  }
  .album__form--wrapper {
    margin-bottom: 16px;
  }
  .album__form--textarea {
    height: 180px;
    width: 100%;
    resize: none;
  }
  &--actions {
    display: flex;
    gap: 10px;
  }
  &--btn {
    flex-grow: 1;
    padding: 15px;
    border-radius: 10px;
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    border: 1px solid transparent;
    cursor: pointer;
    &.primary {
      background-color: var(--color-green);
      color: var(--color-white);
    }
    &.secondary {
      color: var(--color-green);
      border-color: var(--color-green);
    }
    &.default {
      background-color: var(--color-alto-second);
      color: var(--color-silver-chalice);
    }
  }
}
.download__state {
  display: flex;
  align-items: center;
  padding: 11px 24px;
  border-radius: 15px;
  margin-bottom: 8px;
  border: 1px solid var(--color-silver-chalice);
  &--name {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    width: 340px;
    margin-right: 50px;
  }
  &--status {
    width: 211px;
    border-radius: 12px;
    text-align: center;
    border: none;
    outline: none;
    padding: 14px 12px 12px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    margin-right: 24px;
    &.success {
      background: #edf7ed;
      color: #53af50;
    }
    &.waiting {
      background: #ffefc1;
      color: #d8a000;
    }
    &.alert {
      background: #ffe7e7;
      color: var(--color-valencia);
    }
  }
  &--close {
  }
}
</style>

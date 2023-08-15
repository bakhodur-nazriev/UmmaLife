<template>
  <div class="album__add">
    <div class="album__add--top">
      <p>Добавить альбом</p>
      <span>24 файла</span>
    </div>
    <form class="album__form">
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
      <input class="album__form--input" type="text" placeholder="Добавить описание альбома" />
      <div class="album__form--drag" @dragover.prevent @dragleave.prevent @drop.prevent="drop">
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          multiple
          @change="inputHandler"
        />
        <GalleryAddIcon />
        <p>Нажмите или перетащите изображение</p>
        <span>Допустимые расширения jpeg, jpg, png</span>
      </div>
      <AlbumsImages
        v-if="files.length > 0"
        :files="files"
        @removeFile="removeFile"
        :showMore="showMore"
      />
      <div class="album__form--actions">
        <div class="left">
          <button class="album__form--btn submit" type="submit">Сохранить</button>
          <button class="album__form--btn cancel" type="button" @click="$emit('closeAdd')">
            Отменить
          </button>
        </div>
        <div class="right" @click="showMore = true" v-if="files.length > 6 && !showMore">
          Посмотреть все ({{ files.length }})
        </div>
      </div>
    </form>
  </div>
  <teleport to="body">
    <AlbumsError v-if="showError" />
  </teleport>
</template>

<script>
import CameraIcon from '@/components/icons/CameraIcon.vue'
import GalleryAddIcon from '@/components/icons/GalleryAddIcon.vue'
import AlbumsImages from '@/components/albums/AlbumsImages.vue'
import AlbumsError from '@/components/albums/AlbumsError.vue'
import { sleep } from '@/utils.js'
export default {
  components: { CameraIcon, GalleryAddIcon, AlbumsImages, AlbumsError },
  emits: ['closeAdd'],
  data() {
    return {
      files: [],
      showMore: false,
      showError: false
    }
  },
  methods: {
    inputHandler(event) {
      this.uploadFiles(event.target.files)
    },
    drop(event) {
      this.uploadFiles(event.dataTransfer.files)
    },
    uploadFiles(files) {
      this.showError = false
      for (const file of files) {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          this.files.push({
            id: this.files.length + 1,
            src: URL.createObjectURL(file)
          })
        } else {
          this.showError = true
          sleep(2000).then(() => {
            this.showError = false
          })
        }
      }
    },
    removeFile(id) {
      this.files = this.files.filter((file) => file.id !== id)
    }
  },
  mounted() {
    console.clear()
  }
}
</script>

<style lang="scss">
.album__add {
  background: var(--color-white);
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 20px;
  &--top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
    p {
      margin: 0;
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: 130%;
      color: var(--color-mine-shaft);
    }
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-silver-chalice);
    }
  }
}
.album__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  &--wrapper {
    display: grid;
    gap: 20px;
    grid-template-columns: 60px 1fr;
  }
  &--file {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: var(--color-seashell);
    cursor: pointer;
    input[type='file'] {
      position: absolute;
      left: 0;
      height: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
  &--input {
    border-radius: 10px;
    border: 1px solid var(--color-silver-chalice);
    outline: none;
    padding: 19px 24px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    &::placeholder {
      color: var(--color-silver-chalice);
    }
  }
  &--drag {
    height: 252px;
    width: 100%;
    border: 2px dashed var(--color-silver-chalice);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    input[type='file'] {
      position: absolute;
      left: 0;
      height: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    p {
      margin: 16px 0 8px;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      color: var(--color-silver-chalice);
      text-align: center;
      width: 263px;
    }
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-silver-chalice);
      text-align: center;
    }
  }
  &--actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    .left {
      gap: 8px;
      display: flex;
    }
    .right {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: 130%;
      color: var(--color-hippie-blue);
      cursor: pointer;
    }
  }
  &--btn {
    width: 216px;
    border: none;
    outline: none;
    border-radius: 50px;
    padding: 15px;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    &.submit {
      background: var(--color-green);
      color: var(--color-white);
    }
    &.cancel {
      background: var(--color-gallery-first);
      color: var(--color-silver-chalice);
    }
  }
}
</style>

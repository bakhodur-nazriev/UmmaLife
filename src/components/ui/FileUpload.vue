<template>
  <div class="file-upload">
    <label :for="inputId" class="file-upload__label">
      <slot></slot>
    </label>
    <input
      :id="inputId"
      type="file"
      :accept="accept"
      @change="handleFileChange"
      class="file-upload__input"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputId: uuidv4()
    }
  },
  methods: {
    handleFileChange (event) {
      // const file = event.target.files[0]
      // Выполните необходимую обработку файла здесь, например, отправка на сервер или обновление данных в родительском компоненте
    }
  }
}
</script>

<style scoped>
.file-upload {
  display: inline-block;
}

.file-upload__label {
  cursor: pointer;
}

.file-upload__input {
  display: none;
}
</style>

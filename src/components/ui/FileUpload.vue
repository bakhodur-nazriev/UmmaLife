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
import {v4 as uuidv4} from 'uuid'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      default: ''
    },
    onFileSelected: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      inputId: uuidv4(),
      selectedFile: null
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      // Emit the event to the parent component
      this.onFileSelected(this.selectedFile);
    }
  }
}
</script>

<style scoped lang="scss">
.file-upload {
  display: flex;

  &__label {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }

  &__input {
    display: none;
  }
}
</style>

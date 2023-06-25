<template>
  <textarea class="sample__textarea"></textarea>

  <div class="textarea__right--buttons">
    <file-upload class="attach__file" label="file">
      <textarea-clip-icon />
    </file-upload>
    <sample-divider class="textarea__right--buttons--divider" />
    <button class="send__button" type="button">
      <send-icon/>
    </button>
  </div>
</template>

<script>
import FileUpload from "@/components/ui/FileUpload.vue";
import SampleDivider from "@/components/ui/SampleDivider.vue";
import TextareaClipIcon from "@/components/icons/TextareaClipIcon.vue";
import SendIcon from "@/components/icons/SendIcon.vue";

export default {
  components: {SendIcon, TextareaClipIcon, SampleDivider, FileUpload}

}
</script>

<style scoped>
.sample__textarea {
  border: none;
  resize: none;
  outline: none;
  font-size: 16px;
  background-color: var(--color-seashell);
  border-radius: 15px;
  padding: 12px;
}

.sample__textarea::placeholder {
  color: var(--color-silver-chalice);
}
</style>

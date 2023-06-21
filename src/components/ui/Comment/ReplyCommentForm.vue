<template>
  <form action="" method="post" class="reply__form">
    <div class="reply__author--section">
      <img src="../../../assets/images/reply_avatar.png" alt="">
      <div class="reply__author--name">
        <span class="author__name">Courtney Henry</span>
        <span class="author__time">2 ч назад</span>
      </div>
    </div>

    <div>
      <div class="reply__textarea--section">
        <div class="reply__textarea--and--menu">
          <sample-textarea class="reply__textarea"/>
          <sample-menu-details-button :is-menu-open="isMenuOpen" />
        </div>

        <div class="reply__buttons--section">
          <button type="button">{{ $t('buttons.favourite') }}</button>
          <button type="button">{{ $t('buttons.answer') }}</button>
        </div>
      </div>
    </div>
  </form>

</template>

<script>
import SampleTextarea from '@/components/ui/SampleTextarea.vue'
import SampleMenuDetailsButton from '@/components/ui/SampleMenuDetailsButton.vue'

export default {
  components: {
    SampleMenuDetailsButton,
    SampleTextarea
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.reply__form::before {
  content: "";
  position: absolute;
  width: 100%;
  background-color: #000;
}

.reply__textarea--and--menu {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.reply__textarea--section {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.reply__textarea {
  width: 90%;
  margin-right: 18px;
}

.reply__form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.reply__author--section {
  display: flex;
}

.reply__author--name span {
  margin: 0 4px;
}

.author__time {
  color: var(--color-text)
}

.reply__buttons--section {
  display: flex;
  gap: 16px;
  width: 90%;
}

.reply__buttons--section button {
  border: none;
  background: none;
  color: var(--color-gray-4);
  font-size: 16px;
  cursor: pointer;
}
</style>

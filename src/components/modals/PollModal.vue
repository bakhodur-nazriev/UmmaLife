<template>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    @click.self="closeModal"
  >
    <div class="modal__dialog">
      <div class="modal__content">
        <header class="modal__header">
          <h2 class="modal__title">{{ $t('sections_title.create_poll') }}</h2>
          <button class="modal__close" type="button" @click="closeModal">
            <CloseIcon/>
          </button>
        </header>

        <sample-divider />

        <div class="modal__body">
          <sample-input
            :label="`${ $t('labels.poll.question') }`"
            :placeholder="`${ $t('placeholders.question_for_poll') }`"
          />

          <div class="answer__options--block">
            <small class="answer__options--title text-1">{{ $t('labels.poll.answer_options') }}</small>

            <div class="answer__options--content" v-if="answerFields.length">
<!--              <Draggable v-model="answerFields" :animation="300">-->
                <poll-answer-input
                  v-for="(field, index) in answerFields"
                  :key="field.id"
                  :placeholder="`${$t('labels.poll.answer')} ${index + 1}`"
                  :index="index"
                  @remove="removeAnswerField(index)"
                />
<!--              </Draggable>-->
            </div>

            <div class="add__answer--block">
              <button
                type="button"
                @click="addAnswerField"
                class="add__answer--button"
                :disabled="answerFields.length >= 8"
              >
                <span class="add__answer--title">{{ $t('buttons.add_answer') }}</span>
              </button>
            </div>
            <small class="answer__notification--eight--item">{{ $t('labels.poll.only_eight_symbol') }}</small>
          </div>
        </div>
        <footer class="modal__footer">
          <button class="cancel__button" type="button" @click="closeModal">{{ $t('buttons.cancel') }}</button>
          <button class="create__poll--button" type="button">{{ $t('buttons.create_poll') }}</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import SampleInput from '@/components/ui/Fields/SampleInput.vue'
import PollAnswerInput from '@/components/ui/Fields/PollAnswerInput.vue'
// import Draggable from 'vuedraggable'

export default {
  components: {
    PollAnswerInput,
    SampleInput,
    SampleDivider,
    CloseIcon
    // Draggable
  },
  data () {
    return {
      showModal: false,
      newIndex: 1,
      answerFields: []
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    addAnswerField () {
      if (this.answerFields.length < 8) {
        this.answerFields.push({ id: this.newIndex })
        this.newIndex++
      }
    },
    removeAnswerField (index) {
      this.answerFields.splice(index, 1)
    },
    moveAnswerField (event) {
      const { newIndex, oldIndex } = event
      const movedField = this.answerFields[oldIndex]
      this.answerFields.splice(oldIndex, 1)
      this.answerFields.splice(newIndex, 0, movedField)
    }
  },
  computed: {
    answerFieldIndices () {
      return Array.from({ length: this.answerFields.length }, (_, index) => index + 1)
    },
    dragOptions () {
      return {
        animation: 300,
        handle: '.move__item--button',
        onEnd: this.moveAnswerField
      }
    }
  }
}
</script>

<style scoped>
.answer__notification--eight--item {
  color: var(--color-silver-chalice);
  font-size: 12px;
}

.answer__options--title {
  color: var(--color-silver-chalice);
}

.answer__options--block {
  display: flex;
  flex-direction: column;
}

.answer__options--content {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-bottom: 8px;
}

.add__answer--title {
  padding-left: 17px;
}

.add__answer--block {
  cursor: pointer;
}

.add__answer--button {
  all: unset;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--color-seashell);
  color: var(--color-silver-chalice);
  font-size: 16px;
  border-radius: 10px;
  height: 48px;
}

.cancel__button,
.create__poll--button {
  all: unset;
  cursor: pointer;
  border-radius: 10px;
  width: 216px;
  height: 40px;
}

.cancel__button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gallery-first);
  color: var(--color-silver-chalice);
}

.create__poll--button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-hippie-blue);
  color: var(--color-white);
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.50);
  backdrop-filter: blur(2.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px;
}

.modal__dialog {
  background-color: #fff;
  width: 600px;
  border-radius: 20px;
  overflow: hidden;
  padding: 36px;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.modal__close {
  border: none;
  display: flex;
  cursor: pointer;
  padding: 0;
  background-color: var(--color-white);
}

.modal__close svg {
  color: var(--color-silver-chalice);
}

.modal__body {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.modal__footer {
  display: flex;
  justify-content: space-between;
}

.modal__open {
  overflow: hidden;
}

.modal__title {
  margin: 0;
  font-size: 16px;
  line-height: normal;
}
</style>

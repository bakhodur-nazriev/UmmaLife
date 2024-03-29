<template>
  <div class="create-article__container">
    <div class="main-tools__block">
      <section class="main-container__article">
        <div>
          <input class="article-title__input" type="text" :placeholder="$t('placeholders.article_title')">
          <span
            @click="showEditorModal"
            class="choose-tool__button"
          >+ {{ $t('labels.articles.create_article.press_to_select_tool') }}</span>
          <div v-if="showEditor" class="tool-block">
            <SampleButton icon="close" color="none" @click="closeToolWindow">
              <CloseToolEditorIcon/>
            </SampleButton>
            <div class="tools-block">
              <QuillEditor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                :placeholder="placeholderText"
                toolbar="#custom-toolbar"
              >
                <template #toolbar>
                  <div id="custom-toolbar">
                    <button class="ql-header">
                      <HeadingIcon/>
                      <span>{{ $t('labels.articles.editor.header') }}</span>
                    </button>

                    <button class="ql-media">
                      <GalleryAddEditorIcon/>
                      <span>{{ $t('labels.articles.editor.photo_video') }}</span>
                    </button>

                    <button class="link">
                      <LinkIcon/>
                      <span>{{ $t('labels.articles.editor.link') }}</span>
                    </button>

                    <button class="blockquote" @click="toggleQuote">
                      <EditorQuoteIcon/>
                      <span>{{ $t('labels.articles.editor.quote') }}</span>
                    </button>

                    <button class="ql-inset" @click="toggleInset">
                      <InsetIcon/>
                      <span>{{ $t('labels.articles.editor.inset') }}</span>
                    </button>

                    <button class="ql-list">
                      <TaskIcon/>
                      <span>{{ $t('labels.articles.editor.list') }}</span>
                    </button>

                    <button class="ql-divider" @click="addDivider">
                      <DividerIcon/>
                      <span>{{ $t('labels.articles.editor.divider') }}</span>
                    </button>

                    <div class="ql-audio__block">
                      <input
                        type="file"
                        accept="audio/*"
                        ref="fileInput"
                        style="display: none"
                        @change="handleFileSelect"
                      />
                      <button class="ql-audio" @click="openFilePicker">
                        <AudioIcon/>
                        <span>{{ $t('labels.articles.editor.audio') }}</span>
                      </button>
                    </div>

                    <button class="ql-chart" @click="togglePoll">
                      <ChartIcon/>
                      <span>{{ $t('labels.articles.editor.chart') }}</span>
                    </button>
                  </div>
                </template>
              </QuillEditor>
            </div>
          </div>

          <div class="editor-poll" v-if="pollActive">
            <input v-model="pollTitle" :placeholder="`${ $t('labels.articles.editor.poll.header') }`">
            <div v-for="(option, index) in pollOptions" :key="index" class="poll-item__block">
              <span class="poll-item__counter">{{ index + 1 }}</span>
              <input v-model="option.text" :placeholder="` ${ $t('labels.articles.editor.poll.placeholder') } `">
              <span class="remove-item__poll" @click="removeOption(index)">
                <RemoveIcon/>
              </span>
            </div>
            <button class="add-item__poll" @click="addOption">{{ $t('buttons.add_answer') }}</button>
          </div>
          <div class="editor-audio" v-if="editorAudioActive">
            <div class="editor-audio__play-icon">
              <SmallVideoPlayIcon/>
            </div>
            <div class="editor-audio__description">
              <span>{{ audioTitle }}</span>
              <small>{{ audioTime }}</small>
            </div>

          </div>
          <div class="editor-divider" v-if="editorDividerActive">
            <BigDividerIcon />
          </div>
          <div class="editor-blockquote" v-if="editorBlockquoteActive">
            <QuoteIcon />
            <blockquote class="quote">
              "Жизнь слишком коротка, чтобы тратить ее на злость и раздражение."
              "Жизнь слишком коротка, чтобы тратить ее на злость и раздражение."
              "Жизнь слишком коротка, чтобы тратить ее на злость и раздражение."
            </blockquote>
          </div>
        </div>

        <div class="editor-bottom__buttons">
          <SampleButton
            icon="eye"
            color="seashell"
            :title="`${ $t('buttons.article_preview') }`"
            @click="goToArticlePreview"
            size="14"
          >
            <EyeIcon/>
          </SampleButton>
          <SampleButton
            icon="bookmark"
            color="seashell"
            :title="`${ $t('buttons.save_as_draft') }`"
            size="14"
          >
            <BookSquareIcon/>
          </SampleButton>
        </div>
      </section>
      <aside>
        <section class="choose-article_category-section">
          <h3>{{ $t('labels.choose_article_category') }}:</h3>

          <div class="custom-dropdown">
            <div class="dropdown-toggle" @click="toggleDropdown">
              {{ selectedOption || placeholder }}
              <ArrowDownIcon/>
            </div>
            <ul v-show="isOpen" class="dropdown-list">
              <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
                {{ option }}
              </li>
            </ul>
          </div>
        </section>
        <section class="tags-section">
          <h3>{{ $t('labels.tags') }}</h3>
          <SampleInput/>
        </section>
        <section class="article-cover_section">
          <h3>{{ $t('labels.article_cover') }}</h3>
          <div class="upload-image">
            <GalleryAddIcon/>
            <div class="upload-image__left-side">
              <span class="upload-image__title">{{ $t('buttons.image_upload.title') }}</span>
              <span class="upload-image__subtitle">{{ $t('buttons.image_upload.subtitle') }}</span>
            </div>
          </div>
        </section>
      </aside>
    </div>
    <section class="bottom-buttons">
      <SampleButton color="primary" :title="`${ $t('buttons.publish') }`"/>
      <SampleButton color="alto-first" :title="`${ $t('buttons.delete') }`"/>
    </section>
  </div>
</template>

<script>
import ArrowDownIcon from '../icons/ArrowDownIcon.vue'
import GalleryAddIcon from '../icons/GalleryAddIcon.vue'
import SampleInput from '../ui/Fields/SampleInput.vue'
import { QuillEditor } from '@vueup/vue-quill'
import 'quill/dist/quill.snow.css'
import EditorQuoteIcon from '@/components/icons/quill-editor-icons/EditorQuoteIcon.vue'
import QuoteIcon from '@/components/icons/quill-editor-icons/QuoteIcon.vue'
import HeadingIcon from '@/components/icons/quill-editor-icons/HeadingIcon.vue'
import GalleryAddEditorIcon from '@/components/icons/quill-editor-icons/GallerAddIcon.vue'
import LinkIcon from '@/components/icons/quill-editor-icons/LinkIcon.vue'
import TaskIcon from '@/components/icons/quill-editor-icons/TaskIcon.vue'
import DividerIcon from '@/components/icons/quill-editor-icons/DividerIcon.vue'
import AudioIcon from '@/components/icons/quill-editor-icons/AudioIcon.vue'
import ChartIcon from '@/components/icons/quill-editor-icons/ChartIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import BookSquareIcon from '@/components/icons/quill-editor-icons/BookSquareIcon.vue'
import CloseToolEditorIcon from '@/components/icons/quill-editor-icons/CloseToolEditorIcon.vue'
import InsetIcon from '@/components/icons/quill-editor-icons/InsetIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import BigDividerIcon from '@/components/icons/quill-editor-icons/BigDividerIcon.vue'

export default {
  components: {
    BigDividerIcon,
    SmallVideoPlayIcon,
    RemoveIcon,
    InsetIcon,
    CloseToolEditorIcon,
    BookSquareIcon,
    EyeIcon,
    SampleButton,
    ChartIcon,
    AudioIcon,
    DividerIcon,
    TaskIcon,
    LinkIcon,
    HeadingIcon,
    EditorQuoteIcon,
    QuoteIcon,
    QuillEditor,
    SampleInput,
    GalleryAddIcon,
    ArrowDownIcon,
    GalleryAddEditorIcon
  },
  data() {
    return {
      pollActive: false,
      editorAudioActive: false,
      editorDividerActive: false,
      editorBlockquoteActive: true,
      pollTitle: '',
      pollOption1: '',
      pollOption2: '',
      isOpen: false,
      selectedOption: null,
      options: ['Образование', 'Наука', 'Религия'],
      placeholder: 'Выберите опцию',
      content: '',
      editorOption: {
        debug: false,
        readOnly: false,
        theme: 'snow'
      },
      delta: undefined,
      showEditor: true,
      selectedAudioFileName: null,
      pollOptions: [],
      audioTitle: '',
      audioTime: ''
    }
  },
  computed: {
    placeholderText() {
      return this.$i18n.t('labels.articles.editor.placeholder')
    }
  },
  watch: {
    content(value) {
      this.delta = this.$refs.myQuillEditor.quill.getContents()
      console.log(this.delta)
    }
  },
  methods: {
    goToArticlePreview() {
      const articleId = 1
      this.$router.push({ name: 'preview-article', params: { id: articleId } })
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.selectedOption = option
      this.isOpen = false
    },
    showEditorModal() {
      this.showEditor = !this.showEditor
    },
    closeToolWindow() {
      console.log('test')
      this.showEditor = false
    },
    toggleInset() {
      const el = document.querySelector('.ql-editor > p')
      if (el) {
        el.style.color = el.style.color === 'rgb(31, 31, 31)' ? 'initial' : 'rgb(31, 31, 31)'
        el.style.backgroundColor = el.style.backgroundColor === 'rgb(241, 241, 241)' ? 'initial' : 'rgb(241, 241, 241)'
        el.style.borderRadius = el.style.borderRadius === '10px' ? null : '10px'
        el.style.padding = el.style.padding === '15px' ? null : '15px'
        el.style.fontSize = el.style.fontSize === '18px' ? null : '18px'
      }
    },
    toggleQuote() {
      this.editorBlockquoteActive = true
    },
    openFilePicker() {
      this.$refs.fileInput.click()
    },
    getAudioDuration(file) {
      return new Promise((resolve) => {
        const audio = new Audio(URL.createObjectURL(file))
        audio.addEventListener('loadedmetadata', () => {
          resolve(audio.duration)
        })
      })
    },
    togglePoll() {
      this.pollActive = !this.pollActive
      if (!this.pollActive) {
        this.pollTitle = ''
        this.pollOptions = []
      }
    },
    addOption() {
      this.pollOptions.push('')
    },
    removeOption(index) {
      this.pollOptions.splice(index, 1)
    },
    async handleFileSelect(event) {
      this.editorAudioActive = !this.editorAudioActive
      const file = event.target.files[0]
      if (file) {
        const audioName = file.name
        const audioDuration = await this.getAudioDuration(file)
        const formattedDuration = this.formatTime(audioDuration)
        this.audioTitle = audioName
        this.audioTime = formattedDuration
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.round(seconds % 60)
      const formattedMinutes = String(minutes).padStart(2, '0')
      const formattedSeconds = String(remainingSeconds).padStart(2, '0')
      return `${formattedMinutes}:${formattedSeconds}`
    },
    addDivider() {
      this.editorDividerActive = true
    }
  }
}
</script>

<style lang="scss">
.editor-blockquote {
  display: flex;
  border-radius: 8px;
  padding: 15px 0;

  svg {
    margin-top: 4px;
    min-width: 16px;
  }

  .quote {
    font-size: 16px;
    margin: 0;
    padding: 0 10px;
    line-height: normal;
  }
}

.editor-divider {
  display: flex;
  justify-content: center;
}

.editor-audio {
  display: flex;
  z-index: 120;
  background-color: var(--color-seashell);
  border-radius: 14px;
  padding: 12px;
  gap: 8px;
  max-width: 345px;

  &__play-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-hippie-blue);
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;

    span {
      font-size: 14px;
      color: var(--color-mine-shaft);
      font-weight: 600;
      line-height: 1;
    }

    small {
      font-size: 12px;
      line-height: 1;
    }
  }
}

.editor-poll {
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    border: none;
    background-color: var(--color-seashell);
    padding: 16px;
    border-radius: 10px;
    font-size: 16px;
    width: 80%;
  }

  .add-item__poll {
    border: none;
    cursor: pointer;
    padding: 12px;
    font-size: 16px;
    border-radius: 10px;
    width: 180px;

    &:hover {
      background-color: var(--color-silver-chalice);
      color: var(--color-white);
      transition: all .15s ease-in-out;
    }
  }
}

.poll-item__block {
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;

  .poll-item__counter {
    position: absolute;
    left: -15px;
  }
}

.remove-item__poll {
  background-color: var(--color-silver-chalice);
  border-radius: 50%;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-secondary);
    transition: all .15s ease-in-out;
  }

  svg {
    width: 16px;
    height: 16px;
    color: var(--color-mine-shaft);
  }
}

.tool-block {
  display: flex;
  position: absolute;
  left: 15px;
  gap: 6px;

  .btn_none {
    cursor: pointer;
    padding: 0 !important;
    padding-top: 6px !important;
    height: 100%;
  }
}

.editor-bottom__buttons {
  display: flex;
  gap: 12px;

  button {
    height: 40px;
    gap: 6px;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background-color: var(--color-alto-second);
      transition: all .15s ease-in-out;
    }
  }
}

.bottom-buttons {
  display: flex;
  width: 100%;
  gap: 12px;

  button {
    width: 162px;
    height: 40px;
    display: flex;
    justify-content: center;
  }
}

.choose-tool__button {
  color: var(--color-secondary);
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}

.ql-editor {
  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 0;
      padding: 5px;
      position: relative;
      font-size: 18px;

      &:before {
        content: '\2022';
        color: var(--color-hippie-blue);
        font-size: 34px;
        margin-right: 5px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  &.ql-blank::before {
    font-size: 16px;
    font-style: normal;
  }
}

.ql-toolbar.ql-snow {
  display: flex;
  flex-direction: column;
  background: var(--White, #FFF);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  width: 266px;
  border: none;
  padding: 4px;
  z-index: 10;
  border-radius: 10px;

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: auto;
    padding: 12px;
    border-radius: 10px;

    span {
      color: var(--color-mine-shaft);
      font-size: 16px;
      font-weight: 400;
      font-family: 'HelveticaNeueCyr', sans-serif;
    }

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover {
      background-color: var(--color-seashell);
      transition: all .15s ease-in-out;
    }
  }
}

.ql-container.ql-snow {
  border: none;
  height: auto;
}

.custom-dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  padding: 10px;
  background-color: var(--color-seashell);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.dropdown-list {
  width: 100%;
  background-color: var(--color-white);
  list-style-type: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.dropdown-list li {
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: var(--color-seashell);
    transition: all 0.15s ease-in-out;
  }
}

.main-tools__block {
  display: flex;
  gap: 16px;
}

.create-article__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-container__article {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 32px 40px;
  max-width: 700px;
  height: 720px;
  position: relative;

  .article-title__input {
    all: unset;
    font-size: 28px;
    width: 100%;

    &::placeholder {
      color: var(--color-alto-first);
    }
  }
}

aside {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 400px;
}

.choose-article_category-section,
.tags-section,
.article-cover_section {
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  user-select: none;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
  }
}

.upload-image {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 200px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23b0b0b0' stroke-width='5' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 10px;
  color: var(--color-silver-chalice);
  cursor: pointer;
  user-select: none;

  svg {
    width: 40px;
    height: 40px;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
  }

  &__subtitle {
    font-size: 14px;
    font-weight: 400;
  }

  &__left-side {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 576px) {
  .choose-tool__button {
    font-size: 16px;
  }

  .tools-block {
    display: flex;
    flex-direction: column-reverse;
  }
  #custom-toolbar {
    display: flex;
    flex-direction: row;
    overflow-x: auto;

    button {
      span {
        display: none;
      }
    }
  }

  .tool-block {
    flex-direction: row-reverse;
  }

  .editor-poll {
    input {
      width: 100%;
    }
  }

  .create-article__container {
    flex-direction: column;
    margin-top: 65px;
  }

  .main-tools__block {
    display: flex;
    flex-direction: column;
  }

  .editor-bottom__buttons {
    justify-content: center;

    button {
      font-size: 14px;
    }
  }

  aside {
    background-color: var(--color-white);
    box-shadow: 10px 0 40px 0 rgba(108, 108, 108, 0.15);
    order: 1;
    border-radius: 20px 20px 0 0;
    gap: 20px;
    width: 100%;
    padding: 20px 0;

    .choose-article_category-section,
    .tags-section,
    .article-cover_section {
      background-color: unset;
      padding: 0 24px;
    }
  }

  .main-container__article {
    order: 2;
    width: auto;
    height: 500px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 20px 18px;
    z-index: 100;
    position: relative;
  }

  .article-cover_section {
    order: 1;
  }

  .choose-article_category-section {
    order: 2;
  }

  .tags-section {
    order: 3;
  }

  .upload-image {
    flex-direction: row;
    height: 100%;
    background-image: none;
    border: 2px solid var(--color-seashell);
    padding: 12px 10px;

    &__title {
      font-size: 14px;
    }

    &__subtitle {
      font-size: 12px;
    }

    &__left-side {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

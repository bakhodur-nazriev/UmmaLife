<template>
  <div class="create-article__container">
    <section class="main-container__article">
      <input class="article-title__input" type="text" :placeholder="$t('placeholders.article_title')">
    </section>
    <aside>
      <section class="choose-article_category-section">
        <h3>{{ $t('labels.choose_article_category') }}:</h3>

        <div class="custom-dropdown">
          <div class="dropdown-toggle" @click="toggleDropdown">
            {{ selectedOption || placeholder }}
            <ArrowDownIcon />
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
        <SampleInput />
      </section>
      <section class="article-cover_section">
        <h3>{{ $t('labels.article_cover') }}</h3>
        <div class="updload-image">
          <GalleryAddIcon />
          <span class="updload-image__title">{{ $t('buttons.image_updload.title') }}</span>
          <span class="updload-image__subtitle">{{ $t('buttons.image_updload.subtitle') }}</span>
        </div>
      </section>
    </aside>
  </div>
</template>

<script>
import ArrowDownIcon from '../icons/ArrowDownIcon.vue'
import GalleryAddIcon from '../icons/GalleryAddIcon.vue'
import SampleInput from '../ui/Fields/SampleInput.vue'

export default {
  components: {
    SampleInput,
    GalleryAddIcon,
    ArrowDownIcon
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
      options: ['Образование', 'Наука', 'Религия'],
      placeholder: 'Выберите опцию'
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.selectedOption = option
      this.isOpen = false
    }
  }
}
</script>

<style scoped lang="scss">
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
  background-color: #fff;
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

.create-article__container {
  display: flex;
  gap: 16px;
}

.main-container__article {
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 32px 40px;
  width: 700px;

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

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
  }
}

.updload-image {
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
}
</style>

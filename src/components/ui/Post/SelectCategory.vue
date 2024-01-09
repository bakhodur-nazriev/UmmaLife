<template>
  <div class="category">
    <button type="button" class="category__toggle" @click="toggleDropdown">
      <ChooseCategoryIcon/>
      <span>{{ $t('buttons.category') }}</span>
    </button>

    <Transition name="fade">
      <ul v-if="isToggleOpen" class="category-list">
        <li
          class="category-list__item"
          v-for="(item, i) in categoryItems"
          :key="i"
          @click="toggleCategory(item)"
          :class="{ 'interest-selected': isSelected(item) }"
        >
          {{ item.description }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import ChooseCategoryIcon from "@/components/icons/shorts/ChooseCategoryIcon.vue";
import {getFormData} from "@/utils";
import i18n from "@/i18n";
import {onMounted, ref} from "vue";
import axios from "axios";

const locale = i18n.global.locale

const isToggleOpen = ref(false)

const toggleDropdown = () => {
  isToggleOpen.value = !isToggleOpen.value
}

const languageMap = {
  "en": "english",
  "ar": "arabic",
  "ru": "russian",
  "id": "indonesian",
  "ms": "malay",
  "tr": "turkish",
  "uz": "uzbek",
  "tj": "tajik",
  "tab": "tabasaran",
  "cv": "chuvash",
  "ur": "urdu",
  "inh": "ingush",
  "tt": "tatar",
  "lak": "lak",
  "kum": "qumuq",
  "krc": "balkarian",
  "am": "amharic",
  "lez": "lezgin"
};

const getLanguageByLocale = (currentLocale) => {
  return languageMap[currentLocale] || '';
};

const categoryItems = ref([])
const selectedCategories = ref([])
const fetchCategories = async () => {
  const payload = getFormData({
    server_key: process.env.VUE_APP_SERVER_KEY,
    page: '',
    lang: getLanguageByLocale(locale)
  })

  const accessToken = localStorage.getItem('access_token')
  const params = {access_token: accessToken}

  try {
    const response = await axios.post('/categories', payload, {params})
    categoryItems.value = response.data.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
};

const toggleCategory = (category) => {
  if (isSelected(category)) {
    selectedCategories.value = selectedCategories.value.filter((c) => c !== category)
  } else if (selectedCategories.value.length < 5) {
    selectedCategories.value.push(category)
  }
}

const isSelected = (category) => {
  return selectedCategories.value.includes(category)
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped lang="scss">
.fade-enter-active {
  animation: scale-up-top-left 0.2s;
}

.fade-leave-active {
  animation: scale-up-top-left 0.2s reverse;
}

//.scale-up-top-left {
//  animation: scale-up-top-left 0.5s;
//}


@keyframes scale-up-top-left {
  0% {
    transform: scale(0.5);
    transform-origin: top left;
  }
  100% {
    transform: scale(1);
    transform-origin: top left;
  }
}

.access-item__divider {
  width: 92%;
  margin: 2px auto;
}

.access__icon {
  color: var(--color-silver-chalice);
}

.left__side--item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.category {
  border-radius: 10px;
  position: relative;
  background-color: var(--color-seashell);
  z-index: 10;

  &-list {
    list-style: none;
    margin: 0;
    font-size: 14px;
    padding: 12px;
    border-radius: 10px;
    position: absolute;
    top: 50px;
    z-index: 10;
    width: 516px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    background-color: var(--color-white);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);

    &__item {
      border-radius: 8px;
      padding: 9px 16px;
      background-color: var(--color-seashell);
      font-size: 14px;
      cursor: pointer;
      line-height: normal;
      border: 1px solid var(--color-seashell);

      &:hover {
        transition: all 0.2s ease-in-out;
        border: 1px solid var(--color-hippie-blue);
      }
    }
  }

  &__toggle {
    border: none;
    font-size: 14px;
    display: flex;
    gap: 8px;
    color: var(--color-mine-shaft);
    justify-content: center;
    align-items: center;
    width: max-content;
    cursor: pointer;
    margin: 0;
    user-select: none;
    border-radius: 10px;
    height: 40px;
    padding: 0 12px;

    .access__icon {
      width: 20px;
      height: 20px;
    }

    svg {
      color: var(--color-mine-shaft);
      width: 20px;
      height: 20px
    }
  }
}

.interest-selected {
  background-color: var(--color-hippie-blue);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-deep-cerulean);
    color: var(--color-white);
    transition: all 0.2s ease-in-out;
  }
}
</style>

<template>
  <div class="muvi__profile">
    <div class="muvi__profile--top">
      <img src="/images/users/jeff.png" alt="jeff" class="muvi__profile--img" />
      <div class="muvi__profile--info">
        <div class="muvi__profile--name">Ibragim Ibragimov</div>
        <ul class="muvi__profile--list">
          <li>
            <p>{{ shortNum(13) }}</p>
            <span>MUVI</span>
          </li>
          <li>
            <p>{{ shortNum(252000) }}</p>
            <span>views</span>
          </li>
          <li>
            <p>{{ shortNum(45200) }}</p>
            <span>reactions</span>
          </li>
          <li>
            <p>{{ shortNum(210) }}</p>
            <span>followers</span>
          </li>
        </ul>
      </div>
    </div>
    <MuviTabSwitch
      :tabs="tabs"
      :activeIndex="activeIndex"
      @handleTabClick="handleTabClick"
      class="muvi__profile--tab"
    />
    <div class="muvi__wrapper" v-if="activeIndex === 0">
      <MuviCard
        v-for="muvi in likedMovies"
        :key="muvi.id"
        :muvi="muvi"
        @cardClickHandler="isDetailOpen = true"
      />
    </div>
    <div class="muvi__wrapper" v-else-if="activeIndex === 1">
      <MuviCard
        v-for="muvi in viewedMovies"
        :key="muvi.id"
        :muvi="muvi"
        @cardClickHandler="isDetailOpen = true"
      />
    </div>
  </div>
  <teleport to="body">
    <MuviDetailSlider v-if="isDetailOpen" @handleClickOutside="isDetailOpen = false" />
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { muvies as allMuvies } from '@/dummy.js'
import shortNum from 'number-shortener'
import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviTabSwitch from '@/components/muvi/MuviTabSwitch.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'

const isDetailOpen = ref(false)
const likedMovies = computed(() => allMuvies.slice(0, 6))
const viewedMovies = computed(() => allMuvies.slice(6, 12))

const activeIndex = ref(0)

const tabs = ref(['My MUVI', 'Saved'])

const handleTabClick = (index) => {
  activeIndex.value = index
}
</script>

<style lang="scss" scoped>
.muvi__profile {
  &--tab {
    margin: 0 0 28px !important;
  }
  &--top {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 28px;
  }
  &--img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  &--name {
    font-size: 24px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 24px;
  }
  &--list {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 40px;
      &:first-child {
        padding-left: 0;
      }
      &:not(:last-child) {
        border-right: 1px solid var(--color-alto-first);
      }
      p {
        margin: 0 0 8px;
        padding: 0;
        font-size: 20px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      span {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-gray);
      }
    }
  }
}
</style>

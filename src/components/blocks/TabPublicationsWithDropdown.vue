<template>
  <div class="publication__main--block">
    <div class="publication-tabs__section">
      <ul class="tab-list">
        <li
          class="tab-list__item"
          v-for="(title, i) in tabLabels"
          :key="i"
          :class="{ 'active' : i === activeTab }"
          @click="setActiveTab(i)"
        >
          {{ title }}
          <CheckMarkSmallIcon v-if="i === activeTab"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    setActiveTab (index) {
      this.activeTab = index
    }
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 576px) {
  .publication__main--block {
    display: flex;
    position: relative;

    .publication-tabs__section {
      background-color: var(--color-white);
      display: flex;
      position: absolute;
      gap: 10px;
      left: 0;
      top: 0;
      padding: 15px 30px;
      width: 100%;
      z-index: 20;

      .tab-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;

        &__item {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        .active {
          color: var(--color-hippie-blue);
          transition: 0.3s;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .main__publications--section {
    width: 100%
  }

  .publication__main--block {
    display: none;
  }
}

@media (min-width: 1280px) {
  .main__publications--section {
    width: 700px;
  }
}

@media (min-width: 1920px) {
  .main__publications--section {
    width: 700px;
  }
}
</style>

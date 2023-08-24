<template>
  <div class="analitics">
    <div class="analitics__top">
      <div class="analitics__top--title">Всего участников <span>3</span></div>
      <BaseCustomSelect
        :options="['На этой неделе', 'На этой неделе', 'На этой неделе']"
        default="На этой неделе"
        class="analitics__top--select"
      />
    </div>
    <div class="analitics__chart">
      <Bar :data="data" :options="options" />
    </div>
  </div>
</template>

<script>
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from '@/chartConfig.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  components: { BaseCustomSelect, Bar },
  data() {
    return chartConfig
  }
}
</script>

<style lang="scss" scoped>
.analitics {
  background-color: var(--color-white);
  padding: 24px;
  border-radius: 20px;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--color-gallery-first);
    margin-bottom: 20px;
    &--title {
      font-size: 18px;
      font-style: normal;
      font-weight: 550;
      line-height: 150%;
      color: var(--color-mine-shaft);
      display: flex;
      gap: 16px;
      span {
        color: var(--color-silver-chalice);
      }
    }
    &--select {
      max-width: 173px;
    }
  }
  &__chart {
    min-height: 500px;
  }
}
</style>

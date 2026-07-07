<script setup lang="ts">
import { computed, toRef } from 'vue';

import { useEChart } from './useEChart';

import type { BaseChartProps } from './types';

const props = withDefaults(defineProps<BaseChartProps>(), {
  loading: false,
  empty: false,
  height: '260px',
  ariaLabel: '数据图表',
});

const optionRef = toRef(props, 'option');
const loadingRef = toRef(props, 'loading');
const { setContainer } = useEChart(optionRef, loadingRef);

const chartStyle = computed(() => ({
  minHeight: props.height,
}));
</script>

<template>
  <div class="base-chart" data-testid="base-chart" :style="chartStyle">
    <div v-if="loading" class="loading-state">图表加载中</div>
    <div v-else-if="empty" class="empty-state">暂无可视化数据</div>
    <div
      v-else
      :ref="setContainer"
      class="base-chart__canvas"
      role="img"
      :aria-label="ariaLabel"
    />
  </div>
</template>

<style scoped lang="scss">
.base-chart {
  position: relative;
  width: 100%;
  min-height: 220px;
}

.base-chart__canvas {
  position: absolute;
  inset: 0;
}
</style>

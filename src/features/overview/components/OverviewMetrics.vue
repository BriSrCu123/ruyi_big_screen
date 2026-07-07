<script setup lang="ts">
import MetricCard from '@/widgets/MetricCard/MetricCard.vue';

import { useOverviewMetrics } from '../composables/useOverviewMetrics';

import { formatMetricValue } from './metricFormatter';

const { metrics, status, errorMessage } = useOverviewMetrics();
</script>

<template>
  <section class="overview-metrics" data-testid="overview-metrics">
    <div v-if="status === 'loading'" class="loading-state">指标加载中</div>
    <div v-else-if="status === 'error'" class="error-state">{{ errorMessage }}</div>
    <div v-else-if="metrics.length === 0" class="empty-state">暂无指标数据</div>
    <div v-else class="overview-metrics__grid">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.id"
        :label="metric.label"
        :value="formatMetricValue(metric)"
        :unit="metric.unit"
        :trend-value="metric.trendValue"
        :trend-label="metric.trendLabel"
        :trend-direction="metric.trendDirection"
        :accent="metric.accent"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.overview-metrics {
  min-height: 236px;
}

.overview-metrics__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
</style>

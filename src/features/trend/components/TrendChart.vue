<script setup lang="ts">
import { computed } from 'vue';

import BaseChart from '@/widgets/BaseChart/BaseChart.vue';
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useTrendData } from '../composables/useTrendData';

const { points, option, status, errorMessage } = useTrendData();

const loading = computed(() => status.value === 'loading');
const empty = computed(() => status.value === 'success' && points.value.length === 0);
</script>

<template>
  <ScreenPanel title="实时趋势" subtitle="最近 12 小时访问、订单与交易态势">
    <template #extra>
      <span class="trend-live"><i /> 实时刷新</span>
    </template>
    <div v-if="status === 'error'" class="error-state">{{ errorMessage }}</div>
    <div v-else data-testid="trend-panel">
      <BaseChart
        :option="option"
        :loading="loading"
        :empty="empty"
        height="210px"
        aria-label="最近十二小时趋势折线图"
      />
    </div>
  </ScreenPanel>
</template>

<style scoped lang="scss">
.trend-live {
  display: inline-flex;
  align-items: center;
  color: var(--color-success);
  font-size: 12px;
  gap: 6px;
}

.trend-live i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentcolor;
  box-shadow: 0 0 12px currentcolor;
}
</style>

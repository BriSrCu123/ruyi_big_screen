<script setup lang="ts">
import BaseChart from '@/widgets/BaseChart/BaseChart.vue';
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useRegionRanking } from '../composables/useRegionRanking';

const { ranking, status, errorMessage, option } = useRegionRanking();
</script>

<template>
  <ScreenPanel title="区域业务量分布" subtitle="按城市聚合的实时业务规模">
    <div v-if="status === 'error'" class="error-state">{{ errorMessage }}</div>
    <BaseChart
      v-else
      :option="option"
      :loading="status === 'loading'"
      :empty="status === 'success' && ranking.length === 0"
      height="224px"
      aria-label="区域业务量排行柱状图"
    />
  </ScreenPanel>
</template>

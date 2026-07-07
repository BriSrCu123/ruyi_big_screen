<script setup lang="ts">
import BaseChart from '@/widgets/BaseChart/BaseChart.vue';
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useBusinessDistribution } from '../composables/useBusinessDistribution';

const { distribution, status, errorMessage, option } = useBusinessDistribution();
</script>

<template>
  <ScreenPanel title="业务类型占比" subtitle="实时交易结构分布">
    <div v-if="status === 'error'" class="error-state">{{ errorMessage }}</div>
    <BaseChart
      v-else
      :option="option"
      :loading="status === 'loading'"
      :empty="status === 'success' && distribution.length === 0"
      height="224px"
      aria-label="业务类型占比环图"
    />
  </ScreenPanel>
</template>

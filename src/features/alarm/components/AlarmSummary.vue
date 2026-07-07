<script setup lang="ts">
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useRealtimeAlarms } from '../composables/useRealtimeAlarms';

const { summary, status } = useRealtimeAlarms();
</script>

<template>
  <ScreenPanel title="告警摘要" subtitle="风险事件分级统计">
    <div v-if="status === 'loading'" class="loading-state">告警摘要加载中</div>
    <div v-else class="alarm-summary">
      <div class="alarm-summary__item alarm-summary__item--critical">
        <span>严重</span>
        <strong>{{ summary.critical }}</strong>
      </div>
      <div class="alarm-summary__item alarm-summary__item--warning">
        <span>警告</span>
        <strong>{{ summary.warning }}</strong>
      </div>
      <div class="alarm-summary__item alarm-summary__item--info">
        <span>提示</span>
        <strong>{{ summary.info }}</strong>
      </div>
    </div>
  </ScreenPanel>
</template>

<style scoped lang="scss">
.alarm-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.alarm-summary__item {
  min-height: 82px;
  padding: 12px;
  border: 1px solid rgb(255 255 255 / 0.08);
  border-radius: 8px;
  background: rgb(255 255 255 / 0.035);
}

.alarm-summary__item span {
  color: var(--color-text-muted);
  font-size: 13px;
}

.alarm-summary__item strong {
  display: block;
  margin-top: 10px;
  font-size: 30px;
  line-height: 1;
}

.alarm-summary__item--critical strong {
  color: var(--color-danger);
}

.alarm-summary__item--warning strong {
  color: var(--color-warning);
}

.alarm-summary__item--info strong {
  color: var(--color-info);
}
</style>

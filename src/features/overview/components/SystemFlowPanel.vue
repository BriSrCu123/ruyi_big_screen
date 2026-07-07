<script setup lang="ts">
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useOperationSummary } from '../composables/useOperationSummary';

const { summary, status } = useOperationSummary();
</script>

<template>
  <ScreenPanel title="系统运行日志" subtitle="关键流程与自动化调度摘要">
    <div v-if="status === 'loading'" class="loading-state">日志加载中</div>
    <div v-else-if="!summary" class="empty-state">暂无运行日志</div>
    <ol v-else class="system-flow">
      <li v-for="log in summary.logs" :key="log.id" :class="`system-flow__item--${log.level}`">
        <time>{{ log.time }}</time>
        <span>{{ log.message }}</span>
      </li>
    </ol>
  </ScreenPanel>
</template>

<style scoped lang="scss">
.system-flow {
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 10px;
}

.system-flow li {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  min-height: 34px;
  padding: 8px 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  border-radius: 8px;
  background: rgb(255 255 255 / 0.035);
  gap: 12px;
}

.system-flow time {
  color: var(--color-accent);
  font-size: 12px;
}

.system-flow span {
  overflow: hidden;
  color: var(--color-text);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.system-flow__item--warning {
  border-color: rgb(243 201 105 / 0.3);
}

.system-flow__item--danger {
  border-color: rgb(255 102 120 / 0.35);
}
</style>

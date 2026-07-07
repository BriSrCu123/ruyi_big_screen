<script setup lang="ts">
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useRealtimeAlarms } from '../composables/useRealtimeAlarms';

import type { AlarmLevel, AlarmStatus } from '../types';

const { alarms, status, errorMessage } = useRealtimeAlarms();

const levelLabel: Record<AlarmLevel, string> = {
  critical: '严重',
  warning: '警告',
  info: '提示',
};

const statusLabel: Record<AlarmStatus, string> = {
  processing: '处理中',
  confirmed: '已确认',
  resolved: '已恢复',
};
</script>

<template>
  <ScreenPanel title="实时告警列表" subtitle="来自门店、网关与交易链路的告警">
    <div v-if="status === 'loading'" class="loading-state">告警加载中</div>
    <div v-else-if="status === 'error'" class="error-state">{{ errorMessage }}</div>
    <div v-else-if="alarms.length === 0" class="empty-state">暂无实时告警</div>
    <ul v-else class="alarm-list" data-testid="alarm-list">
      <li v-for="alarm in alarms" :key="alarm.id" :class="`alarm-list__item--${alarm.level}`">
        <span class="alarm-list__level">{{ levelLabel[alarm.level] }}</span>
        <time>{{ alarm.time }}</time>
        <strong>{{ alarm.source }}</strong>
        <p>{{ alarm.message }}</p>
        <em>{{ statusLabel[alarm.status] }}</em>
      </li>
    </ul>
  </ScreenPanel>
</template>

<style scoped lang="scss">
.alarm-list {
  display: grid;
  height: 100%;
  max-height: none;
  padding: 0;
  padding-right: 4px;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
  overscroll-behavior: contain;
  scrollbar-color: rgb(57 217 200 / 0.45) rgb(255 255 255 / 0.06);
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  gap: 10px;
}

.alarm-list::-webkit-scrollbar {
  width: 6px;
}

.alarm-list::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgb(255 255 255 / 0.06);
}

.alarm-list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: linear-gradient(180deg, var(--color-primary), var(--color-accent));
}

.alarm-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--color-accent), var(--color-primary));
}

.alarm-list li {
  display: grid;
  grid-template-columns: 42px 62px minmax(0, 1fr) 56px;
  padding: 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  border-left: 3px solid var(--color-info);
  border-radius: 8px;
  background: rgb(255 255 255 / 0.035);
  transform: translateZ(0);
  gap: 6px 8px;
}

.alarm-list__item--critical {
  border-left-color: var(--color-danger);
}

.alarm-list__item--warning {
  border-left-color: var(--color-warning);
}

.alarm-list__item--info {
  border-left-color: var(--color-info);
}

.alarm-list__level,
.alarm-list em {
  font-size: 12px;
  font-style: normal;
}

.alarm-list__level {
  color: var(--color-warning);
}

.alarm-list time {
  color: var(--color-text-muted);
  font-size: 12px;
}

.alarm-list strong {
  overflow: hidden;
  color: var(--color-text);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.alarm-list em {
  color: var(--color-primary);
  text-align: right;
}

.alarm-list p {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 12px;
}
</style>

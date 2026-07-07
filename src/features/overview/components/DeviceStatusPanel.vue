<script setup lang="ts">
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useOperationSummary } from '../composables/useOperationSummary';

const { summary, status } = useOperationSummary();
</script>

<template>
  <ScreenPanel title="设备在线状态" subtitle="边缘节点健康概览">
    <div v-if="status === 'loading'" class="loading-state">设备状态加载中</div>
    <div v-else-if="!summary" class="empty-state">暂无设备数据</div>
    <div v-else class="device-status">
      <div class="device-status__gauge">
        <span>{{ summary.onlineRate.toFixed(1) }}%</span>
        <small>在线率</small>
      </div>
      <div class="device-status__meta">
        <p>
          <span>总设备</span>
          <strong>{{ summary.deviceTotal.toLocaleString('zh-CN') }}</strong>
        </p>
        <p>
          <span>覆盖城市</span>
          <strong>{{ summary.cityCount }}</strong>
        </p>
        <p>
          <span>运营门店</span>
          <strong>{{ summary.storeCount.toLocaleString('zh-CN') }}</strong>
        </p>
      </div>
    </div>
  </ScreenPanel>
</template>

<style scoped lang="scss">
.device-status {
  display: grid;
  grid-template-columns: 136px minmax(0, 1fr);
  align-items: center;
  min-height: 154px;
  gap: 16px;
}

.device-status__gauge {
  position: relative;
  display: grid;
  width: 126px;
  height: 126px;
  place-items: center;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgb(16 21 32 / 0.92) 56%, transparent 57%),
    conic-gradient(var(--color-success) 0 98.7%, rgb(255 255 255 / 0.1) 98.7% 100%);
}

.device-status__gauge span {
  font-size: 28px;
  font-weight: 800;
}

.device-status__gauge small {
  position: absolute;
  bottom: 28px;
  color: var(--color-text-muted);
  font-size: 12px;
}

.device-status__meta {
  display: grid;
  gap: 9px;
}

.device-status__meta p {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 9px 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  border-radius: 8px;
  background: rgb(255 255 255 / 0.035);
}

.device-status__meta span {
  color: var(--color-text-muted);
  font-size: 12px;
}

.device-status__meta strong {
  font-size: 14px;
}
</style>

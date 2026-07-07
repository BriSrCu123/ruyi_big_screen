<script setup lang="ts">
import { computed } from 'vue';

import { useOperationSummary } from '@/features/overview/composables/useOperationSummary';
import { useClock } from '@/shared/composables/useClock';

const { displayTime } = useClock();
const { summary } = useOperationSummary();

const systemStatus = computed(() => {
  if (!summary.value) {
    return '初始化中';
  }

  return summary.value.onlineRate >= 98 ? '运行稳定' : '需关注';
});
</script>

<template>
  <header class="dashboard-header">
    <div class="dashboard-header__side">
      <span class="status-dot" />
      <span>系统状态：{{ systemStatus }}</span>
    </div>
    <div class="dashboard-header__brand">
      <p>RuyiBigScreen</p>
      <h1 data-testid="dashboard-title">如意数据大屏</h1>
    </div>
    <div class="dashboard-header__side dashboard-header__side--right">
      <span>{{ displayTime }}</span>
      <span>Mock API Ready</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.dashboard-header {
  display: grid;
  align-items: center;
  min-height: 82px;
  grid-template-columns: minmax(240px, 1fr) minmax(420px, 1.3fr) minmax(240px, 1fr);
  gap: 18px;
}

.dashboard-header__brand {
  position: relative;
  display: grid;
  justify-items: center;
  padding: 10px 24px 14px;
  border-bottom: 1px solid var(--color-border-strong);
}

.dashboard-header__brand::before,
.dashboard-header__brand::after {
  position: absolute;
  bottom: -1px;
  width: 90px;
  height: 1px;
  content: "";
  background: linear-gradient(90deg, transparent, var(--color-accent));
}

.dashboard-header__brand::before {
  right: 50%;
  transform: translateX(-160px);
}

.dashboard-header__brand::after {
  left: 50%;
  transform: translateX(160px) rotate(180deg);
}

.dashboard-header__brand p {
  margin: 0 0 4px;
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.dashboard-header__brand h1 {
  margin: 0;
  color: var(--color-text);
  font-size: 34px;
  font-weight: 900;
  line-height: 1.05;
  text-shadow: 0 0 20px rgb(57 217 200 / 0.35);
}

.dashboard-header__side {
  display: flex;
  align-items: center;
  min-width: 0;
  color: var(--color-text-muted);
  font-size: 14px;
  gap: 10px;
}

.dashboard-header__side--right {
  justify-content: flex-end;
}

.dashboard-header__side--right span:last-child {
  padding: 6px 10px;
  border: 1px solid rgb(84 214 129 / 0.3);
  border-radius: 999px;
  color: var(--color-success);
  background: rgb(84 214 129 / 0.08);
}
</style>

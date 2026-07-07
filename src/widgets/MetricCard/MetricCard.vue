<script setup lang="ts">
import type { MetricCardProps } from './types';

defineProps<MetricCardProps>();
</script>

<template>
  <article class="metric-card" :class="`metric-card--${accent}`" data-testid="metric-card">
    <div class="metric-card__label">{{ label }}</div>
    <div class="metric-card__value">
      <span>{{ value }}</span>
      <small>{{ unit }}</small>
    </div>
    <div class="metric-card__trend" :class="`metric-card__trend--${trendDirection}`">
      <span>{{ trendLabel }}</span>
      <strong>{{ trendDirection === 'down' ? '-' : '+' }}{{ trendValue.toFixed(1) }}%</strong>
    </div>
  </article>
</template>

<style scoped lang="scss">
.metric-card {
  position: relative;
  min-height: 112px;
  padding: 14px 14px 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.015)),
    var(--color-panel-strong);
}

.metric-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  content: "";
  background: var(--metric-accent, var(--color-primary));
  box-shadow: 0 0 16px var(--metric-accent, var(--color-primary));
}

.metric-card--cyan {
  --metric-accent: var(--chart-cyan);
}

.metric-card--gold {
  --metric-accent: var(--chart-gold);
}

.metric-card--green {
  --metric-accent: var(--chart-green);
}

.metric-card--rose {
  --metric-accent: var(--chart-rose);
}

.metric-card--blue {
  --metric-accent: var(--chart-blue);
}

.metric-card--violet {
  --metric-accent: var(--chart-violet);
}

.metric-card__label {
  color: var(--color-text-muted);
  font-size: 13px;
}

.metric-card__value {
  display: flex;
  align-items: baseline;
  margin-top: 10px;
  gap: 6px;
}

.metric-card__value span {
  color: var(--color-text);
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
}

.metric-card__value small {
  color: var(--color-text-muted);
  font-size: 12px;
}

.metric-card__trend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  color: var(--color-text-muted);
  font-size: 12px;
}

.metric-card__trend strong {
  color: var(--color-success);
}

.metric-card__trend--down strong {
  color: var(--color-danger);
}

.metric-card__trend--stable strong {
  color: var(--color-warning);
}
</style>

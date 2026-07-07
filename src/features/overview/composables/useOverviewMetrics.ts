import { onBeforeUnmount, onMounted, ref } from 'vue';

import { logger } from '@/logs/logger';

import { fetchOverviewMetrics } from '../services/overview.service';

import type { OverviewMetric } from '../types';
import type { LoadStatus } from '@/shared/types/status';

const overviewLogger = logger.child('overview');

export function useOverviewMetrics() {
  const metrics = ref<OverviewMetric[]>([]);
  const baselineMetrics = ref<OverviewMetric[]>([]);
  const status = ref<LoadStatus>('idle');
  const errorMessage = ref('');
  let realtimeTimer: number | undefined;

  function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  function createRealtimeMetrics(): OverviewMetric[] {
    const elapsed = Date.now() / 1000;

    return baselineMetrics.value.map((metric, index) => {
      const wave = Math.sin(elapsed / 2.8 + index * 0.85) + Math.cos(elapsed / 5 + index);
      const ratio = 1 + wave * 0.004;
      const value =
        metric.formatter === 'percent'
          ? Number(clamp(metric.value + wave * 0.16, 0, 99.9).toFixed(1))
          : Math.round(metric.value * ratio);

      return {
        ...metric,
        value,
        trendValue: Number(clamp(metric.trendValue + wave * 0.18, 0.1, 32).toFixed(1)),
      };
    });
  }

  function stopRealtime(): void {
    if (realtimeTimer !== undefined) {
      window.clearInterval(realtimeTimer);
      realtimeTimer = undefined;
    }
  }

  function startRealtime(): void {
    stopRealtime();
    realtimeTimer = window.setInterval(() => {
      metrics.value = createRealtimeMetrics();
    }, 2400);
  }

  async function load(): Promise<void> {
    status.value = 'loading';
    errorMessage.value = '';

    try {
      baselineMetrics.value = await fetchOverviewMetrics();
      metrics.value = createRealtimeMetrics();
      status.value = 'success';
      overviewLogger.info('Overview metrics loaded', {
        count: metrics.value.length,
      });
      startRealtime();
    } catch (error: unknown) {
      status.value = 'error';
      errorMessage.value = '核心指标加载失败';
      overviewLogger.error('Overview metrics failed to load', { error });
    }
  }

  onMounted(() => {
    void load();
  });

  onBeforeUnmount(stopRealtime);

  return {
    metrics,
    status,
    errorMessage,
    reload: load,
  };
}

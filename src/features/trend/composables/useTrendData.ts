import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { logger } from '@/logs/logger';

import { createTrendOption } from '../services/trend.chart';
import { fetchTrendData } from '../services/trend.service';

import type { TrendPoint } from '../types';
import type { LoadStatus } from '@/shared/types/status';

const trendLogger = logger.child('trend');

export function useTrendData() {
  const points = ref<TrendPoint[]>([]);
  const status = ref<LoadStatus>('idle');
  const errorMessage = ref('');
  const option = computed(() => createTrendOption(points.value));
  let realtimeTimer: number | undefined;

  function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  function formatRealtimeLabel(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function pushRealtimePoint(): void {
    const lastPoint = points.value.at(-1);
    if (!lastPoint) {
      return;
    }

    const elapsed = Date.now() / 1000;
    const trafficWave = Math.sin(elapsed / 4) * 2600 + Math.cos(elapsed / 7) * 1800;
    const orderWave = Math.sin(elapsed / 5 + 1.4) * 220 + Math.cos(elapsed / 8) * 140;
    const amountWave = Math.sin(elapsed / 4.5 + 0.8) * 260000 + Math.cos(elapsed / 6) * 180000;

    const nextPoint: TrendPoint = {
      time: formatRealtimeLabel(new Date()),
      visitors: Math.round(clamp(lastPoint.visitors + trafficWave, 20_000, 128_000)),
      orders: Math.round(clamp(lastPoint.orders + orderWave, 1_800, 11_800)),
      transactionAmount: Math.round(
        clamp(lastPoint.transactionAmount + amountWave, 2_000_000, 14_800_000),
      ),
    };

    points.value = [...points.value.slice(-11), nextPoint];
  }

  function stopRealtime(): void {
    if (realtimeTimer !== undefined) {
      window.clearInterval(realtimeTimer);
      realtimeTimer = undefined;
    }
  }

  function startRealtime(): void {
    stopRealtime();
    realtimeTimer = window.setInterval(pushRealtimePoint, 3000);
  }

  async function load(): Promise<void> {
    status.value = 'loading';
    errorMessage.value = '';

    try {
      points.value = await fetchTrendData();
      status.value = 'success';
      trendLogger.info('Trend data loaded', {
        points: points.value.length,
      });
      startRealtime();
    } catch (error: unknown) {
      status.value = 'error';
      errorMessage.value = '趋势数据加载失败';
      trendLogger.error('Trend data failed to load', { error });
    }
  }

  onMounted(() => {
    void load();
  });

  onBeforeUnmount(stopRealtime);

  return {
    points,
    option,
    status,
    errorMessage,
    reload: load,
  };
}

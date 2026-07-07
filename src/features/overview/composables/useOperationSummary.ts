import { onBeforeUnmount, onMounted, ref } from 'vue';

import { logger } from '@/logs/logger';

import { fetchOperationSummary } from '../services/overview.service';

import type { OperationSummary } from '../types';
import type { LoadStatus } from '@/shared/types/status';

const operationLogger = logger.child('operation');

export function useOperationSummary() {
  const summary = ref<OperationSummary | null>(null);
  const baselineSummary = ref<OperationSummary | null>(null);
  const status = ref<LoadStatus>('idle');
  const errorMessage = ref('');
  let realtimeTimer: number | undefined;

  function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  function createRealtimeSummary(base: OperationSummary): OperationSummary {
    const elapsed = Date.now() / 1000;
    const nodePulse = base.nodes.map((node, index) => {
      const wave = Math.sin(elapsed / 3 + index * 0.78);

      return {
        ...node,
        health: Number(clamp(node.health + wave * 0.28, 90, 99.8).toFixed(1)),
        throughput: Math.round(node.throughput * (1 + wave * 0.012)),
      };
    });

    return {
      ...base,
      onlineRate: Number(clamp(base.onlineRate + Math.sin(elapsed / 4) * 0.08, 90, 99.9).toFixed(1)),
      transactionPulse: Math.round(clamp(base.transactionPulse + Math.cos(elapsed / 3) * 4, 40, 120)),
      nodes: nodePulse,
    };
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
      if (baselineSummary.value) {
        summary.value = createRealtimeSummary(baselineSummary.value);
      }
    }, 2600);
  }

  async function load(): Promise<void> {
    status.value = 'loading';
    errorMessage.value = '';

    try {
      baselineSummary.value = await fetchOperationSummary();
      summary.value = createRealtimeSummary(baselineSummary.value);
      status.value = 'success';
      operationLogger.info('Operation summary loaded', {
        nodes: summary.value.nodes.length,
      });
      startRealtime();
    } catch (error: unknown) {
      status.value = 'error';
      errorMessage.value = '综合态势加载失败';
      operationLogger.error('Operation summary failed to load', { error });
    }
  }

  onMounted(() => {
    void load();
  });

  onBeforeUnmount(stopRealtime);

  return {
    summary,
    status,
    errorMessage,
    reload: load,
  };
}

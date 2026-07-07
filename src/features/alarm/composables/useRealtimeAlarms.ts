import { computed, onMounted, ref } from 'vue';

import { logger } from '@/logs/logger';

import { createAlarmSummary, fetchRealtimeAlarms } from '../services/alarm.service';

import type { RealtimeAlarm } from '../types';
import type { LoadStatus } from '@/shared/types/status';

const alarmLogger = logger.child('alarm');

export function useRealtimeAlarms() {
  const alarms = ref<RealtimeAlarm[]>([]);
  const status = ref<LoadStatus>('idle');
  const errorMessage = ref('');
  const summary = computed(() => createAlarmSummary(alarms.value));

  async function load(): Promise<void> {
    status.value = 'loading';
    errorMessage.value = '';

    try {
      alarms.value = await fetchRealtimeAlarms();
      status.value = 'success';
      alarmLogger.info('Realtime alarms loaded', {
        count: alarms.value.length,
      });
    } catch (error: unknown) {
      status.value = 'error';
      errorMessage.value = '实时告警加载失败';
      alarmLogger.error('Realtime alarms failed to load', { error });
    }
  }

  onMounted(() => {
    void load();
  });

  return {
    alarms,
    summary,
    status,
    errorMessage,
    reload: load,
  };
}

import { dataProvider } from '@/services/data-provider';

import type { AlarmSummary, RealtimeAlarm } from '../types';
import type { RuyiDataProvider } from '@/services/data-provider';

export function createAlarmSummary(alarms: RealtimeAlarm[]): AlarmSummary {
  return alarms.reduce<AlarmSummary>(
    (summary, alarm) => {
      summary[alarm.level] += 1;
      return summary;
    },
    {
      critical: 0,
      warning: 0,
      info: 0,
    },
  );
}

export function fetchRealtimeAlarms(
  provider: RuyiDataProvider = dataProvider,
): Promise<RealtimeAlarm[]> {
  return provider.getRealtimeAlarms();
}

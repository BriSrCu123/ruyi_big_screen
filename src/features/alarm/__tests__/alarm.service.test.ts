import { describe, expect, it } from 'vitest';

import { createAlarmSummary } from '../services/alarm.service';

describe('createAlarmSummary', () => {
  it('counts alarm levels', () => {
    const summary = createAlarmSummary([
      {
        id: '1',
        level: 'critical',
        time: '10:00',
        source: 'A',
        message: 'critical',
        status: 'processing',
      },
      {
        id: '2',
        level: 'warning',
        time: '10:01',
        source: 'B',
        message: 'warning',
        status: 'confirmed',
      },
      {
        id: '3',
        level: 'warning',
        time: '10:02',
        source: 'C',
        message: 'warning',
        status: 'resolved',
      },
    ]);

    expect(summary).toEqual({
      critical: 1,
      warning: 2,
      info: 0,
    });
  });
});

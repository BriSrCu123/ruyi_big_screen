import { http, HttpResponse } from 'msw';

import { alarmFixture } from '@/mocks/fixtures/alarm.fixture';

export const alarmHandlers = [
  http.get('/api/alarms/realtime', () => HttpResponse.json(alarmFixture)),
];

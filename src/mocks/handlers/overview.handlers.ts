import { http, HttpResponse } from 'msw';

import { operationSummaryFixture, overviewMetricsFixture } from '@/mocks/fixtures/overview.fixture';

export const overviewHandlers = [
  http.get('/api/overview/metrics', () => HttpResponse.json(overviewMetricsFixture)),
  http.get('/api/operation/summary', () => HttpResponse.json(operationSummaryFixture)),
];

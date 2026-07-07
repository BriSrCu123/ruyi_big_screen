import { http, HttpResponse } from 'msw';

import { trendFixture } from '@/mocks/fixtures/trend.fixture';

export const trendHandlers = [
  http.get('/api/trend/hourly', () => HttpResponse.json(trendFixture)),
];

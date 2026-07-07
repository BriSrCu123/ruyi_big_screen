import { http, HttpResponse } from 'msw';

import { distributionFixture } from '@/mocks/fixtures/distribution.fixture';

export const distributionHandlers = [
  http.get('/api/distribution/business', () => HttpResponse.json(distributionFixture)),
];

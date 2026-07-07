import { http, HttpResponse } from 'msw';

import { rankingFixture } from '@/mocks/fixtures/ranking.fixture';

export const rankingHandlers = [
  http.get('/api/ranking/regions', () => HttpResponse.json(rankingFixture)),
];

import { alarmHandlers } from './alarm.handlers';
import { distributionHandlers } from './distribution.handlers';
import { overviewHandlers } from './overview.handlers';
import { rankingHandlers } from './ranking.handlers';
import { trendHandlers } from './trend.handlers';

export const handlers = [
  ...overviewHandlers,
  ...trendHandlers,
  ...rankingHandlers,
  ...distributionHandlers,
  ...alarmHandlers,
];

import { alarmFixture } from '@/mocks/fixtures/alarm.fixture';
import { distributionFixture } from '@/mocks/fixtures/distribution.fixture';
import { operationSummaryFixture, overviewMetricsFixture } from '@/mocks/fixtures/overview.fixture';
import { rankingFixture } from '@/mocks/fixtures/ranking.fixture';
import { trendFixture } from '@/mocks/fixtures/trend.fixture';

import type { RuyiDataProvider } from './provider.types';

function cloneFixture<TFixture>(fixture: TFixture): TFixture {
  return structuredClone(fixture);
}

export const mockProvider: RuyiDataProvider = {
  getOverviewMetrics() {
    return Promise.resolve(cloneFixture(overviewMetricsFixture));
  },
  getTrendData() {
    return Promise.resolve(cloneFixture(trendFixture));
  },
  getRegionRanking() {
    return Promise.resolve(cloneFixture(rankingFixture));
  },
  getBusinessDistribution() {
    return Promise.resolve(cloneFixture(distributionFixture));
  },
  getRealtimeAlarms() {
    return Promise.resolve(cloneFixture(alarmFixture));
  },
  getOperationSummary() {
    return Promise.resolve(cloneFixture(operationSummaryFixture));
  },
};

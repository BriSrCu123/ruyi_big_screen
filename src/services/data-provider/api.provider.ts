import type { RealtimeAlarm } from '@/features/alarm/types';
import type { BusinessDistributionItem } from '@/features/distribution/types';
import type { OperationSummary, OverviewMetric } from '@/features/overview/types';
import type { RegionRankingItem } from '@/features/ranking/types';
import type { TrendPoint } from '@/features/trend/types';
import { httpClient } from '@/services/http/httpClient';

import type { RuyiDataProvider } from './provider.types';

export const apiProvider: RuyiDataProvider = {
  getOverviewMetrics() {
    return httpClient.get<OverviewMetric[]>('/api/overview/metrics');
  },
  getTrendData() {
    return httpClient.get<TrendPoint[]>('/api/trend/hourly');
  },
  getRegionRanking() {
    return httpClient.get<RegionRankingItem[]>('/api/ranking/regions');
  },
  getBusinessDistribution() {
    return httpClient.get<BusinessDistributionItem[]>('/api/distribution/business');
  },
  getRealtimeAlarms() {
    return httpClient.get<RealtimeAlarm[]>('/api/alarms/realtime');
  },
  getOperationSummary() {
    return httpClient.get<OperationSummary>('/api/operation/summary');
  },
};

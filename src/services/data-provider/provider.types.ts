import type { RealtimeAlarm } from '@/features/alarm/types';
import type { BusinessDistributionItem } from '@/features/distribution/types';
import type { OperationSummary, OverviewMetric } from '@/features/overview/types';
import type { RegionRankingItem } from '@/features/ranking/types';
import type { TrendPoint } from '@/features/trend/types';

export type DataSource = 'mock' | 'api';

export interface RuyiDataProvider {
  getOverviewMetrics(): Promise<OverviewMetric[]>;
  getTrendData(): Promise<TrendPoint[]>;
  getRegionRanking(): Promise<RegionRankingItem[]>;
  getBusinessDistribution(): Promise<BusinessDistributionItem[]>;
  getRealtimeAlarms(): Promise<RealtimeAlarm[]>;
  getOperationSummary(): Promise<OperationSummary>;
}

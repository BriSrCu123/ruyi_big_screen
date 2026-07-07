import { dataProvider } from '@/services/data-provider';

import type { OperationSummary, OverviewMetric } from '../types';
import type { RuyiDataProvider } from '@/services/data-provider';

export async function fetchOverviewMetrics(
  provider: RuyiDataProvider = dataProvider,
): Promise<OverviewMetric[]> {
  return provider.getOverviewMetrics();
}

export async function fetchOperationSummary(
  provider: RuyiDataProvider = dataProvider,
): Promise<OperationSummary> {
  return provider.getOperationSummary();
}

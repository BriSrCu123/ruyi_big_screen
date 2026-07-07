import { dataProvider } from '@/services/data-provider';

import type { TrendPoint } from '../types';
import type { RuyiDataProvider } from '@/services/data-provider';

export function fetchTrendData(provider: RuyiDataProvider = dataProvider): Promise<TrendPoint[]> {
  return provider.getTrendData();
}

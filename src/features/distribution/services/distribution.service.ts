import { dataProvider } from '@/services/data-provider';

import type { BusinessDistributionItem } from '../types';
import type { RuyiDataProvider } from '@/services/data-provider';

export function fetchBusinessDistribution(
  provider: RuyiDataProvider = dataProvider,
): Promise<BusinessDistributionItem[]> {
  return provider.getBusinessDistribution();
}

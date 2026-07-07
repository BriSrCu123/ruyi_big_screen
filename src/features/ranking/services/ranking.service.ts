import { dataProvider } from '@/services/data-provider';

import type { RegionRankingItem } from '../types';
import type { RuyiDataProvider } from '@/services/data-provider';

export function sortRegionRanking(items: RegionRankingItem[]): RegionRankingItem[] {
  return [...items].sort((left, right) => right.businessVolume - left.businessVolume);
}

export async function fetchRegionRanking(
  provider: RuyiDataProvider = dataProvider,
): Promise<RegionRankingItem[]> {
  const items = await provider.getRegionRanking();
  return sortRegionRanking(items);
}

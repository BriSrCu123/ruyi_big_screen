import { describe, expect, it } from 'vitest';

import { sortRegionRanking } from '../services/ranking.service';

describe('sortRegionRanking', () => {
  it('sorts regions by business volume descending', () => {
    const sorted = sortRegionRanking([
      { region: 'A', businessVolume: 10, onlineDevices: 1, conversionRate: 1 },
      { region: 'B', businessVolume: 30, onlineDevices: 1, conversionRate: 1 },
      { region: 'C', businessVolume: 20, onlineDevices: 1, conversionRate: 1 },
    ]);

    expect(sorted.map((item) => item.region)).toEqual(['B', 'C', 'A']);
  });
});

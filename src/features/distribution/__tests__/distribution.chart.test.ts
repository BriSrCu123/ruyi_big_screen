import { describe, expect, it } from 'vitest';

import { createDistributionOption } from '../services/distribution.chart';

describe('createDistributionOption', () => {
  it('returns a pie chart option with distribution slices', () => {
    const option = createDistributionOption([
      { name: '智慧零售', value: 60, color: '#39d9c8' },
      { name: '即时配送', value: 40, color: '#e4b85c' },
    ]);

    expect(option.series).toBeDefined();
    expect(JSON.stringify(option)).toContain('智慧零售');
  });
});

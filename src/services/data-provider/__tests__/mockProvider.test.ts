import { describe, expect, it } from 'vitest';

import { mockProvider } from '../mock.provider';

describe('mockProvider', () => {
  it('returns overview metrics with business values', async () => {
    const metrics = await mockProvider.getOverviewMetrics();

    expect(metrics.length).toBeGreaterThanOrEqual(5);
    expect(metrics[0]?.label).toBe('今日交易额');
    expect(metrics[0]?.value).toBeGreaterThan(10_000);
  });
});

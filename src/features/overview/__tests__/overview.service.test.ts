import { describe, expect, it } from 'vitest';

import { mockProvider } from '@/services/data-provider/mock.provider';

import { fetchOperationSummary, fetchOverviewMetrics } from '../services/overview.service';

describe('overview service', () => {
  it('loads metrics and operation summary from provider', async () => {
    const [metrics, summary] = await Promise.all([
      fetchOverviewMetrics(mockProvider),
      fetchOperationSummary(mockProvider),
    ]);

    expect(metrics.some((metric) => metric.label === '今日交易额')).toBe(true);
    expect(summary.nodes.length).toBeGreaterThan(0);
  });
});

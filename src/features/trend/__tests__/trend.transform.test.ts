import { describe, expect, it } from 'vitest';

import { createTrendOption } from '../services/trend.chart';
import { toTrendSeries } from '../services/trend.transform';

import type { TrendPoint } from '../types';

const points: TrendPoint[] = [
  { time: '08:00', visitors: 100, orders: 20, transactionAmount: 8000 },
  { time: '10:00', visitors: 160, orders: 26, transactionAmount: 12000 },
];

describe('trend transforms', () => {
  it('converts trend points to chart series', () => {
    expect(toTrendSeries(points)).toEqual({
      labels: ['08:00', '10:00'],
      visitors: [100, 160],
      orders: [20, 26],
      transactionAmounts: [8000, 12000],
    });
  });

  it('creates a valid trend chart option', () => {
    const option = createTrendOption(points);

    expect(option.xAxis).toBeDefined();
    expect(option.yAxis).toBeDefined();
    expect(option.series).toBeDefined();
  });
});

import type { TrendPoint, TrendSeries } from '../types';

export function toTrendSeries(points: TrendPoint[]): TrendSeries {
  return points.reduce<TrendSeries>(
    (series, point) => {
      series.labels.push(point.time);
      series.visitors.push(point.visitors);
      series.orders.push(point.orders);
      series.transactionAmounts.push(point.transactionAmount);
      return series;
    },
    {
      labels: [],
      visitors: [],
      orders: [],
      transactionAmounts: [],
    },
  );
}

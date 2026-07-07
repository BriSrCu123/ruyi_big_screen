import { formatCompactNumber, formatCurrency, formatPercent } from '@/shared/utils/format';

import type { OverviewMetric } from '../types';

export function formatMetricValue(metric: OverviewMetric): string {
  if (metric.formatter === 'currency') {
    return formatCurrency(metric.value);
  }

  if (metric.formatter === 'percent') {
    return formatPercent(metric.value);
  }

  return formatCompactNumber(metric.value);
}

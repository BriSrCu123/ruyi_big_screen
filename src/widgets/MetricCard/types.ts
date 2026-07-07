import type { MetricTrendDirection } from '@/features/overview/types';

export interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  trendValue: number;
  trendLabel: string;
  trendDirection: MetricTrendDirection;
  accent: 'cyan' | 'gold' | 'green' | 'rose' | 'blue' | 'violet';
}

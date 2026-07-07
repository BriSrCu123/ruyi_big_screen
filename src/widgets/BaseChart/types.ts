import type { EChartsOption } from 'echarts';

export interface BaseChartProps {
  option: EChartsOption;
  loading?: boolean;
  empty?: boolean;
  height?: string;
  ariaLabel?: string;
}

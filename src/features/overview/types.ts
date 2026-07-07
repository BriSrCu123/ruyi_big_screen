export type MetricTrendDirection = 'up' | 'down' | 'stable';

export interface OverviewMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trendValue: number;
  trendLabel: string;
  trendDirection: MetricTrendDirection;
  formatter: 'currency' | 'number' | 'percent';
  accent: 'cyan' | 'gold' | 'green' | 'rose' | 'blue' | 'violet';
}

export interface OperationNode {
  id: string;
  name: string;
  type: 'hub' | 'store' | 'device' | 'payment';
  city: string;
  province: string;
  x: number;
  y: number;
  labelDx?: number;
  labelDy?: number;
  health: number;
  throughput: number;
}

export interface OperationLink {
  source: string;
  target: string;
  value: number;
}

export interface OperationLog {
  id: string;
  time: string;
  message: string;
  level: 'normal' | 'warning' | 'danger';
}

export interface OperationSummary {
  cityCount: number;
  storeCount: number;
  deviceTotal: number;
  onlineRate: number;
  transactionPulse: number;
  nodes: OperationNode[];
  links: OperationLink[];
  logs: OperationLog[];
}

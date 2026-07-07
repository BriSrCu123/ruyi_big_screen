export interface TrendPoint {
  time: string;
  visitors: number;
  orders: number;
  transactionAmount: number;
}

export interface TrendSeries {
  labels: string[];
  visitors: number[];
  orders: number[];
  transactionAmounts: number[];
}

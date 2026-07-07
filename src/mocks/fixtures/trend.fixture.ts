import type { TrendPoint } from '@/features/trend/types';

export const trendFixture: TrendPoint[] = [
  { time: '00:00', visitors: 42600, orders: 3180, transactionAmount: 3210000 },
  { time: '02:00', visitors: 31800, orders: 2460, transactionAmount: 2680000 },
  { time: '04:00', visitors: 28600, orders: 2190, transactionAmount: 2310000 },
  { time: '06:00', visitors: 40200, orders: 3520, transactionAmount: 3980000 },
  { time: '08:00', visitors: 68800, orders: 6120, transactionAmount: 6840000 },
  { time: '10:00', visitors: 84600, orders: 7310, transactionAmount: 8120000 },
  { time: '12:00', visitors: 93600, orders: 8020, transactionAmount: 9260000 },
  { time: '14:00', visitors: 88700, orders: 7640, transactionAmount: 8740000 },
  { time: '16:00', visitors: 95100, orders: 8280, transactionAmount: 9720000 },
  { time: '18:00', visitors: 108600, orders: 9360, transactionAmount: 11860000 },
  { time: '20:00', visitors: 118200, orders: 10320, transactionAmount: 13580000 },
  { time: '22:00', visitors: 92400, orders: 8210, transactionAmount: 10120000 },
];

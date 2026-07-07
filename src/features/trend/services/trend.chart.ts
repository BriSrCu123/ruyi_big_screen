import { toTrendSeries } from './trend.transform';

import type { TrendPoint } from '../types';
import type { EChartsOption } from 'echarts';

export function createTrendOption(points: TrendPoint[]): EChartsOption {
  const series = toTrendSeries(points);

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 16, 25, 0.92)',
      borderColor: 'rgba(105, 219, 214, 0.3)',
      textStyle: {
        color: '#eef7ff',
      },
    },
    legend: {
      top: 0,
      right: 8,
      textStyle: {
        color: '#91a3b8',
      },
      data: ['访问量', '订单数', '交易额'],
    },
    grid: {
      top: 48,
      right: 72,
      bottom: 26,
      left: 52,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: series.labels,
      axisLine: {
        lineStyle: {
          color: 'rgba(145, 163, 184, 0.35)',
        },
      },
      axisLabel: {
        color: '#91a3b8',
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '访问/订单',
        nameGap: 12,
        nameTextStyle: {
          color: '#91a3b8',
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(145, 163, 184, 0.12)',
          },
        },
        axisLabel: {
          color: '#91a3b8',
          margin: 8,
        },
      },
      {
        type: 'value',
        name: '交易额(万)',
        nameGap: 14,
        nameTextStyle: {
          color: '#91a3b8',
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#91a3b8',
          formatter: '{value}万',
          margin: 8,
        },
      },
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        data: series.visitors,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(57, 217, 200, 0.28)' },
              { offset: 1, color: 'rgba(57, 217, 200, 0.02)' },
            ],
          },
        },
      },
      {
        name: '订单数',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        data: series.orders,
      },
      {
        name: '交易额',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 6,
        data: series.transactionAmounts.map((value) => Math.round(value / 10_000)),
      },
    ],
  };
}

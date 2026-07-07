import type { RegionRankingItem } from '../types';
import type { EChartsOption } from 'echarts';

export function createRegionBarOption(items: RegionRankingItem[]): EChartsOption {
  const topItems = items.slice(0, 8).reverse();

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: 'rgba(10, 16, 25, 0.92)',
      borderColor: 'rgba(105, 219, 214, 0.3)',
      textStyle: {
        color: '#eef7ff',
      },
    },
    grid: {
      top: 12,
      right: 20,
      bottom: 12,
      left: 52,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(145, 163, 184, 0.12)',
        },
      },
      axisLabel: {
        color: '#91a3b8',
      },
    },
    yAxis: {
      type: 'category',
      data: topItems.map((item) => item.region),
      axisLabel: {
        color: '#eef7ff',
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(145, 163, 184, 0.2)',
        },
      },
    },
    series: [
      {
        name: '业务量',
        type: 'bar',
        data: topItems.map((item) => item.businessVolume),
        barWidth: 12,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#39d9c8' },
              { offset: 1, color: '#e4b85c' },
            ],
          },
        },
      },
    ],
  };
}

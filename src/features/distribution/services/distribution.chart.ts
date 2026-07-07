import type { BusinessDistributionItem } from '../types';
import type { EChartsOption } from 'echarts';

export function createDistributionOption(items: BusinessDistributionItem[]): EChartsOption {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 16, 25, 0.92)',
      borderColor: 'rgba(105, 219, 214, 0.3)',
      textStyle: {
        color: '#eef7ff',
      },
    },
    legend: {
      bottom: 0,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#91a3b8',
      },
    },
    series: [
      {
        name: '业务占比',
        type: 'pie',
        radius: ['48%', '70%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        label: {
          color: '#eef7ff',
          formatter: '{b}\n{d}%',
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(145, 163, 184, 0.35)',
          },
        },
        data: items.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: item.color,
          },
        })),
      },
    ],
  };
}

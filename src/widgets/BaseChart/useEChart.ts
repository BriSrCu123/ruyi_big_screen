import * as echarts from 'echarts/core';
import {
  BarChart,
  GaugeChart,
  LineChart,
  PieChart,
  ScatterChart,
} from 'echarts/charts';
import {
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, onBeforeUnmount, shallowRef, watch } from 'vue';

import { logger } from '@/logs/logger';

import { ruyiChartTheme } from './chartTheme';

import type { ECharts, EChartsOption } from 'echarts';
import type { Ref, ShallowRef } from 'vue';

echarts.use([
  BarChart,
  GaugeChart,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
]);

echarts.registerTheme('ruyi', ruyiChartTheme);

const chartLogger = logger.child('echarts');

interface UseEChartReturn {
  chart: ShallowRef<ECharts | null>;
  setContainer: (element: HTMLElement | null) => void;
}

export function useEChart(option: Ref<EChartsOption>, loading: Ref<boolean>): UseEChartReturn {
  const chart = shallowRef<ECharts | null>(null);
  const container = shallowRef<HTMLElement | null>(null);
  const resizeObserver = shallowRef<ResizeObserver | null>(null);
  const canRender = computed(() => !loading.value && container.value !== null);

  function dispose(): void {
    resizeObserver.value?.disconnect();
    resizeObserver.value = null;
    chart.value?.dispose();
    chart.value = null;
  }

  function setContainer(element: HTMLElement | null): void {
    if (container.value === element) {
      return;
    }

    dispose();
    container.value = element;

    if (!element) {
      return;
    }

    try {
      chart.value = echarts.init(element, 'ruyi', {
        renderer: 'canvas',
      });
      resizeObserver.value = new ResizeObserver(() => {
        chart.value?.resize();
      });
      resizeObserver.value.observe(element);
      if (canRender.value) {
        chart.value.setOption(option.value, true);
      }
    } catch (error: unknown) {
      chartLogger.error('Chart initialization failed', { error });
    }
  }

  watch(
    [option, loading, canRender],
    () => {
      if (!chart.value || !canRender.value) {
        return;
      }
      chart.value.setOption(option.value, true);
    },
    {
      deep: true,
    },
  );

  onBeforeUnmount(dispose);

  return {
    chart,
    setContainer,
  };
}

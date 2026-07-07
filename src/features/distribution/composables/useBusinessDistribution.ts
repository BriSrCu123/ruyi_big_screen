import { computed, onMounted, ref } from 'vue';

import { logger } from '@/logs/logger';

import { createDistributionOption } from '../services/distribution.chart';
import { fetchBusinessDistribution } from '../services/distribution.service';

import type { BusinessDistributionItem } from '../types';
import type { LoadStatus } from '@/shared/types/status';

const distributionLogger = logger.child('distribution');

export function useBusinessDistribution() {
  const distribution = ref<BusinessDistributionItem[]>([]);
  const status = ref<LoadStatus>('idle');
  const errorMessage = ref('');
  const option = computed(() => createDistributionOption(distribution.value));

  async function load(): Promise<void> {
    status.value = 'loading';
    errorMessage.value = '';

    try {
      distribution.value = await fetchBusinessDistribution();
      status.value = 'success';
      distributionLogger.info('Business distribution loaded', {
        slices: distribution.value.length,
      });
    } catch (error: unknown) {
      status.value = 'error';
      errorMessage.value = '业务分布加载失败';
      distributionLogger.error('Business distribution failed to load', { error });
    }
  }

  onMounted(() => {
    void load();
  });

  return {
    distribution,
    status,
    errorMessage,
    option,
    reload: load,
  };
}

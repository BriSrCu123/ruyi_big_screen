import { computed, onMounted, ref } from 'vue';

import { logger } from '@/logs/logger';

import { createRegionBarOption } from '../services/ranking.chart';
import { fetchRegionRanking } from '../services/ranking.service';

import type { RegionRankingItem } from '../types';
import type { LoadStatus } from '@/shared/types/status';

const rankingLogger = logger.child('ranking');

export function useRegionRanking() {
  const ranking = ref<RegionRankingItem[]>([]);
  const status = ref<LoadStatus>('idle');
  const errorMessage = ref('');
  const option = computed(() => createRegionBarOption(ranking.value));

  async function load(): Promise<void> {
    status.value = 'loading';
    errorMessage.value = '';

    try {
      ranking.value = await fetchRegionRanking();
      status.value = 'success';
      rankingLogger.info('Region ranking loaded', {
        count: ranking.value.length,
      });
    } catch (error: unknown) {
      status.value = 'error';
      errorMessage.value = '区域排行加载失败';
      rankingLogger.error('Region ranking failed to load', { error });
    }
  }

  onMounted(() => {
    void load();
  });

  return {
    ranking,
    status,
    errorMessage,
    option,
    reload: load,
  };
}

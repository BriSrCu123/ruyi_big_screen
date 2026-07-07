<script setup lang="ts">
import { computed } from 'vue';

import { formatCompactNumber } from '@/shared/utils/format';
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useRegionRanking } from '../composables/useRegionRanking';

const { ranking, status, errorMessage } = useRegionRanking();

const maxVolume = computed(() =>
  ranking.value.reduce((max, item) => Math.max(max, item.businessVolume), 0),
);
</script>

<template>
  <ScreenPanel title="区域业务排行" subtitle="城市运营业务量 Top 8">
    <div v-if="status === 'loading'" class="loading-state">排行加载中</div>
    <div v-else-if="status === 'error'" class="error-state">{{ errorMessage }}</div>
    <div v-else-if="ranking.length === 0" class="empty-state">暂无排行数据</div>
    <div v-else class="region-ranking">
      <ol class="region-ranking__list">
        <li v-for="(item, index) in ranking.slice(0, 8)" :key="item.region">
          <span class="region-ranking__index">{{ index + 1 }}</span>
          <div class="region-ranking__meta">
            <strong>{{ item.region }}</strong>
            <em>{{ item.conversionRate.toFixed(1) }}%</em>
          </div>
          <strong class="region-ranking__value">{{ formatCompactNumber(item.businessVolume) }}</strong>
          <span class="region-ranking__bar" aria-label="业务量占比">
            <i :style="{ width: `${(item.businessVolume / maxVolume) * 100}%` }" />
          </span>
        </li>
      </ol>
    </div>
  </ScreenPanel>
</template>

<style scoped lang="scss">
.region-ranking {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.region-ranking__list {
  display: grid;
  height: 100%;
  min-height: 0;
  padding: 0;
  padding-right: 3px;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
  scrollbar-color: rgb(57 217 200 / 0.42) transparent;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  gap: 5px;
}

.region-ranking__list::-webkit-scrollbar {
  width: 5px;
}

.region-ranking__list::-webkit-scrollbar-track {
  background: transparent;
}

.region-ranking__list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgb(57 217 200 / 0.42);
}

.region-ranking__list li {
  display: grid;
  grid-template-areas:
    "index meta value"
    "index bar bar";
  grid-template-columns: 26px minmax(0, 1fr) 58px;
  align-items: center;
  min-height: 34px;
  gap: 4px 8px;
}

.region-ranking__index {
  display: grid;
  grid-area: index;
  width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 6px;
  color: #081019;
  font-size: 12px;
  font-weight: 800;
  background: var(--color-accent);
}

.region-ranking__meta {
  display: flex;
  grid-area: meta;
  align-items: center;
  min-width: 0;
  gap: 8px;
}

.region-ranking__meta strong {
  overflow: hidden;
  color: var(--color-text);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.region-ranking__meta em {
  flex: 0 0 auto;
  padding: 2px 6px;
  border: 1px solid rgb(57 217 200 / 0.18);
  border-radius: 999px;
  color: var(--color-primary);
  font-size: 11px;
  font-style: normal;
  line-height: 1;
  background: rgb(57 217 200 / 0.08);
}

.region-ranking__bar {
  position: relative;
  grid-area: bar;
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.08);
}

.region-ranking__bar i {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

.region-ranking__value {
  grid-area: value;
  color: var(--color-text-muted);
  font-size: 11px;
  text-align: right;
  white-space: nowrap;
}
</style>

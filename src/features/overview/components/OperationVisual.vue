<script setup lang="ts">
import { computed, ref } from 'vue';

import { formatCompactNumber } from '@/shared/utils/format';
import ScreenPanel from '@/widgets/Panel/ScreenPanel.vue';

import { useOperationSummary } from '../composables/useOperationSummary';

import type { OperationNode } from '../types';

const { summary, status, errorMessage } = useOperationSummary();
const hoveredNode = ref<OperationNode | null>(null);

interface MapLink {
  id: string;
  source: OperationNode;
  target: OperationNode;
  value: number;
  path: string;
}

function mapX(node: OperationNode): number {
  return node.x * 10;
}

function mapY(node: OperationNode): number {
  return node.y * 5.6;
}

function labelX(node: OperationNode): number {
  return node.labelDx ?? 16;
}

function labelY(node: OperationNode): number {
  return node.labelDy ?? -12;
}

function createFlowPath(source: OperationNode, target: OperationNode): string {
  const startX = mapX(source);
  const startY = mapY(source);
  const endX = mapX(target);
  const endY = mapY(target);
  const controlX = (startX + endX) / 2;
  const controlY = Math.min(startY, endY) - 62;

  return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
}

const links = computed<MapLink[]>(() => {
  if (!summary.value) {
    return [];
  }

  return summary.value.links
    .map((link) => {
      const source = summary.value?.nodes.find((node) => node.id === link.source);
      const target = summary.value?.nodes.find((node) => node.id === link.target);
      if (!source || !target) {
        return null;
      }

      return {
        ...link,
        id: `${source.id}-${target.id}`,
        source,
        target,
        path: createFlowPath(source, target),
      };
    })
    .filter((link): link is MapLink => link !== null);
});

const hotNodes = computed(() => {
  return [...(summary.value?.nodes ?? [])]
    .filter((node) => node.type !== 'hub')
    .sort((left, right) => right.throughput - left.throughput)
    .slice(0, 7);
});

const tooltipStyle = computed(() => {
  if (!hoveredNode.value) {
    return {};
  }

  const isRightSide = hoveredNode.value.x > 58;
  const left = isRightSide
    ? Math.min(78, Math.max(28, hoveredNode.value.x - 5))
    : Math.min(64, Math.max(8, hoveredNode.value.x + 4));
  const top = Math.min(76, Math.max(8, hoveredNode.value.y - 2));

  return {
    left: `${left}%`,
    top: `${top}%`,
    transform: isRightSide ? 'translate(calc(-100% - 12px), -50%)' : 'translate(12px, -50%)',
  };
});
</script>

<template>
  <ScreenPanel title="城市运营态势分析" subtitle="城市节点、交易飞线与设备健康实时监控">
    <div v-if="status === 'loading'" class="loading-state">态势加载中</div>
    <div v-else-if="status === 'error'" class="error-state">{{ errorMessage }}</div>
    <div v-else-if="!summary" class="empty-state">暂无态势数据</div>
    <div v-else class="china-map-panel" data-testid="operation-visual">
      <div class="china-map-panel__stage">
        <svg
          class="china-map"
          viewBox="0 0 1000 560"
          role="img"
          aria-label="城市运营态势示意图"
        >
          <defs>
            <linearGradient id="china-map-fill" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stop-color="#39d9c8" stop-opacity="0.34" />
              <stop offset="55%" stop-color="#80a9ff" stop-opacity="0.16" />
              <stop offset="100%" stop-color="#e4b85c" stop-opacity="0.2" />
            </linearGradient>
            <filter id="china-map-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            class="china-map__shadow"
            d="M172 275 L212 208 L300 176 L382 116 L496 96 L590 134 L654 130 L740 185 L834 250 L776 318 L704 332 L676 392 L596 422 L555 500 L456 464 L392 496 L316 438 L226 432 L178 362 Z"
          />
          <path
            class="china-map__shape"
            d="M172 275 L212 208 L300 176 L382 116 L496 96 L590 134 L654 130 L740 185 L834 250 L776 318 L704 332 L676 392 L596 422 L555 500 L456 464 L392 496 L316 438 L226 432 L178 362 Z"
          />
          <path
            class="china-map__region"
            d="M212 208 L382 116 L496 96 L590 134 L548 230 L408 248 L300 176 Z"
          />
          <path
            class="china-map__region"
            d="M548 230 L740 185 L834 250 L776 318 L648 346 L590 286 Z"
          />
          <path
            class="china-map__region"
            d="M408 248 L548 230 L590 286 L555 500 L456 464 L392 496 L316 438 Z"
          />
          <path
            class="china-map__region"
            d="M172 275 L300 176 L408 248 L316 438 L226 432 L178 362 Z"
          />

          <path
            v-for="link in links"
            :id="`flow-${link.id}`"
            :key="`${link.id}-motion-path`"
            class="china-map__motion-path"
            :d="link.path"
          />
          <path
            v-for="link in links"
            :key="link.id"
            class="china-map__flow"
            :d="link.path"
            :stroke-width="Math.max(1.6, link.value / 42)"
          />
          <circle v-for="link in links" :key="`${link.id}-dot`" r="4" class="china-map__flow-dot">
            <animateMotion :dur="`${Math.max(2.8, 7 - link.value / 18)}s`" repeatCount="indefinite">
              <mpath :href="`#flow-${link.id}`" />
            </animateMotion>
          </circle>

          <g
            v-for="node in summary.nodes"
            :key="node.id"
            class="china-map__node"
            :class="`china-map__node--${node.type}`"
            :transform="`translate(${mapX(node)} ${mapY(node)})`"
            tabindex="0"
            @mouseenter="hoveredNode = node"
            @mouseleave="hoveredNode = null"
            @focus="hoveredNode = node"
            @blur="hoveredNode = null"
          >
            <circle class="china-map__node-ring" r="22" />
            <circle class="china-map__node-core" r="7" />
            <text class="china-map__node-city" :x="labelX(node)" :y="labelY(node)">
              {{ node.city }}
            </text>
          </g>
        </svg>

        <div v-if="hoveredNode" class="china-map-tooltip" :style="tooltipStyle">
          <header>
            <strong>{{ hoveredNode.city }}</strong>
            <span>{{ hoveredNode.province }}</span>
          </header>
          <p>{{ hoveredNode.name }}</p>
          <dl>
            <div>
              <dt>健康度</dt>
              <dd>{{ hoveredNode.health.toFixed(1) }}%</dd>
            </div>
            <div>
              <dt>吞吐量</dt>
              <dd>{{ formatCompactNumber(hoveredNode.throughput) }}</dd>
            </div>
          </dl>
        </div>

        <div class="china-map-panel__legend">
          <span><i class="legend-dot legend-dot--hub" />运营中枢</span>
          <span><i class="legend-dot legend-dot--payment" />交易节点</span>
          <span><i class="legend-dot legend-dot--device" />设备节点</span>
          <span><i class="legend-dot legend-dot--store" />商业节点</span>
        </div>
      </div>

      <aside class="china-map-panel__aside">
        <div class="china-map-panel__summary">
          <div>
            <span>覆盖城市</span>
            <strong>{{ summary.cityCount }}</strong>
          </div>
          <div>
            <span>门店节点</span>
            <strong>{{ summary.storeCount.toLocaleString('zh-CN') }}</strong>
          </div>
          <div>
            <span>在线设备</span>
            <strong>{{ formatCompactNumber(summary.deviceTotal) }}</strong>
          </div>
          <div>
            <span>交易脉冲</span>
            <strong>{{ summary.transactionPulse }}</strong>
          </div>
        </div>

        <ol class="china-map-panel__hot">
          <li v-for="(node, index) in hotNodes" :key="node.id">
            <span>{{ index + 1 }}</span>
            <div>
              <strong>{{ node.city }}</strong>
              <em>{{ node.name }}</em>
            </div>
            <b>{{ formatCompactNumber(node.throughput) }}</b>
          </li>
        </ol>
      </aside>
    </div>
  </ScreenPanel>
</template>

<style scoped lang="scss">
.china-map-panel {
  position: relative;
  isolation: isolate;
  display: grid;
  height: 100%;
  min-height: 320px;
  grid-template-columns: minmax(0, 1fr) 178px;
  gap: 14px;
}

.china-map-panel__stage {
  position: relative;
  z-index: 10;
  min-width: 0;
  overflow: visible;
  border: 1px solid rgb(105 219 214 / 0.18);
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgb(57 217 200 / 0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgb(228 184 92 / 0.05) 1px, transparent 1px),
    radial-gradient(circle at 58% 50%, rgb(57 217 200 / 0.16), transparent 58%);
  background-size:
    34px 34px,
    34px 34px,
    100% 100%;
}

.china-map {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 304px;
}

.china-map__shadow {
  fill: rgb(57 217 200 / 0.1);
  filter: url("#china-map-glow");
  transform: translate(12px, 14px);
}

.china-map__shape {
  fill: url("#china-map-fill");
  stroke: rgb(105 219 214 / 0.62);
  stroke-width: 2;
  filter: drop-shadow(0 0 16px rgb(57 217 200 / 0.18));
}

.china-map__region {
  fill: transparent;
  stroke: rgb(255 255 255 / 0.13);
  stroke-width: 1.2;
}

.china-map__flow,
.china-map__motion-path {
  fill: none;
}

.china-map__flow {
  stroke: rgb(57 217 200 / 0.52);
  stroke-dasharray: 8 12;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgb(57 217 200 / 0.34));
  animation: flow-dash 2.8s linear infinite;
}

.china-map__motion-path {
  stroke: transparent;
}

.china-map__flow-dot {
  fill: var(--color-accent);
  filter: drop-shadow(0 0 8px rgb(228 184 92 / 0.8));
}

.china-map__node-ring {
  fill: rgb(57 217 200 / 0.1);
  stroke: rgb(57 217 200 / 0.45);
  stroke-width: 2;
  animation: map-pulse 2.6s ease-in-out infinite;
}

.china-map__node-core {
  fill: var(--color-primary);
  filter: drop-shadow(0 0 10px rgb(57 217 200 / 0.72));
}

.china-map__node {
  cursor: pointer;
  outline: none;
}

.china-map__node:hover .china-map__node-ring,
.china-map__node:focus .china-map__node-ring {
  stroke: var(--color-accent);
  stroke-width: 3;
}

.china-map__node--hub .china-map__node-core {
  fill: var(--color-accent);
}

.china-map__node--payment .china-map__node-core {
  fill: var(--chart-gold);
}

.china-map__node--device .china-map__node-core {
  fill: var(--chart-blue);
}

.china-map__node-city {
  fill: var(--color-text);
  font-size: 15px;
  font-weight: 800;
  paint-order: stroke;
  stroke: rgb(8 10 16 / 0.92);
  stroke-width: 4px;
}

.china-map-tooltip {
  position: absolute;
  z-index: 1000;
  width: 188px;
  padding: 12px;
  pointer-events: none;
  border: 1px solid rgb(105 219 214 / 0.34);
  border-radius: 8px;
  background: rgb(8 12 20 / 0.94);
  box-shadow: 0 16px 34px rgb(0 0 0 / 0.32), 0 0 22px rgb(57 217 200 / 0.12);
}

.china-map-tooltip header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.china-map-tooltip strong {
  color: var(--color-text);
  font-size: 16px;
}

.china-map-tooltip span,
.china-map-tooltip p,
.china-map-tooltip dt {
  color: var(--color-text-muted);
  font-size: 12px;
}

.china-map-tooltip p {
  margin: 7px 0 10px;
}

.china-map-tooltip dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 0;
  margin: 0;
  gap: 8px;
}

.china-map-tooltip div {
  padding: 8px;
  border: 1px solid rgb(255 255 255 / 0.08);
  border-radius: 6px;
  background: rgb(255 255 255 / 0.04);
}

.china-map-tooltip dt,
.china-map-tooltip dd {
  margin: 0;
}

.china-map-tooltip dd {
  margin-top: 4px;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 800;
}

.china-map-panel__legend {
  position: absolute;
  right: 14px;
  bottom: 12px;
  left: 14px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  border-radius: 8px;
  background: rgb(8 10 16 / 0.58);
  gap: 10px 14px;
}

.china-map-panel__legend span {
  display: inline-flex;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 12px;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 10px currentcolor;
}

.legend-dot--hub {
  background: var(--color-accent);
}

.legend-dot--payment {
  background: var(--chart-gold);
}

.legend-dot--device {
  background: var(--chart-blue);
}

.china-map-panel__aside {
  position: relative;
  z-index: 1;
  display: grid;
  overflow: hidden;
  min-width: 0;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 10px;
}

.china-map-panel__summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
}

.china-map-panel__summary div {
  min-height: 56px;
  padding: 8px;
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: 8px;
  background: rgb(8 10 16 / 0.58);
}

.china-map-panel__summary span,
.china-map-panel__hot em {
  color: var(--color-text-muted);
  font-size: 11px;
}

.china-map-panel__summary strong {
  display: block;
  margin-top: 5px;
  font-size: 18px;
  line-height: 1.05;
}

.china-map-panel__hot {
  display: grid;
  align-content: start;
  min-height: 0;
  padding: 0;
  padding-right: 3px;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
  scrollbar-color: rgb(57 217 200 / 0.4) transparent;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  gap: 6px;
}

.china-map-panel__hot::-webkit-scrollbar {
  width: 5px;
}

.china-map-panel__hot::-webkit-scrollbar-track {
  background: transparent;
}

.china-map-panel__hot::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgb(57 217 200 / 0.42);
}

.china-map-panel__hot li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  align-items: center;
  min-height: 45px;
  padding: 7px;
  border: 1px solid rgb(255 255 255 / 0.08);
  border-radius: 8px;
  background: rgb(255 255 255 / 0.035);
  gap: 8px;
}

.china-map-panel__hot li > span {
  display: grid;
  width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 6px;
  color: #081019;
  font-size: 12px;
  font-weight: 800;
  background: var(--color-accent);
}

.china-map-panel__hot div {
  min-width: 0;
}

.china-map-panel__hot strong,
.china-map-panel__hot em {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.china-map-panel__hot strong {
  font-size: 12px;
}

.china-map-panel__hot b {
  color: var(--color-primary);
  font-size: 12px;
  white-space: nowrap;
}

@keyframes flow-dash {
  to {
    stroke-dashoffset: -40;
  }
}

@keyframes map-pulse {
  0%,
  100% {
    opacity: 0.42;
    transform: scale(0.82);
  }

  50% {
    opacity: 0.92;
    transform: scale(1.12);
  }
}
</style>

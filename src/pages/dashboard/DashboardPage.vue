<script setup lang="ts">
import AlarmSummary from '@/features/alarm/components/AlarmSummary.vue';
import RealtimeAlarmList from '@/features/alarm/components/RealtimeAlarmList.vue';
import BusinessDistribution from '@/features/distribution/components/BusinessDistribution.vue';
import DeviceStatusPanel from '@/features/overview/components/DeviceStatusPanel.vue';
import OperationVisual from '@/features/overview/components/OperationVisual.vue';
import OverviewMetrics from '@/features/overview/components/OverviewMetrics.vue';
import RegionRanking from '@/features/ranking/components/RegionRanking.vue';
import TrendChart from '@/features/trend/components/TrendChart.vue';

import DashboardHeader from './components/DashboardHeader.vue';
</script>

<template>
  <main class="ruyi-screen dashboard-page">
    <div class="ruyi-screen__content">
      <DashboardHeader />

      <section class="dashboard-grid" aria-label="如意数据大屏主内容">
        <aside class="dashboard-grid__left">
          <OverviewMetrics />
          <RegionRanking />
          <AlarmSummary />
        </aside>

        <section class="dashboard-grid__center">
          <OperationVisual />
          <TrendChart />
        </section>

        <aside class="dashboard-grid__right">
          <BusinessDistribution />
          <RealtimeAlarmList />
          <DeviceStatusPanel />
        </aside>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.dashboard-page {
  color: var(--color-text);
}

.dashboard-grid {
  display: grid;
  flex: 1;
  min-height: 0;
  grid-template-areas: "left center right";
  grid-template-columns: minmax(320px, 0.86fr) minmax(620px, 1.54fr) minmax(340px, 0.94fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 14px;
}

.dashboard-grid__left,
.dashboard-grid__center,
.dashboard-grid__right {
  display: grid;
  min-height: 0;
  gap: 14px;
}

.dashboard-grid__left {
  grid-area: left;
  grid-template-rows: auto minmax(0, 1fr) 154px;
}

.dashboard-grid__center {
  grid-area: center;
  grid-template-rows: minmax(0, 1fr) 288px;
}

.dashboard-grid__right {
  grid-area: right;
  grid-template-rows: 298px minmax(0, 1fr) 232px;
}

@media (width <= 1320px) {
  .dashboard-grid {
    grid-template-areas:
      "center center"
      "left right";
    grid-template-columns: minmax(420px, 1fr) minmax(420px, 1fr);
    grid-template-rows: 680px auto;
  }
}
</style>

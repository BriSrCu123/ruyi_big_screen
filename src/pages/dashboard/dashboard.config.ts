import type { DashboardModuleConfig } from './dashboard.types';

export const dashboardModules: DashboardModuleConfig[] = [
  { id: 'overview', title: '核心指标', area: 'left' },
  { id: 'ranking', title: '区域排行', area: 'left' },
  { id: 'operation', title: '综合态势', area: 'center' },
  { id: 'trend', title: '实时趋势', area: 'center' },
  { id: 'distribution', title: '业务分布', area: 'right' },
  { id: 'alarms', title: '实时告警', area: 'right' },
  { id: 'region-bars', title: '区域业务量', area: 'bottom' },
  { id: 'flow', title: '系统运行日志', area: 'bottom' },
];

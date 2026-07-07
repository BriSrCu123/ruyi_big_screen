import type { RealtimeAlarm } from '@/features/alarm/types';

export const alarmFixture: RealtimeAlarm[] = [
  {
    id: 'alarm-001',
    level: 'critical',
    time: '10:16:22',
    source: '深圳-南山旗舰店',
    message: '支付链路延迟超过 900ms',
    status: 'processing',
  },
  {
    id: 'alarm-002',
    level: 'warning',
    time: '10:14:09',
    source: '上海-浦东边缘网关',
    message: '设备心跳丢包率升高',
    status: 'confirmed',
  },
  {
    id: 'alarm-003',
    level: 'info',
    time: '10:11:48',
    source: '杭州-湖滨商圈',
    message: '客流峰值触发弹性调度',
    status: 'resolved',
  },
  {
    id: 'alarm-004',
    level: 'warning',
    time: '10:08:16',
    source: '北京-朝阳配送站',
    message: '订单积压接近预警线',
    status: 'processing',
  },
  {
    id: 'alarm-005',
    level: 'info',
    time: '10:04:31',
    source: '成都-高新会员中心',
    message: '会员活动转化率异常波动',
    status: 'confirmed',
  },
];

export type AlarmLevel = 'critical' | 'warning' | 'info';
export type AlarmStatus = 'processing' | 'confirmed' | 'resolved';

export interface RealtimeAlarm {
  id: string;
  level: AlarmLevel;
  time: string;
  source: string;
  message: string;
  status: AlarmStatus;
}

export interface AlarmSummary {
  critical: number;
  warning: number;
  info: number;
}

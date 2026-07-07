import type { LogEntry, LoggerTransport } from './logger';

export function createConsoleTransport(): LoggerTransport {
  return {
    send(entry: LogEntry): void {
      const output = {
        level: entry.level,
        module: entry.module,
        message: entry.message,
        timestamp: entry.timestamp,
        payload: entry.payload,
      };

      if (entry.level === 'error') {
        console.error(output);
        return;
      }

      if (entry.level === 'warn') {
        console.warn(output);
        return;
      }

      if (entry.level === 'debug') {
        console.debug(output);
        return;
      }

      console.info(output);
    },
  };
}

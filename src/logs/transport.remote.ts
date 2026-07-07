import type { LogEntry, LoggerTransport } from './logger';

const remoteBuffer: LogEntry[] = [];

export function createRemoteTransport(): LoggerTransport {
  return {
    send(entry: LogEntry): void {
      remoteBuffer.push(entry);
      if (remoteBuffer.length > 100) {
        remoteBuffer.shift();
      }
    },
  };
}

export function getRemoteLogBuffer(): readonly LogEntry[] {
  return remoteBuffer;
}

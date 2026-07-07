import { createConsoleTransport } from './transport.console';
import { createRemoteTransport } from './transport.remote';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  module: string;
  payload?: unknown;
}

export interface LoggerTransport {
  send(entry: LogEntry): void | Promise<void>;
}

export interface Logger {
  debug(message: string, payload?: unknown): void;
  info(message: string, payload?: unknown): void;
  warn(message: string, payload?: unknown): void;
  error(message: string, payload?: unknown): void;
  child(moduleName: string): Logger;
}

interface LoggerOptions {
  moduleName: string;
  transports: LoggerTransport[];
}

export function createLogEntry(
  level: LogLevel,
  moduleName: string,
  message: string,
  payload?: unknown,
): LogEntry {
  return {
    level,
    module: moduleName,
    message,
    timestamp: new Date().toISOString(),
    ...(payload === undefined ? {} : { payload }),
  };
}

class RuyiLogger implements Logger {
  private readonly moduleName: string;

  private readonly transports: LoggerTransport[];

  public constructor(options: LoggerOptions) {
    this.moduleName = options.moduleName;
    this.transports = options.transports;
  }

  public debug(message: string, payload?: unknown): void {
    this.dispatch('debug', message, payload);
  }

  public info(message: string, payload?: unknown): void {
    this.dispatch('info', message, payload);
  }

  public warn(message: string, payload?: unknown): void {
    this.dispatch('warn', message, payload);
  }

  public error(message: string, payload?: unknown): void {
    this.dispatch('error', message, payload);
  }

  public child(moduleName: string): Logger {
    return new RuyiLogger({
      moduleName: `${this.moduleName}.${moduleName}`,
      transports: this.transports,
    });
  }

  private dispatch(level: LogLevel, message: string, payload?: unknown): void {
    const entry = createLogEntry(level, this.moduleName, message, payload);
    this.transports.forEach((transport) => {
      void transport.send(entry);
    });
  }
}

const transports = import.meta.env.PROD
  ? [createRemoteTransport()]
  : [createConsoleTransport(), createRemoteTransport()];

export const logger: Logger = new RuyiLogger({
  moduleName: 'ruyi',
  transports,
});

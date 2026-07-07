import { describe, expect, it } from 'vitest';

import { createLogEntry } from '../logger';

describe('logger', () => {
  it('creates structured log entries', () => {
    const entry = createLogEntry('info', 'ruyi.test', 'loaded', { count: 3 });

    expect(entry).toMatchObject({
      level: 'info',
      module: 'ruyi.test',
      message: 'loaded',
      payload: { count: 3 },
    });
    expect(Date.parse(entry.timestamp)).not.toBeNaN();
  });
});

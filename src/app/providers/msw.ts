import { logger } from '@/logs/logger';

const mswLogger = logger.child('msw');

export async function setupMsw(): Promise<void> {
  const enabled = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW !== 'false';

  if (!enabled) {
    mswLogger.info('MSW mock worker skipped', {
      environment: import.meta.env.MODE,
    });
    return;
  }

  try {
    const { worker } = await import('@/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    mswLogger.info('MSW mock worker started');
  } catch (error: unknown) {
    mswLogger.warn('MSW mock worker failed to start; local mock provider remains active', {
      error,
    });
  }
}

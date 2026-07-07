import { createApp } from 'vue';

import App from '@/app/App.vue';
import { createAppPinia } from '@/app/providers/pinia';
import { setupMsw } from '@/app/providers/msw';
import { router } from '@/app/router';
import { logger } from '@/logs/logger';
import '@/shared/styles/reset.scss';
import '@/shared/styles/variables.scss';
import '@/shared/styles/screen.scss';

const bootstrapLogger = logger.child('bootstrap');

async function bootstrap(): Promise<void> {
  await setupMsw();

  const app = createApp(App);
  app.use(createAppPinia());
  app.use(router);
  app.mount('#app');

  bootstrapLogger.info('Application started', {
    app: 'RuyiBigScreen',
    dataSource: import.meta.env.VITE_DATA_SOURCE ?? 'mock',
  });
}

void bootstrap().catch((error: unknown) => {
  bootstrapLogger.error('Application failed to start', { error });
});

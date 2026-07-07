import { logger } from '@/logs/logger';

import { apiProvider } from './api.provider';
import { mockProvider } from './mock.provider';
import type { DataSource, RuyiDataProvider } from './provider.types';

const dataProviderLogger = logger.child('data-provider');

function resolveDataSource(): DataSource {
  const configured = import.meta.env.VITE_DATA_SOURCE ?? 'mock';
  return configured === 'api' ? 'api' : 'mock';
}

const selectedDataSource = resolveDataSource();

export const dataProvider: RuyiDataProvider =
  selectedDataSource === 'api' ? apiProvider : mockProvider;

dataProviderLogger.info('Data provider selected', {
  source: selectedDataSource,
});

export function getDataSource(): DataSource {
  return selectedDataSource;
}

export type { RuyiDataProvider };

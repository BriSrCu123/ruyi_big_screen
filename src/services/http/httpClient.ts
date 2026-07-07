import { withJsonHeaders } from './interceptors';

export interface HttpClient {
  get<TResponse>(path: string): Promise<TResponse>;
}

function resolveUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
  if (path.startsWith('http')) {
    return path;
  }

  return `${baseUrl}${path}`;
}

export const httpClient: HttpClient = {
  async get<TResponse>(path: string): Promise<TResponse> {
    const context = withJsonHeaders({
      url: resolveUrl(path),
      init: {
        method: 'GET',
      },
    });

    const response = await fetch(context.url, context.init);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${context.url}`);
    }

    return (await response.json()) as TResponse;
  },
};

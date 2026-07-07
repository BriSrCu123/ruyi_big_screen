export interface RequestContext {
  url: string;
  init: RequestInit;
}

export function withJsonHeaders(context: RequestContext): RequestContext {
  return {
    ...context,
    init: {
      ...context.init,
      headers: {
        Accept: 'application/json',
        ...context.init.headers,
      },
    },
  };
}

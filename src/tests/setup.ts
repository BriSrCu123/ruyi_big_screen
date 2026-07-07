import { vi } from 'vitest';

class ResizeObserverMock {
  public observe(): void {
    return undefined;
  }

  public unobserve(): void {
    return undefined;
  }

  public disconnect(): void {
    return undefined;
  }
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

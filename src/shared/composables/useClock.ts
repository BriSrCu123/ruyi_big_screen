import { onBeforeUnmount, ref } from 'vue';

import { formatDateTime } from '@/shared/utils/date';

export function useClock(intervalMs = 1000) {
  const now = ref(new Date());
  const displayTime = ref(formatDateTime(now.value));

  const timer = window.setInterval(() => {
    now.value = new Date();
    displayTime.value = formatDateTime(now.value);
  }, intervalMs);

  onBeforeUnmount(() => {
    window.clearInterval(timer);
  });

  return {
    now,
    displayTime,
  };
}

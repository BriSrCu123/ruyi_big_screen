import { expect, test } from '@playwright/test';

test('RuyiBigScreen dashboard smoke test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('dashboard-title')).toHaveText('如意数据大屏');
  await expect(page.getByText('RuyiBigScreen')).toBeVisible();
  await expect(page.getByTestId('metric-card').first()).toBeVisible();
  await expect(page.getByTestId('base-chart').first()).toBeVisible();
  await expect(page.getByTestId('trend-panel')).toBeVisible();
  await expect(page.getByTestId('alarm-list')).toBeVisible();

  const trendBox = await page.getByTestId('trend-panel').boundingBox();
  const viewport = page.viewportSize();

  expect(trendBox).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (trendBox && viewport) {
    expect(trendBox.y + trendBox.height).toBeLessThanOrEqual(viewport.height);
  }
});

// @ts-check
const { test, expect } = require('@playwright/test');

// Chỉ chạy trên project Mobile
test.describe('Responsive Mobile', () => {

  test('hamburger menu hiển thị trên mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Chỉ chạy trên mobile');
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    await expect(hamburger).toBeVisible();
  });

  test('nav ẩn mặc định trên mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Chỉ chạy trên mobile');
    await page.goto('/');
    const nav = page.locator('#headerNav');
    await expect(nav).not.toBeVisible();
  });

  test('click hamburger mở nav menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Chỉ chạy trên mobile');
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    const nav = page.locator('#headerNav');

    await hamburger.click();
    await expect(nav).toBeVisible();
  });

  test('click hamburger 2 lần đóng nav menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Chỉ chạy trên mobile');
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    const nav = page.locator('#headerNav');

    await hamburger.click();
    await expect(nav).toBeVisible();
    await hamburger.click();
    await expect(nav).not.toBeVisible();
  });

  test('click nav link đóng menu trên mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Chỉ chạy trên mobile');
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    const nav = page.locator('#headerNav');

    await hamburger.click();
    await expect(nav).toBeVisible();

    await page.locator('.nav-link', { hasText: 'Cao đẳng' }).click();
    await page.waitForTimeout(500);
    await expect(nav).not.toBeVisible();
  });

  test('career cards xếp 1 cột trên mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Chỉ chạy trên mobile');
    await page.goto('/');
    const grid = page.locator('#cao-dang .careers-grid');
    const gridCols = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    // Trên mobile chỉ có 1 cột
    const colCount = gridCols.split(' ').length;
    expect(colCount).toBe(1);
  });

  test('FAB chỉ hiển thị icon trên mobile nhỏ (<=480px)', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chỉ chạy trên Chromium');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(600);

    const fabText = page.locator('.fab-register span:not(.fab-icon)');
    const isHidden = await fabText.evaluate(el => getComputedStyle(el).display === 'none');
    expect(isHidden).toBe(true);
  });

  test('timeline xếp 1 cột trên mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Chỉ chạy trên mobile');
    await page.goto('/');
    const container = page.locator('.timeline-container');
    const gridCols = await container.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const colCount = gridCols.split(' ').length;
    expect(colCount).toBe(1);
  });
});

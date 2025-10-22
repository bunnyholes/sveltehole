import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();

	// 스크린샷 캡처
	await page.screenshot({ path: 'test-results/homepage-screenshot.png', fullPage: true });
});

test('experimental page is accessible', async ({ page }) => {
	await page.goto('/experimental');
	await expect(page.locator('h1')).toContainText('Remote Functions');

	// 스크린샷 캡처
	await page.screenshot({ path: 'test-results/experimental-screenshot.png', fullPage: true });
});

test('database page is accessible', async ({ page }) => {
	await page.goto('/db');
	await expect(page.locator('h1')).toBeVisible();

	// 스크린샷 캡처
	await page.screenshot({ path: 'test-results/database-screenshot.png', fullPage: true });
});

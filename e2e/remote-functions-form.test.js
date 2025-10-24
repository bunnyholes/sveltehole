import { expect, test } from '@playwright/test';

test('form initial values are set', async ({ page }) => {
	await page.goto('/experimental/remote-functions/form');

	const nameInput = page.locator('input[name="name"]');
	const messageTextarea = page.locator('textarea[name="message"]');

	await expect(nameInput).toHaveValue('안녕하세요');
	await expect(messageTextarea).toHaveValue('스벨트는 미래입니다.');
});

test('form can be submitted with initial values', async ({ page }) => {
	await page.goto('/experimental/remote-functions/form');

	const submitButton = page.locator('button[type="submit"]');
	await expect(submitButton).toBeEnabled();

	await submitButton.click();

	await expect(page.locator('text=방명록이 성공적으로 등록되었습니다!')).toBeVisible({
		timeout: 10000
	});
});

test('form resets to initial values after submission', async ({ page }) => {
	await page.goto('/experimental/remote-functions/form');

	const nameInput = page.locator('input[name="name"]');
	const messageTextarea = page.locator('textarea[name="message"]');

	await nameInput.fill('테스트 이름');
	await messageTextarea.fill('테스트 메시지');

	const submitButton = page.locator('button[type="submit"]');
	await submitButton.click();

	await page.waitForTimeout(1000);

	await expect(nameInput).toHaveValue('안녕하세요');
	await expect(messageTextarea).toHaveValue('스벨트는 미래입니다.');
});

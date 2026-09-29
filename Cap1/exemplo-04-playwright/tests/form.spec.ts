import { test, expect } from '@playwright/test';

test.describe('Vanilla JS web app form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://erickwendel.github.io/vanilla-js-web-app-example/');
  });

  test('submits the form and list is updated', async ({ page }) => {
    const title = 'Playwright Test Image';
    const url = 'https://example.com/playwright.png';

    await page.getByRole('textbox', { name: 'Image Title' }).fill(title);
    await page.getByRole('textbox', { name: 'Image URL' }).fill(url);
    await page.getByRole('button', { name: 'Submit Form' }).click();

    // new item should appear as a heading in the main list
    const newHeading = page.getByRole('heading', { name: title });
    await expect(newHeading).toBeVisible();
  });

  test('validates URL and does not add invalid entries', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Image Title' }).fill('Invalid URL Test');
    await page.getByRole('textbox', { name: 'Image URL' }).fill('not-a-url');
    await page.getByRole('button', { name: 'Submit Form' }).click();

    // The invalid entry should not be added to the list
    const heading = page.getByRole('heading', { name: 'Invalid URL Test' });
    await expect(heading).toHaveCount(0);
  });
});

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test.describe('Authenticated Homepage Tests', () => {

    // test.use({ storageState: 'playwright/.auth/user.json' });

    test('Verify existing session', async ({ page }) => {
        const homepage = new HomePage(page);

        await page.goto('/');

        await expect(homepage.logOut).toBeVisible();
        await expect(page).toHaveURL('/');
    });

    test('Verify existing session in another test', async ({ page }) => {
        const homepage = new HomePage(page);

        await page.goto('/');

        await expect(homepage.logOut).toBeVisible();
    });
    

});










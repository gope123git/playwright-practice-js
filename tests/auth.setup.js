import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { loginData } from '../test-data/testData.js';

const authFile = 'playwright/.auth/user.json';

setup('Authenticate test user', async ({ page }) => {
    const homepage = new HomePage(page);
    const loginpage = new LoginPage(page,homepage);

    await homepage.open();

    await loginpage.login(
        loginData[0].username,
        loginData[0].password
    );

    // Verify login succeeded before saving authentication state.
    await expect(homepage.logOut).toBeVisible();

    // Save cookies and supported browser storage.
    await page.context().storageState({
        path: authFile
    });
});



 


import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { loginData } from '../test-data/testData.js';

const test = base.extend({

    homePage: async ({ page }, use) => {
        const homepage = new HomePage(page);
        await homepage.open();
        await use(homepage);
        console.log('HomePage fixture teardown');
    },

    loginPage: async ({homePage, page }, use) => {
        const loginpage = new LoginPage(page, homePage);
        await use(loginpage);
        console.log('Login fixture teardown');
    },

    loggedInHomePage: async ({ homePage, loginPage }, use) => {
        await loginPage.login(
            loginData[0].username,
            loginData[0].password
        );

        await use(homePage);
        console.log('Logged-in HomePage fixture teardown');
    },
});

export { test, expect };

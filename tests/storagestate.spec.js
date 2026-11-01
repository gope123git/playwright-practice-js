
import { test, expect } from '@playwright/test';
// import fs from 'node:fs';

import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { loginData } from '../test-data/testData.js';

let webContext;
let page;
let homepage;

const baseURL = 'https://localgaadi.lovable.app';

test.beforeAll(async ({ browser }) => {
    const loginContext = await browser.newContext();
    const loginPage = await loginContext.newPage();

    const homePage = new HomePage(loginPage);
    const loginpage = new LoginPage(loginPage, homePage);

    await loginPage.goto(baseURL);
    await loginpage.login(
        loginData[0].username,
        loginData[0].password
    );

    await expect(homePage.logOut).toBeVisible();
    // await loginPage.reload();
    // await expect(homePage.logOut).toBeVisible();
    await loginContext.storageState({ path: 'state.json' });
    webContext = await browser.newContext({
        storageState: 'state.json',
    });

    await loginContext.close();
});

test.beforeEach(async () => {
    page = await webContext.newPage();
    homepage = new HomePage(page);

    // const savedState = JSON.parse(
    //     fs.readFileSync('state.json', 'utf8')
    // );

    // const savedSessionId = savedState.cookies.find(
    //     cookie => cookie.name === 'session-id'
    // )?.value;

    // const injectedCookies = await webContext.cookies(baseURL);

    // const injectedSessionId = injectedCookies.find(
    //     cookie => cookie.name === 'session-id'
    // )?.value;

    // console.log(
    //     'Session IDs match:',
    //     savedSessionId === injectedSessionId
    // );
});

test('Verify existing authenticated session', async () => {
    await page.goto(baseURL);

    await expect(homepage.logOut).toBeVisible();
    await expect(page).toHaveURL(baseURL + '/');

    // await page.pause();
});

test('Verify existing authenticated session again', async () => {
    await page.goto(baseURL);

    await expect(homepage.logOut).toBeVisible();
    await expect(page).toHaveURL(baseURL + '/');
});


test.afterEach(async () => {
    await page.close();
});

test.afterAll(async () => {
    await webContext.close();
});

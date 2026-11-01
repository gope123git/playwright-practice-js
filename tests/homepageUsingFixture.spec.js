// import {test, expect} from '../fixtures/homepageFixture';

// test('HomePage using fixture',async({homePage})=>{
//     await expect(homePage.welcomeHeading).toBeVisible();
//     console.log('Welcome haeder in Homepage');
// })



//     test.use({ storageState: 'playwright/.auth/user.json' });

//     test('Verify existing session', async ({ homePage }) => {
//         // const homepage = new HomePage(page);
//         // await page.goto('/');

//         await expect(homePage.logOut).toBeVisible();
//         console.log('logout in homepage after loggedIn using storageState');

//     });

import { test, expect } from '../fixtures/homepageFixture';

test('HomePage using fixture', async ({ homePage }) => {
    await expect(homePage.welcomeHeading).toBeVisible();
    console.log('Welcome header on homepage');
});

test.describe('Authenticated tests', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test('Verify existing session', async ({ homePage }) => {
        await expect(homePage.logOut).toBeVisible();
        console.log('Logout button visible after login using storageState');
    });
});
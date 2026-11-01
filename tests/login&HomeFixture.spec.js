import {test,expect} from '../fixtures/homepageFixture';
import {loginData} from '../test-data/testData.js';

test('Login page validation using fixture',async({loginPage})=>{
    await loginPage.login(loginData[1].username, loginData[1].password);
    await expect(loginPage.notificationErrorMessage).toBeVisible();

});

test('Logout button validation after loggedIn using fixture',async({loggedInHomePage})=>{
    await expect(loggedInHomePage.logOut).toBeVisible();
    await expect(loggedInHomePage.findtaxi).toBeVisible();

});


test('HomePage loggedOut validation after loggedIn using fixture',async({homePage})=>{
    await expect(homePage.welcomeHeading).toBeVisible();

});
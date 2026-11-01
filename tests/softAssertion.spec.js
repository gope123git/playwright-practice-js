import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../test-data/testData';


test.describe('LocalGaadi Homepage E2E taxi booking', () => {
    let homepage;
    let loginpage;

    test.beforeEach(async({page}) => {
        homepage = new HomePage(page);
        loginpage = new LoginPage(page,homepage);
        await homepage.open();

        
    });

test('Soft assertions in E2E request taxi',async({page, context})=>{

        await loginpage.login(loginData[0].username, loginData[0].password);
        await expect.soft(homepage.logOut).toBeVisible();
        

        // await context.setGeolocation({
        //     latitude: 30.7333,
        //     longitude: 76.7794
        // })
    
        // await context.grantPermissions(
        //     ['geolocation'],
        //     {origin : 'https://localgaadi.lovable.app/'}
        // );


        await homepage.enableLocationBTNInHomePage.click();
        await page.waitForTimeout(3000);
        await homepage.findtaxi.click();
        // await expect.soft(page.locator('.text-xl')).toHaveText('Find or Request a Taxi');
        await page.getByRole('textbox',{name: 'Where to?'}).fill('sector 5');
        await page.getByRole('button',{name: 'Sector 5'}).first().click();
        // await expect.soft(page.locator('.font-medium.text-slate-800')).toContainText('abc'); //Any Vehicle
        await page.getByPlaceholder('Enter your expected fare (Optional)').fill('100');
        await page.getByRole('button',{name: ' Find My Taxi'}).click();
        await expect(page.getByRole('heading',{name :'driver found',exact:false})).toBeVisible();
        await page.getByRole('button',{name: 'Request Ride'}).click();
        await page.waitForTimeout(5000);


        





});

});
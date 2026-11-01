import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import {LoginPage} from '../pages/LoginPage.js';
import {loginData} from '../test-data/testData.js';

test.describe('LocalGaadi Homepage', () => {
    let homepage;
    let loginpage;

    test.beforeEach(async({page}) => {
        homepage = new HomePage(page,);
        loginpage = new LoginPage(page,homepage);
        await homepage.open();
    });


    test('LocalGaadi Heading', async({page}) =>{
        await expect(homepage.welcomeHeading).toBeVisible();
        await expect(page).toHaveURL('https://localgaadi.lovable.app/');
    })

    test('Localgaadi all four buttons', async()=>{
        const expectedButtons = ['Find Taxi', 'Request Taxi', 'Empty Ride', 'Send Parcel'];
        await expect(homepage.allButtons).toHaveCount(expectedButtons.length);

        for(let i = 0; i<expectedButtons.length; i++){
            await expect(homepage.allButtons.nth(i)).toContainText(expectedButtons[i]);
            console.log(await homepage.allButtons.nth(i).textContent());
        }

        console.log('------------------------');
        console.log(await homepage.allButtons.allTextContents());


    })


     test('Localgaadi all four buttons validation', async()=>{
        const expectedButtons = ['Find Taxi', 'Request Taxi', 'Empty Ride', 'Send Parcel'];
        await expect(homepage.allButtonsCSS).toHaveCount(expectedButtons.length);

        for(let i = 0; i<expectedButtons.length; i++){
            await expect(homepage.allButtonsCSS.nth(i)).toHaveText(expectedButtons[i]);
            console.log(await homepage.allButtonsCSS.nth(i).textContent());
        }

        console.log('------------------------');
        console.log(await homepage.allButtonsCSS.allTextContents());


    });





    // test('Login from Homepage with valid credential', async({page})=>{

    //     await loginpage.login(loginData[0].username, loginData[0].password);
    //     await expect(homepage.logOut).toBeVisible();

    // });

    for(const user of loginData){
    test(`Login from Homepage with ${user.testName}`,async()=>{

        
        await loginpage.login(user.username, user.password);
        if(user.expectedResult === 'success'){
            await expect(homepage.logOut).toBeVisible();

        }
        else{
            await expect(loginpage.notificationErrorMessage).toBeVisible({timeout: 1000});
        }

    });
    }

    

});
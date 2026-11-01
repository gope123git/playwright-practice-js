import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Retries in specific test',()=>{

    test.describe.configure({retries : 1});

    test('Homepage validation', async ({page}) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await expect(homepage.welcomeHeading).not.toBeVisible();
});
    
});

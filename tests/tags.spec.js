import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Retries in specific test',()=>{

test('Homepage validation @smoke', async ({page}) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await expect(homepage.welcomeHeading).toBeVisible();
});

test('Homepage validation2 @smoke', async ({page}) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await expect(homepage.welcomeHeading).toBeVisible();
});

test('Homepage validation3 @regression', async ({page}) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await expect(homepage.welcomeHeading).toBeVisible();
});
    
});

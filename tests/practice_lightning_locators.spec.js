import {test,expect} from '@playwright/test';

test.describe('Lightning Locators practice',() => {

    test.beforeEach(async({page})=>{
            await page.goto('https://area-saggy-grooving.ngrok-free.dev/');
            await page.getByRole('button',{name : 'Visit Site'}).click();

        });

    test('Shadow DOM', async({page})=>{
        const enterText = page.getByLabel('Shadow component value');
        const applyBTN = page.getByRole('button', {name: 'Apply'});
        await enterText.fill('jageshwar');
        await applyBTN.click();
        await expect(page.getByText('Applied: jageshwar')).toBeVisible();

    });

    test('Dynamic IDs - using getByTestId', async({page})=>{
        await expect(page.getByTestId('dynamic-name')).toHaveValue('Alex Morgan');
        await expect(page.getByTestId('dynamic-email')).toHaveValue('alex@example.com');
        await page.getByRole('button',{name: 'Regenerate dynamic IDs'}).click();
        await expect(page.getByTestId('dynamic-name')).toHaveValue('Alex Morgan');
        await expect(page.getByTestId('dynamic-email')).toHaveValue('alex@example.com');

    });

     test('iframe', async({page})=>{
        const frame =  page.frameLocator('#contact-frame');
        await frame.getByLabel('Frame subject ').fill('jageshwar');
        await frame.getByRole('button', {name: 'Submit inside frame'}).click();
        await expect(frame.getByText('Submitted: jageshwar')).toBeVisible();

    });

    test('Toast notifications', async({page})=>{
        const toastNotification = page.locator('#toast-area').getByRole('status');
        await page.getByRole('button', {name: 'Success toast'}).click();
        await expect(toastNotification).toContainText('Success');
        await expect(toastNotification).toContainText('Contact saved successfully.');

        await page.getByRole('button', {name: 'Warning toast'}).click();
        await expect(toastNotification).toContainText('Warning');
        await expect(toastNotification).toContainText('Some fields need attention.');

        await page.getByRole('button', {name: 'Error toast'}).click();
        await expect(toastNotification).toContainText('Error');
        await expect(toastNotification).toContainText('Unable to save record.');


    });

     test('Loading spinner', async({page})=>{

        await page.getByRole('button', {name: 'Load account data'}).click();
        await expect(page.locator('.spinner')).toBeHidden();
        // await expect(page.locator('.spinner')).waitFor({state: 'hidden', timeout: 10_000});

        await expect(page.locator('#spinner-result')).toBeVisible();
        

    });

    test('Lookup field', async({page})=>{

        await page.getByLabel('Account lookup').fill('h');
        await page.getByRole('option', {name: 'Umbrella Health'}).click();
        await expect(page.locator('#lookup-output')).toContainText('Selected: Umbrella Health');

    });

    test('Picklists', async({page})=>{

        await page.getByLabel('Contact status').selectOption('In Progress');
        await page.getByRole('button', {name: 'Select priority ▾'}).click();
        await page.getByRole('option', {name: 'Medium'}).click();
        await page.getByRole('button', {name: 'Fetch selected values'}).click();
        await expect(page.locator('#picklist-output')).toContainText('Status: In Progress · Priority: Medium');

        

    });

     test('Modal dialog', async({page})=>{

        await page.getByRole('button', {name: 'New contact'}).click();
        await page.getByLabel('First name').fill('Jageshwar');
        await page.getByLabel('Last name').fill('Gope');
        await page.locator('#modal-email').fill('jgope@gmail.com');
        await page.getByRole('button', {name: 'Save'}).click();
        await expect(page.locator('#modal-output')).toContainText('Created'); 
        // await expect(page.locator('#modal-output')).toHaveText('Created'); // exact text match

        

    });




});


test.describe('Dynamic IDs failing',() => {

    test.beforeEach(async({page})=>{
            await page.goto('https://area-saggy-grooving.ngrok-free.dev/');
            await page.getByRole('button',{name : 'Visit Site'}).click();

        });

    test('Dynamic IDs -  failing due to dynamic ID ', async({page})=>{
        // const inputName= await page.getByTestId('dynamic-name').inputValue();
        await expect(page.locator('#dynamic-name')).toHaveValue('Alex Morgan');
        await expect(page.locator('#dynamic-email')).toHaveValue('alex@example.com');
        await page.getByRole('button',{name: 'Regenerate dynamic IDs'}).click();
        await expect(page.locator('#dynamic-name')).toHaveValue('Alex Morgan');
        await expect(page.locator('#dynamic-email')).toHaveValue('alex@example.com');

    });


     test('Dynamic IDs using getByLabel  -  failing because is is getting changed which linked with label ', async({page})=>{
        await expect(page.getByLabel('Contact name')).toHaveValue('Alex Morgan');
        await expect(page.getByLabel('Email address')).toHaveValue('alex@example.com');
        await page.getByRole('button',{name: 'Regenerate dynamic IDs'}).click();
        await expect(page.getByLabel('Contact name')).toHaveValue('Alex Morgan');
        await expect(page.getByLabel('Email address')).toHaveValue('alex@example.com');

    });


});
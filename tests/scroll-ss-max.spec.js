import {test,expect} from '@playwright/test';

test('Scroll and capture LocalGaadi homepage', async ({ page }) => {
  await page.goto('https://localgaadi.lovable.app/services');

//   await page.setViewportSize({
//     width: 1920,
//     height: 1080,
//   });


  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });

//   await page.evaluate(() => {
//   window.scrollTo(0, document.body.scrollHeight);
// });


    // await page.getByText('Empty Rides').scrollIntoViewIfNeeded(); 
    // await page.mouse.wheel(0, 500);

  await page.screenshot({
    path: 'screenshots/localgaadi.png',
    // fullPage: true,
  });

//   await page.locator('header').screenshot({
//   path: 'screenshots/header.png',
// });

//   await page.pause();
});



// test('Scroll and capture LocalGaadi homepage2', async ({ page }) => {
//   await page.goto('https://localgaadi.lovable.app/services');


//   await page.evaluate(() => {
//     window.scrollBy(0, 500);
//   });


//   await page.screenshot({
//     path: 'screenshots/localgaadi.png',
//     // fullPage: true,
//   });

// });
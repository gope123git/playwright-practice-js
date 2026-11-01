import { test, expect } from '@playwright/test';

test('Inspect LocalGaadi network requests', async ({ page }) => {
  page.on('request', (request) => {
    console.log('>>', request.method(), request.url());
  });

  page.on('response', (response) => {
    console.log('<<', response.status(), response.url());
  });

  await page.goto('https://localgaadi.lovable.app/');

  await expect(page).toHaveURL(/localgaadi\.lovable\.app/);
});


// test.only('Mock LocalGaadi public drivers API', async ({ page }) => {
//   let intercepted = false;

//   await page.route(
//     '**/rest/v1/rpc/public_drivers',
//     async (route) => {
//       intercepted = true;

//       console.log('Intercepted:', route.request().url());
//       console.log('Method:', route.request().method());

//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify([]),
//       });
//     }
//   );

//   await page.goto('https://localgaadi.lovable.app/');

//   // Verify that Playwright intercepted the request.
//   await expect.poll(() => intercepted).toBe(true);
// });



test('Mock LocalGaadi public drivers API', async ({ page }) => {
  await page.route(
    '**/rest/v1/rpc/public_drivers',
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    }
  );

  await page.goto('https://localgaadi.lovable.app/');

  // Add a visible test message to the page.
  await page.evaluate(() => {
    const message = document.createElement('div');
    message.textContent = 'PLAYWRIGHT MOCK IS ACTIVE';
    message.id = 'playwright-mock-banner';

    Object.assign(message.style, {
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: '99999',
      background: 'yellow',
      color: 'black',
      padding: '16px',
      fontSize: '18px',
    });

    document.body.appendChild(message);
  });

  await expect(
    page.getByText('PLAYWRIGHT MOCK IS ACTIVE')
  ).toBeVisible();
});




test('Modify LocalGaadi API request headers', async ({ page }) => {
  let intercepted = false;

  await page.route(
    '**/rest/v1/rpc/public_drivers',
    async (route) => {
      intercepted = true;

      const headers = {
        ...route.request().headers(),
        'x-test-run': 'playwright',
      };

      console.log('Original URL:', route.request().url());
      console.log('Modified header:', headers['x-test-run']);

      await route.continue({ headers });
    }
  );

  await page.goto('https://localgaadi.lovable.app/');

  await expect.poll(() => intercepted).toBe(true);
});


// test.only('Mock a 500 error from public drivers API', async ({ page }) => {
//   let intercepted = false;

//   await page.route('**/rest/v1/rpc/public_drivers', async (route) => {
//     intercepted = true;

//     await route.fulfill({
//       status: 500,
//       contentType: 'application/json',
//       body: JSON.stringify({
//         message: 'Internal Server Error',
//       }),
//     });
//   });

//   await page.goto('https://localgaadi.lovable.app/');

//   await expect.poll(() => intercepted).toBe(true);
//   await page.pause();
// });



test('Mock a 500 error from public drivers API', async ({ page }) => {
  let intercepted = false;

  await page.route('**/rest/v1/rpc/public_drivers', async (route) => {
    intercepted = true;

    console.log('Intercepted API:', route.request().url());

    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    });
  });

  // Listen for the actual response received by the browser.
  page.on('response', async (response) => {
    if (response.url().includes('/rpc/public_drivers')) {
      console.log('API response status:', response.status());
      console.log('API response body:', await response.text());
    }
  });

  await page.goto('https://localgaadi.lovable.app/');

  await expect.poll(() => intercepted).toBe(true);

  await page.pause();
});

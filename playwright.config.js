// @ts-check
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
   reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['allure-playwright', {
            resultsDir: 'allure-results'
        }]
    ],


use: {
  headless: !!process.env.CI,
  baseURL: process.env.BASE_URL,
  viewport: process.env.CI
    ? { width: 1440, height: 900 }
    : null,
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure',
  actionTimeout: 10_000,
  navigationTimeout: 20_000,
  permissions: ['geolocation'],
  geolocation: {
    latitude: 30.7333,
    longitude: 76.7794
  }
},

projects: [
  {
    name: 'chromium',
    use: {
      browserName: 'chromium',
      ...(process.env.CI
        ? {}
        : {
            launchOptions: {
              slowMo: 1000,
              args: ['--start-maximized']
            }
          })
    }
  }
],







  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  // use: {
  //   // headless: false,
  //   headless: !!process.env.CI,
  //   baseURL:process.env.BASE_URL,
  //   screenshot: 'only-on-failure',
  //   trace: 'retain-on-failure',
  //   actionTimeout: 10_000,
  //   navigationTimeout: 20_000,

  //   permissions: ["geolocation"],
  //   geolocation: {
  //     latitude: 30.7333,
  //     longitude: 76.7794
  //   }
  // },


  // timeout: 60_000,  // per test timeout

  // expect: {
  //   timeout: 5_000
  // },

  // globalTimeout: 600_000,



// projects: [
//     {
//         name: 'setup',
//         testMatch: /auth\.setup\.js$/,
//     },
//     {
//         name: 'chromium',
//         use: {
//             ...devices['Desktop Chrome'],
//             storageState: 'playwright/.auth/user.json',
//         },
//         dependencies: ['setup'],
//         // testIgnore: /auth\.setup\.js$/,
//     },
// ],


// projects: [
//   {
//     name: 'chromium',
//     use: {
//       browserName: 'chromium',
//       viewport: null,
//       launchOptions: {
//         slowMo: 1000,
//         args: ['--start-maximized'],
//       },
//     },
//   },
// ],



// projects: [
//   {
//     name: 'chromium',
//     use: {
//       ...devices['Desktop Chrome'],
//       viewport: null,
//       launchOptions: {
//         slowMo: 2000,
//         args: ['--start-maximized'],
//       },
//     },
//   },
// ],


// projects: [

//   {
//     name: 'chromium',
//     use: { ...devices['Desktop Chrome'],
//     viewport: null,
//       launchOptions: {
//         slowMo: 2000,
//         args: ['--start-maximized'],
//       },
//       },
//   }
// ],


// projects: [

//   {
//     name: 'chromium',
//     use: { ...devices['Desktop Chrome'] },
//   }
// ],








  /* Configure projects for major browsers */
  // projects: [

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // }
    // ,

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


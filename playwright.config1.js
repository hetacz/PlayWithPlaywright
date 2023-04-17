// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({

  testDir: './tests',

  retries: 1,
  workers: 3,
  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  reporter: 'html',

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on',
        ...devices['iPhone 11 Pro']
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on',
        viewport: { width: 1280, height: 720 },
        permissions: ['geolocation'],
      },
    }
  ]
});

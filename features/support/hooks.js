//@ts-check

const playwright = require('@playwright/test');
const { Before, After, AfterStep, Status, BeforeStep } = require('@cucumber/cucumber');
const { POManager } = require('../../pom/POManager');

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(async function () {
    console.log('I am after function.');
});

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: `screenshots/${Date.now()}.png` });
    }
});

BeforeStep({ tags: '@foo or @bar' }, async function () { // and can be used too
    console.log('I am before step function.');
});

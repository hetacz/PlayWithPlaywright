//@ts-check
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

let webContext;

const loginPayload = {

    userEmail: "edzioo@gmail.com",
    userPassword: "Qwe123!@#",
};

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator('#userEmail').fill(loginPayload.userEmail);
    await page.locator('#userPassword').fill(loginPayload.userPassword);
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Place the order', async () => {

    const page = await webContext.newPage();

    const ordersBtn = page.locator('button[routerlink="/dashboard/myorders"]');

    await page.goto('https://rahulshettyacademy.com/client/');

    await ordersBtn.click();
});

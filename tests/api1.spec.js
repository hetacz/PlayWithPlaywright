//@ts-check
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

let response;

const loginPayload = {

    userEmail: "edzioo@gmail.com",
    userPassword: "Qwe123!@#",
};

const orderPayload = {

    orders: [{
        country: "India",
        productOrderedId: "6262e95ae26b7e1a10e89bf0",
    }]
};

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page, browser }) => {

    const viewBtnLocator = ' + td + td + td + td + td > button';

    const card = page.locator('div.card-body');
    const ordersBtn = page.locator('button[routerlink="/dashboard/myorders"]');
    const orderIdCol = page.locator('tbody > tr > th');
    const orderSummaryId = page.locator('.col-text');

    await page.addInitScript((value) => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.waitForLoadState('networkidle');
    await card.first().waitFor({ state: 'visible' });

    await ordersBtn.click();
    await orderIdCol.first().waitFor({ state: 'visible' });
    const orderIds = await orderIdCol.allTextContents();
    const index = orderIds.findIndex((id) => id === response.orderId);
    expect(index).toBeGreaterThanOrEqual(0);
    await page.locator(`tbody > tr:nth-child(${index + 1}) > th` + viewBtnLocator).click();
    await orderSummaryId.waitFor({ state: 'visible' });
    expect(await orderSummaryId.textContent()).toBe(response.orderId);
});

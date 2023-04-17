//@ts-check
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

let response;

const productOrderId = '6262e95ae26b7e1a10e89bf0';
const idToRoute = '64321e94568c3e9fb14bafcf';
const idToReplace = '64321557568c3e9fb14bac24';

const loginPayload = {

    userEmail: 'edzioo2@gmail.com',
    userPassword: 'Qwe123!@#',
};

const orderPayload = {

    orders: [{
        country: 'India',
        productOrderedId: productOrderId,
    }]
};

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page, browser }) => {

    const ordersBtn = page.locator('button[routerlink="/dashboard/myorders"]');

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');
    await ordersBtn.click();

    console.log(idToRoute);
    // MOCK REQUEST
    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${idToRoute}`, async (handler) => {
        console.log('inside!');
        await handler.continue({ url: `https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${idToReplace}` });
    });

    await page.locator('button:has-text("View")').first().click();
    await page.pause();
});

//@ts-check
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

let response;

const productOrderId = '6262e95ae26b7e1a10e89bf0';
const idToRoute = '642ee8e3568c3e9fb149f897';

const loginPayload = {

    userEmail: 'edzioo@gmail.com',
    userPassword: 'Qwe123!@#',
};

const orderPayload = {

    orders: [{
        country: 'India',
        productOrderedId: productOrderId,
    }]
};

const fakeOrderPayload = { data: [], message: "No Orders" };

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page, browser }) => {

    const card = page.locator('div.card-body');
    const ordersBtn = page.locator('button[routerlink="/dashboard/myorders"]');

    await page.addInitScript((value) => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');

    // MOCK RESPONSE

    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${idToRoute}`, async (handler) => {

        // intercept response - API responsee -> ||| hijack by me ||| -> browser -> render data on frontend
        const response = await page.request.fetch(handler.request());
        let body = fakeOrderPayload;
        handler.fulfill({
            response,
            body,
        });
    });
    await page.waitForLoadState('networkidle');
    await card.first().waitFor({ state: 'visible' });

    await ordersBtn.click();

    console.log(await page.locator('.mt-4').textContent());
});

// @ts-check

const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pom/POManager');
const playwright = require('@playwright/test');
const { expect } = require('@playwright/test');

Given('Login to Ecommerce application with {string} and {string}', { timeout: 10000 }, async function (username, password) {

    this.loginPage = await this.poManager.getLoginPage();

    await this.loginPage.goto();
    await this.loginPage.login(username, password);
});

Then('Verify error message is displayed.', async function () {

    await this.loginPage.getToastMessage();
});

When('Add {string} to the Cart', async function (productName) {

    this.dashboardPage = await this.poManager.getDashboardPage();

    await this.dashboardPage.searchProductAddToCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart page', async function (productName) {

    const cartItem = this.page.locator(`h3:has-text("${productName}")`);
    const cartList = this.page.locator('ul.cartWrap > li');
    const checkoutBtn = this.page.locator('button:has-text("Checkout")');

    await cartList.first().waitFor({ state: 'visible' });
    expect(await cartItem.isVisible()).toBeTruthy();
    await checkoutBtn.click();

    await this.page.waitForLoadState('networkidle');
});

When('Enter valid details and Place the Order', { timeout: 10000 }, async function () {
    const ccNumberFld = this.page.locator('input.input.txt').first();
    const ccMonthFld = this.page.locator('select.ddl').first();
    const ccYearFld = this.page.locator('select.ddl').last();
    const cvvCodeFld = this.page.locator('input.input.txt').nth(1);
    const ccNameFld = this.page.locator('input.input.txt').nth(2);
    const ccCouponFld = this.page.locator('input[name="coupon"]');
    const couponBtn = this.page.locator('button.mt-1');
    const couponMsg = this.page.locator('p.mt-1');
    const countryFld = this.page.locator('input.input.txt').last();
    const countryDrop = this.page.locator('section.ta-results');
    const countryBtn = this.page.locator(`button.ta-item:has-text("Poland")`);
    const placeOrderBtn = this.page.locator('a.btnn');
    const thankYouH1 = this.page.locator('h1.hero-primary');

    await ccNumberFld.fill('');
    await ccNumberFld.type('4242424242424242');
    await ccMonthFld.selectOption({ label: '12' });
    await ccYearFld.selectOption({ label: '24' });
    await cvvCodeFld.type('123');
    await ccNameFld.type('Edzio');
    await ccCouponFld.type('rahulshettyacademy');
    await couponBtn.click();
    expect(await couponMsg.textContent()).toBe('* Coupon Applied');
    await countryFld.type('Poland', { delay: 100 });
    await countryDrop.waitFor({ state: 'visible' });
    await countryBtn.click();
    await placeOrderBtn.click();

    expect(await thankYouH1.textContent()).toBe(' Thankyou for the order. ');
});

Then('Verify Order is present in the order history', async function () {

    const orderId = this.page.locator('.em-spacer-1 > .ng-star-inserted');
    const ordersBtn = this.page.locator('button[routerlink="/dashboard/myorders"]');
    const orderIdCol = this.page.locator('tbody > tr > th');
    const orderSummaryId = this.page.locator('.col-text');
    const viewBtnLocator = ' + td + td + td + td + td > button';

    const id = await orderId.textContent();
    const trimmedId = id.replace(/[\s*\|*]/g, '').trim();
    console.log(trimmedId);

    await ordersBtn.click();
    await orderIdCol.first().waitFor({ state: 'visible' });
    const orderIds = await orderIdCol.allTextContents();
    console.log(orderIds);
    const index = orderIds.findIndex((id) => id === trimmedId);
    expect(index).toBeGreaterThanOrEqual(0);
    await this.page.locator(`tbody > tr:nth-child(${index + 1}) > th` + viewBtnLocator).click();
    await orderSummaryId.waitFor({ state: 'visible' });
    expect(await orderSummaryId.textContent()).toBe(trimmedId);
});

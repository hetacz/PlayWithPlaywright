//@ts-check

const { test, expect } = require('@playwright/test');

test('Shop', async ({ page, browser }) => {

    const email = 'edzioo@gmail.com';
    const password = 'Qwe123!@#';
    const productName = 'zara coat 3';
    const country = 'Poland';
    const viewBtnLocator = ' + td + td + td + td + td > button';

    const emailFld = page.locator('#userEmail');
    const passwordFld = page.locator('#userPassword');
    const submitBtn = page.locator('#login');
    const card = page.locator('div.card-body');
    const cartBtn = page.locator('[routerlink*="cart"]');
    const cartItem = page.locator(`h3:has-text("${productName}")`);
    const cartList = page.locator('ul.cartWrap > li');
    const checkoutBtn = page.locator('button:has-text("Checkout")');
    const ccNumberFld = page.locator('input.input.txt').first();
    const ccMonthFld = page.locator('select.ddl').first();
    const ccYearFld = page.locator('select.ddl').last();
    const cvvCodeFld = page.locator('input.input.txt').nth(1);
    const ccNameFld = page.locator('input.input.txt').nth(2);
    const ccCouponFld = page.locator('input[name="coupon"]');
    const couponBtn = page.locator('button.mt-1');
    const couponMsg = page.locator('p.mt-1');
    const shipEmailFld = page.locator('input.input.txt').nth(4);
    const countryFld = page.locator('input.input.txt').last();
    const countryDrop = page.locator('section.ta-results');
    const countryBtn = page.locator(`button.ta-item:has-text("${country}")`);
    const placeOrderBtn = page.locator('a.btnn');
    const thankYouH1 = page.locator('h1.hero-primary');
    const orderId = page.locator('.em-spacer-1 > .ng-star-inserted');
    const ordersBtn = page.locator('button[routerlink="/dashboard/myorders"]');
    const orderIdCol = page.locator('tbody > tr > th');
    const orderSummaryId = page.locator('.col-text');

    await page.goto('https://rahulshettyacademy.com/client/');
    await emailFld.type(email);
    await passwordFld.type(password);
    await submitBtn.click();

    await page.waitForLoadState('networkidle');
    await card.first().waitFor({ state: 'visible' });

    const titles = await card.locator('b').allTextContents();
    console.log(titles);

    const count = await card.count();
    for (let i = 0; i < count; i++) {
        const title = await card.nth(i).locator('b').textContent();
        if (title.includes(productName)) {
            await card.nth(i).locator('button.w-10').click();
            break;
        }
    }

    // const target = await Array.from({ length: await card.count() }, (_, j) => j)
    //     .map(async (i) => card.nth(i))
    //     .filter(async (tile) => (await tile).locator('b').first().textContent() === productName)[0];
    // await target.locator('button.w-10').click();

    await cartBtn.click();
    await cartList.first().waitFor({ state: 'visible' });
    expect(await cartItem.isVisible()).toBeTruthy();
    await checkoutBtn.click();

    await page.waitForLoadState('networkidle');

    expect(await shipEmailFld.inputValue()).toBe(email);

    await ccNumberFld.fill('');
    await ccNumberFld.type('4242424242424242');
    await ccMonthFld.selectOption({ label: '12' });
    await ccYearFld.selectOption({ label: '24' });
    await cvvCodeFld.type('123');
    await ccNameFld.type('Edzio');
    await ccCouponFld.type('rahulshettyacademy');
    await couponBtn.click();
    expect(await couponMsg.textContent()).toBe('* Coupon Applied');
    await countryFld.type(country, { delay: 100 });
    await countryDrop.waitFor({ state: 'visible' });
    await countryBtn.click();
    await placeOrderBtn.click();

    expect(await thankYouH1.textContent()).toBe(' Thankyou for the order. ');
    const id = await orderId.textContent();
    const trimmedId = id.replace(/[\s*\|*]/g, '').trim();
    console.log(trimmedId);

    await ordersBtn.click();
    await orderIdCol.first().waitFor({ state: 'visible' });
    const orderIds = await orderIdCol.allTextContents();
    console.log(orderIds);
    const index = orderIds.findIndex((id) => id === trimmedId);
    expect(index).toBeGreaterThanOrEqual(0);
    await page.locator(`tbody > tr:nth-child(${index + 1}) > th` + viewBtnLocator).click();
    await orderSummaryId.waitFor({ state: 'visible' });
    expect(await orderSummaryId.textContent()).toBe(trimmedId);
});

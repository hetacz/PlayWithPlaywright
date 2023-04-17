//@ts-check
const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pom/POManager');
const testData = JSON.parse(JSON.stringify(require('../utils/testData.json')));

for (const data of testData) {

    test(`@Web Login ${data.username}`, async ({ page, browser }) => { // --grep @Web

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();

        const card = page.locator('div.card-body b');

        await loginPage.goto();
        await loginPage.login(data.username, data.password);

        await expect(page).toHaveTitle('Let\'s Shop');

        const titles = await card.allTextContents();
        console.log(titles);
    });

    test(`@Web Shop ${data.username}`, async ({ page, browser }) => { // --grep @Web

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();

        await loginPage.goto();
        await loginPage.login(data.username, data.password);
        await dashboardPage.searchProductAddToCart(data.productName);
        await dashboardPage.navigateToCart();
    });
}

customtest(`@Web Login`, async ({ page, browser, testDataForOrder }) => { // --grep @Web

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    const card = page.locator('div.card-body b');

    await loginPage.goto();
    await loginPage.login(testDataForOrder.username, testDataForOrder.password);

    await expect(page).toHaveTitle('Let\'s Shop');

    const titles = await card.allTextContents();
    console.log(titles);
});
